import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { redirectToPayment } from '../services/stripe';
import { updateUserPayment } from '../services/api';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userPhone: string;
  selectedPlan: 'weekly' | 'monthly';
  country: string;
  city: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  userPhone,
  selectedPlan,
  country,
  city
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const planDetails = {
    weekly: {
      price: '€1.99',
      interval: 'week'
    },
    monthly: {
      price: '€5.99',
      interval: 'month'
    }
  };

  const handlePayment = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Step 1: First, save the user data to MongoDB through our API
      const updateResult = await updateUserPayment({
        email: userEmail,
        phone: userPhone,
        countryFrom: country,
        cityFrom: city,
        countryTo: "",
        cityTo: "",
        subscriptionType: selectedPlan
      });
      
      // Step 2: Only proceed to payment if the data was successfully saved
      if (updateResult && updateResult.message) {
        console.log('User record saved:', updateResult.message);
        
        // Step 3: Redirect to Stripe payment link with user data as metadata
        await redirectToPayment({
          planType: selectedPlan,
          email: userEmail,
          phone: userPhone
        });
        
        // Note: After successful payment, Stripe will redirect back to the success URL
        // where we'll call the API again to update the payment status
      } else {
        throw new Error('Failed to save user record');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to process payment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Complete Your Payment
        </h3>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="text-gray-900">{selectedPlan === 'weekly' ? 'Weekly' : 'Monthly'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price</span>
              <span className="text-gray-900">{planDetails[selectedPlan].price}/{planDetails[selectedPlan].interval}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="text-gray-900">{city}, {country}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex justify-between font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{planDetails[selectedPlan].price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              We'll notify you when visa appointments become available in {city}, {country}. Your subscription will be activated after payment confirmation.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <div className="mb-2">Contact Information:</div>
            <div>Email: {userEmail}</div>
            <div>Phone: {userPhone}</div>
          </div>

          {error && (
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : `Pay ${planDetails[selectedPlan].price}`}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By proceeding with the payment you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}; 