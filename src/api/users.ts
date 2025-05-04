import { API_BASE_URL } from './config.ts';

export interface CreateUserParams {
  email: string;
  phone: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  subscriptionType: 'weekly' | 'monthly';
  paymentDate?: string;
}

export interface UserResponse {
  message: string;
  id?: string;
  email?: string;
}

export const createUser = async (params: CreateUserParams): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create user');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}; 