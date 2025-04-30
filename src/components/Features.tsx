import React from 'react';
import { Bell, Clock, Globe, Shield, Zap, ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, accentColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${accentColor}`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="mt-4">
      <a href="#" className="flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors text-sm">
        Learn more
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Bell className="h-6 w-6 text-white" />,
      title: "Instant Notifications",
      description: "Get alerted the moment a new appointment slot becomes available for your preferred dates.",
      accentColor: "bg-blue-500"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Real-Time Monitoring",
      description: "Our system checks for new appointment slots every few minutes, 24/7.",
      accentColor: "bg-cyan-500"
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Worldwide Coverage",
      description: "Support for visa appointments across 100+ countries and multiple visa types.",
      accentColor: "bg-indigo-500"
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Quick Booking",
      description: "One-click booking links that take you directly to the available appointment slot.",
      accentColor: "bg-orange-500"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Secure & Private",
      description: "We never store your sensitive visa information, only your appointment preferences.",
      accentColor: "bg-emerald-500"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Flexible Date Ranges",
      description: "Set your ideal date range or get alerts for any available slot in case of urgency.",
      accentColor: "bg-purple-500"
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">VisaSlot</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've made finding visa appointments simple, fast, and stress-free with these powerful features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;