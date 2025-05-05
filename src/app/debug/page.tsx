"use client";

import React, { useState } from 'react';
import { updateUserPayment, confirmPayment } from '../../services/api';
import { redirectToPayment } from '../../services/stripe';

/**
 * Debug page for testing the payment flow
 * This should only be used in development
 */
export default function DebugPage() {
  const [apiUrl, setApiUrl] = useState('');
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPhone, setTestPhone] = useState('+1234567890');
  const [testPlan, setTestPlan] = useState<'weekly' | 'monthly'>('weekly');
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const logMessage = (message: string) => {
    setDebugLog(prev => [`[${new Date().toISOString()}] ${message}`, ...prev]);
  };
  
  const clearLog = () => setDebugLog([]);
  
  const checkApiConnection = async () => {
    try {
      logMessage('Testing API connection...');
      setApiStatus('loading');
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/users/test`);
      const data = await response.json();
      
      logMessage(`API Response: ${JSON.stringify(data, null, 2)}`);
      setApiUrl(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}`);
      setApiStatus('success');
    } catch (error) {
      logMessage(`API Error: ${error instanceof Error ? error.message : String(error)}`);
      setApiStatus('error');
    }
  };
  
  const testSaveUser = async () => {
    try {
      logMessage(`Saving test user: ${testEmail}, ${testPhone}, ${testPlan}`);
      
      const result = await updateUserPayment({
        email: testEmail,
        phone: testPhone,
        countryFrom: 'Test Country',
        cityFrom: 'Test City',
        countryTo: 'Spain',
        cityTo: 'Madrid',
        subscriptionType: testPlan
      });
      
      logMessage(`User saved successfully: ${JSON.stringify(result)}`);
    } catch (error) {
      logMessage(`Error saving user: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  const testPaymentRedirect = async () => {
    try {
      logMessage(`Testing payment redirect for ${testEmail}, ${testPlan}`);
      
      await redirectToPayment({
        planType: testPlan,
        email: testEmail,
        phone: testPhone
      });
      
      logMessage('Redirecting to Stripe...');
    } catch (error) {
      logMessage(`Error redirecting to payment: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  const testConfirmPayment = async () => {
    try {
      logMessage(`Testing payment confirmation for ${testEmail}, ${testPlan}`);
      
      const result = await confirmPayment({
        email: testEmail,
        subscriptionType: testPlan
      });
      
      logMessage(`Payment confirmed: ${JSON.stringify(result)}`);
    } catch (error) {
      logMessage(`Error confirming payment: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment Flow Debug</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          This page is for debugging only and should not be accessible in production.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">API Connection</h2>
          <div className="mb-4">
            <button
              onClick={checkApiConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test API Connection
            </button>
            
            {apiStatus === 'loading' && <span className="ml-3 text-gray-600">Testing...</span>}
            {apiStatus === 'success' && <span className="ml-3 text-green-600">Connected</span>}
            {apiStatus === 'error' && <span className="ml-3 text-red-600">Failed</span>}
          </div>
          
          {apiUrl && (
            <div className="text-sm text-gray-600">
              API URL: {apiUrl}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Test User</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Plan</label>
              <select
                value={testPlan}
                onChange={(e) => setTestPlan(e.target.value as 'weekly' | 'monthly')}
                className="w-full p-2 border rounded"
              >
                <option value="weekly">Weekly (€1.99/week)</option>
                <option value="monthly">Monthly (€5.99/month)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Test Payment Flow</h2>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={testSaveUser}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            1. Save User
          </button>
          
          <button
            onClick={testPaymentRedirect}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            2. Redirect to Payment
          </button>
          
          <button
            onClick={testConfirmPayment}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            3. Confirm Payment
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Typical flow: Save User → Redirect to Payment → [Stripe handles payment] → Success page calls Confirm Payment
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Debug Log</h2>
          <button
            onClick={clearLog}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-lg h-64 overflow-y-auto">
          <pre className="text-xs">
            {debugLog.join('\n')}
          </pre>
        </div>
      </div>
    </div>
  );
} 