import { API_BASE_URL } from './api';

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'week' | 'month';
  description: string;
  priceId: string; // Stripe Price ID
};

// Ensure environment variables are available
if (!import.meta.env.VITE_STRIPE_WEEKLY_PRICE_ID || !import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID) {
  throw new Error('Missing required Stripe price IDs in environment variables');
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  weekly: {
    id: 'weekly_plan',
    name: 'Weekly Plan',
    price: 1.99,
    currency: 'EUR',
    interval: 'week',
    description: 'Weekly subscription at €1.99',
    priceId: import.meta.env.VITE_STRIPE_WEEKLY_PRICE_ID
  },
  monthly: {
    id: 'monthly_plan',
    name: 'Monthly Plan',
    price: 5.99,
    currency: 'EUR',
    interval: 'month',
    description: 'Monthly subscription at €5.99',
    priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID
  }
};

interface RedirectToPaymentParams {
  planType: keyof typeof SUBSCRIPTION_PLANS;
  email?: string;
  phone?: string;
}

// Get the current app base URL for success and cancel URLs
const getAppBaseUrl = (): string => {
  // Ensure we get the full origin including protocol
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : import.meta.env.VITE_APP_URL || 'http://localhost:5173';
  console.log('Base URL for redirects:', baseUrl);
  return baseUrl;
};

export const redirectToPayment = async ({
  planType,
  email,
  phone
}: RedirectToPaymentParams) => {
  try {
    console.log('Starting payment redirect with params:', { planType, email, phone });
    
    const plan = SUBSCRIPTION_PLANS[planType];
    if (!plan) {
      throw new Error('Invalid plan type');
    }

    const successUrl = `${getAppBaseUrl()}/payment-success?email=${encodeURIComponent(email || '')}&plan=${planType}`;
    const cancelUrl = `${getAppBaseUrl()}/payment-cancel`;

    console.log('Redirect URLs:', {
      success: successUrl,
      cancel: cancelUrl
    });

    // Create Checkout Session using the configured API URL
    const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: plan.priceId,
        successUrl,
        cancelUrl,
        customerEmail: email,
        metadata: {
          phone,
          plan_type: planType
        }
      }),
    });

    // Log the full response for debugging
    console.log('Checkout session response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Checkout session error:', errorData);
      throw new Error(errorData.error || `Failed to create checkout session: ${response.status} ${response.statusText}`);
    }

    const { url } = await response.json();
    console.log('Received checkout URL:', url);
    
    if (!url) {
      throw new Error('No checkout URL received');
    }

    // Log before redirect
    console.log('Redirecting to Stripe Checkout URL:', url);
    window.location.href = url;
    
  } catch (error) {
    console.error('Payment redirect error:', error);
    throw error;
  }
};