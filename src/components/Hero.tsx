import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { ContactForm, ContactInfo } from './CallToAction';

interface PricingPlanProps {
  name: string;
  price: number;
  interval: string;
  description: string;
  isPopular?: boolean;
  onClick: (planType: 'weekly' | 'monthly') => void;
}

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
        : 'border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
    } rounded-2xl p-8 transition-all relative`}
  >
    {isPopular && (
      <div className="absolute -top-3 right-4 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
        POPULAR
      </div>
    )}
    
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="flex items-center justify-center mb-4">
        <span className="text-gray-500 text-2xl">€</span>
        <span className="text-5xl font-bold text-gray-900 mx-1">{price}</span>
        <span className="text-gray-500">/{interval}</span>
      </div>
      
      <p className="text-gray-600 mb-8">
        {description}
      </p>
      
      <button 
        onClick={() => onClick(interval === 'week' ? 'weekly' : 'monthly')}
        className={`w-full ${
          isPopular
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
        } px-6 py-3 rounded-xl transition-colors flex items-center justify-center font-medium text-lg`}
        aria-label={`Subscribe to ${name}`}
      >
        <span>Subscribe Now</span>
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  const handlePlanClick = (planType: 'weekly' | 'monthly') => {
    setSelectedPlan(planType);
    setShowContactForm(true);
  };

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-cyan-50" aria-labelledby="main-heading">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 id="main-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Find Your <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Schengen Visa Appointment</span> With Ease
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Never miss a Schengen visa appointment slot again. We'll monitor embassy calendars across Europe and notify you instantly when appointments become available.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PricingPlan
                  name="Weekly Monitoring"
                  price={1.99}
                  interval="week"
                  description="Weekly subscription for Schengen visa appointment alerts in your preferred consulate"
                  onClick={handlePlanClick}
                />
                
                <PricingPlan
                  name="Monthly Monitoring"
                  price={5.99}
                  interval="month"
                  description="Full month of Schengen visa slot monitoring with priority notifications"
                  isPopular={true}
                  onClick={handlePlanClick}
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Secure payment powered by Stripe • Cancel anytime
                </p>
              </div>

              <div className="mt-12 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose VisaSlot for Schengen Appointments</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2" aria-hidden="true"></span>
                    <span>Real-time monitoring of all Schengen country consulates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" aria-hidden="true"></span>
                    <span>Instant SMS & email notifications when slots open</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-2" aria-hidden="true"></span>
                    <span>Coverage for all 26 Schengen countries</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-full opacity-50 animate-pulse" aria-hidden="true"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
                
                <figure className="relative bg-white p-4 rounded-2xl shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Person checking Schengen visa appointment calendar"
                    className="rounded-xl w-full h-auto"
                    width="500"
                    height="375"
                    loading="eager"
                  />
                  <figcaption className="sr-only">Visual representation of checking Schengen visa appointments</figcaption>
                  
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-3 px-5 rounded-full shadow-lg flex items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-2">New</span>
                    <span className="text-gray-700">Same-day Schengen slot alerts!</span>
                  </div>
                </figure>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supported Schengen Countries</h2>
            <p className="mb-6 text-gray-600">Our service monitors visa appointment availability for all 26 Schengen countries:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Austria', 'Belgium', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'].map((country) => (
                <span key={country} className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {country}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
      
      {showContactForm && (
        <ContactForm
          onSubmit={(data) => {
            setContactInfo(data);
            setShowContactForm(false);
            setShowPaymentModal(true);
          }}
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
    </>
  );
};

export default Hero;