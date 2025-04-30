import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Secure Your Appointment</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan that works for you and start finding visa appointments today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 bg-gray-50 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">1 country</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Email notifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">1 date range</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Standard scan frequency</span>
              </li>
            </ul>
            
            <button className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors flex items-center justify-center">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          {/* Premium Plan - Highlighted */}
          <div className="border-2 border-blue-500 rounded-2xl p-8 bg-white shadow-lg relative transform hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">3 countries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Email + SMS notifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">3 date ranges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Priority scan frequency</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">1-click booking</span>
              </li>
            </ul>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          {/* Business Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 bg-gray-50 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Unlimited countries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">All notification channels</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Unlimited date ranges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Highest scan priority</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Dedicated support</span>
              </li>
            </ul>
            
            <button className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors flex items-center justify-center">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center bg-blue-50 p-8 rounded-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need a custom solution?</h3>
          <p className="text-gray-600 mb-6">
            For travel agencies, immigration consultants, or corporate clients with specific needs.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-colors inline-flex items-center">
            <span>Contact Sales</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;