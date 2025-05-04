"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="space-y-4">
          <XCircle size={64} className="text-gray-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Payment Cancelled</h2>
          <p className="text-gray-600">
            Your payment has been cancelled. No charges have been made.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
} 