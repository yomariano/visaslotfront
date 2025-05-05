// Access environment variables using Vite's format
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Better error handling function
const handleApiError = (error: unknown, context: string): Error => {
  console.error(`API Error in ${context}:`, error);
  
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return new Error(String((error as {message: unknown}).message));
  }
  
  return new Error(`Unknown error in ${context}`);
};

interface CreateUserParams {
  email: string;
  phone: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  subscriptionType: 'weekly' | 'monthly';
}

export const createUser = async (params: CreateUserParams): Promise<{ message: string; id?: string; email?: string }> => {
  try {
    console.log(`Calling createUser API with params:`, params);
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to create user: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('createUser API response:', result);
    return result;
  } catch (error) {
    throw handleApiError(error, 'createUser');
  }
};

interface UpdateUserPaymentParams {
  email: string;
  phone: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  subscriptionType: 'weekly' | 'monthly';
}

export const updateUserPayment = async (params: UpdateUserPaymentParams): Promise<{ message: string; email?: string }> => {
  try {
    console.log(`Calling updateUserPayment API with params:`, params);
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params), // Not setting paymentDate - will be set after Stripe payment confirmation
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to update user payment: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('updateUserPayment API response:', result);
    return result;
  } catch (error) {
    throw handleApiError(error, 'updateUserPayment');
  }
};

interface ConfirmPaymentParams {
  email: string;
  subscriptionType: 'weekly' | 'monthly';
}

export const confirmPayment = async (params: ConfirmPaymentParams): Promise<{ message: string; email?: string }> => {
  try {
    console.log(`Calling confirmPayment API with params:`, params);
    
    // After Stripe redirects back, call the API to update payment status
    const response = await fetch(`${API_BASE_URL}/users/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        subscriptionType: params.subscriptionType,
        paymentDate: new Date().toISOString() // Set the payment date now that payment is confirmed
      }),
    });

    // Log raw response for debugging
    console.log('confirmPayment API response status:', response.status, response.statusText);
    
    if (!response.ok) {
      let errorDetail = 'Unknown error';
      try {
        const errorData = await response.json();
        errorDetail = errorData.error || errorData.detail || `Server error: ${response.status}`;
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        errorDetail = `Failed to parse error: ${response.status} ${response.statusText}`;
      }
      throw new Error(`Failed to confirm payment: ${errorDetail}`);
    }

    const result = await response.json();
    console.log('confirmPayment API response data:', result);
    return result;
  } catch (error) {
    throw handleApiError(error, 'confirmPayment');
  }
}; 