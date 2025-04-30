import React from 'react';
import { Search, Bell, Calendar, Check } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Select Your Destination",
      description: "Choose the country you're applying to and the type of visa you need.",
      color: "bg-blue-500",
      number: 1
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Set Your Date Range",
      description: "Tell us your preferred appointment dates or how flexible you can be.",
      color: "bg-cyan-500",
      number: 2
    },
    {
      icon: <Bell className="h-8 w-8 text-white" />,
      title: "Get Notifications",
      description: "We'll alert you as soon as an appointment slot becomes available.",
      color: "bg-indigo-500",
      number: 3
    },
    {
      icon: <Check className="h-8 w-8 text-white" />,
      title: "Book Your Appointment",
      description: "Follow our link to quickly secure your visa appointment slot.",
      color: "bg-green-500",
      number: 4
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">It Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding your visa appointment is simple with our easy 4-step process.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 shadow-lg relative`}>
                  {step.icon}
                  <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
                    <span className="text-gray-800 font-bold">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg">
            Start Finding Appointments
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;