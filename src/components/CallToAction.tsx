import React, { useState } from 'react';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { createUser } from '../services/api';

interface PricingPlanProps {
  name: string;
  price: number;
  interval: string;
  description: string;
  isPopular?: boolean;
  onClick: (planType: 'weekly' | 'monthly') => void;
}

export interface ContactInfo {
  email: string;
  phone: string;
  country: string;
  city: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactInfo) => void;
  onClose: () => void;
}

interface LocationData {
  [country: string]: string[];
}

const locationData: LocationData = {
  "Canada": ["Edmonton", "Montreal", "Ottawa", "Toronto", "Vancouver"],
  "Ireland": ["Dublin"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai"],
  "United Kingdom": ["Birmingham", "Cardiff", "Edinburgh", "London", "Manchester"],
  "United States": ["Atlanta", "Boston", "Chicago", "Houston", "Los Angeles", 
    "Miami", "New York", "San Francisco", "Seattle", "Washington DC"]
};

const PricingPlan: React.FC<PricingPlanProps> = ({
  name,
  price,
  interval,
  description,
  isPopular,
  onClick
}) => (
  <div 
    className={`${
      isPopular 
        ? 'border-2 border-blue-500 bg-white shadow-lg transform hover:scale-[1.02]' 
        : 'border border-gray-200 bg-gray-50 hover:border-blue-200 hover:shadow-md'
    } rounded-2xl p-8 transition-all relative`}
  >
    {isPopular && (
      <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-bl-lg rounded-tr-lg">
        POPULAR
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="flex items-center justify-center">
        <span className="text-gray-500">€</span>
        <span className="text-4xl font-bold text-gray-900 mx-1">{price}</span>
        <span className="text-gray-500">/{interval}</span>
      </div>
    </div>
    
    <p className="text-gray-600 text-center mb-8">
      {description}
    </p>
    
    <button 
      onClick={() => onClick(interval === 'week' ? 'weekly' : 'monthly')}
      className={`w-full ${
        isPopular
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
      } px-6 py-3 rounded-lg transition-colors flex items-center justify-center font-medium`}
    >
      <span>Subscribe Now</span>
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  </div>
);

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ContactInfo>({
    email: '',
    phone: '',
    country: '',
    city: ''
  });
  const [errors, setErrors] = useState<Partial<ContactInfo>>({});
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<ContactInfo> = {};
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const availableCities = formData.country ? locationData[formData.country] : [];

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
          Enter Your Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <div className="relative">
              <div 
                className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer`}
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  setIsCityDropdownOpen(false);
                }}
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={!formData.country ? 'text-gray-400' : 'text-gray-700'}>
                    {formData.country || 'Select Country'}
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isCountryDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {Object.keys(locationData).map((country) => (
                    <div 
                      key={country}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, country, city: '' }));
                        setIsCountryDropdownOpen(false);
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <div className="relative">
              <div 
                className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 flex items-center justify-between ${formData.country ? 'cursor-pointer' : 'bg-gray-50 cursor-not-allowed'}`}
                onClick={() => {
                  if (formData.country) {
                    setIsCityDropdownOpen(!isCityDropdownOpen);
                    setIsCountryDropdownOpen(false);
                  }
                }}
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={!formData.city ? 'text-gray-400' : 'text-gray-700'}>
                    {formData.city || 'Select City'}
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isCityDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {availableCities.map((city) => (
                    <div 
                      key={city}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, city }));
                        setIsCityDropdownOpen(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
                ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center font-medium"
          >
            Continue to Payment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const CallToAction: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlanClick = (planType: 'weekly' | 'monthly') => {
    setSelectedPlan(planType);
    setShowContactForm(true);
    setError(null);
  };

  const handleContactSubmit = async (data: ContactInfo) => {
    try {
      // Create user record
      await createUser({
        email: data.email,
        phone: data.phone,
        countryFrom: data.country, // Using current country as countryFrom
        cityFrom: data.city, // Using current city as cityFrom
        countryTo: "Spain", // Default to Spain as it's for Schengen visa
        cityTo: "Madrid", // Default to Madrid
        subscriptionType: selectedPlan || 'monthly',
      });

      setContactInfo(data);
      setShowContactForm(false);
      setShowPaymentModal(true);
      setError(null);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to process your request. Please try again.');
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Find Your Slot</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your subscription plan and start finding visa appointments today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingPlan
            name="Weekly Plan"
            price={1.99}
            interval="week"
            description="Weekly subscription at €1.99"
            onClick={handlePlanClick}
          />
          
          <PricingPlan
            name="Monthly Plan"
            price={5.99}
            interval="month"
            description="Monthly subscription at €5.99"
            isPopular={true}
            onClick={handlePlanClick}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Secure payment powered by Stripe • Cancel anytime
          </p>
        </div>
      </div>

      {showContactForm && (
        <ContactForm
          onSubmit={handleContactSubmit}
          onClose={() => setShowContactForm(false)}
        />
      )}

      {showPaymentModal && contactInfo && selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          userEmail={contactInfo.email}
          userPhone={contactInfo.phone}
          selectedPlan={selectedPlan}
          country={contactInfo.country}
          city={contactInfo.city}
        />
      )}
    </section>
  );
};

export default CallToAction;