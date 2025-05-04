"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { confirmPayment } from '../../services/api';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({});
  
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;

    const handlePaymentConfirmation = async () => {
      try {
        // Log all search params for debugging
        const allParams: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
          allParams[key] = value;
        }
        console.log('Payment success page loaded with params:', allParams);
        setDebugInfo(prev => ({ ...prev, urlParams: allParams }));
        
        // Extract parameters from the URL
        const email = searchParams.get('email');
        const planType = searchParams.get('plan') as 'weekly' | 'monthly';
        
        console.log('Processing payment confirmation for:', { email, planType });
        setDebugInfo(prev => ({ ...prev, extractedParams: { email, planType } }));
        
        if (!email || !planType) {
          const errorMsg = 'Missing required payment information';
          console.error(errorMsg, { email, planType });
          setError(errorMsg);
          setIsProcessing(false);
          return;
        }
        
        // Call the API to update the payment status in the database
        const result = await confirmPayment({
          email,
          subscriptionType: planType
        });
        
        console.log('Payment confirmation successful:', result);
        setDebugInfo(prev => ({ ...prev, apiResponse: result }));
        
        // Update state to show success
        setIsProcessing(false);
      } catch (error: unknown) {
        console.error('Payment confirmation error:', error);
        setError('Failed to confirm payment. Please contact support.');
        setDebugInfo(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : String(error)
        }));
        setIsProcessing(false);
      }
    };
    
    // Start the payment confirmation process
    handlePaymentConfirmation();
  }, [searchParams]);
  
  // Redirect to home after success
  useEffect(() => {
    if (!isProcessing && !error) {
      const redirectTimer = setTimeout(() => {
        console.log('Redirecting to home page...');
        window.location.href = '/';
      }, 5000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isProcessing, error]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {isProcessing ? (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-2xl font-bold text-gray-900">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <div className="w-16 h-16 text-red-500 mx-auto">❌</div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Error</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </button>
            
            {/* Debug information */}
            <div className="mt-8 text-left text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <CheckCircle size={64} className="text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="text-gray-600">
              Thank you for your payment. Your subscription has been activated.
            </p>
            <p className="text-gray-600">
              You will receive email notifications when visa appointments become available.
            </p>
            <p className="text-sm text-gray-500 mt-6">
              Redirecting you to the homepage in a few seconds...
            </p>
            
            {/* Debug information */}
            <div className="mt-8 text-left text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 