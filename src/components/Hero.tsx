import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const countryOptions = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Japan',
  'South Korea',
];

const Hero: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                Find Your <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Visa Appointment</span> With Ease
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Never miss a visa appointment slot again. We'll find and notify you when the perfect appointment becomes available.
              </p>
              
              <div className="bg-white p-4 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row">
                  <div className="relative mb-4 md:mb-0 md:mr-4 md:flex-1">
                    <div 
                      className="border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="flex items-center">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <span className={selectedCountry === 'Select Country' ? 'text-gray-400' : 'text-gray-700'}>
                          {selectedCountry}
                        </span>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {countryOptions.map((country, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {country}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="md:flex-1 mb-4 md:mb-0 md:mr-4">
                    <div className="border border-gray-300 rounded-lg px-4 py-3 flex items-center cursor-pointer">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-400">Select dates</span>
                    </div>
                  </div>
                  
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center">
                    <span className="mr-2">Find Slots</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex items-center text-sm text-gray-500">
                <span className="flex items-center mr-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  25k+ appointments found
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  100+ countries supported
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Person looking at passport and calendar"
                  className="rounded-xl w-full max-w-md h-auto"
                />
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-3 px-5 rounded-full shadow-lg flex items-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-2">New</span>
                  <span className="text-gray-700">Same-day notifications!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;