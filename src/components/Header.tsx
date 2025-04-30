import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Bell, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              VisaSlot
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-500 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-500 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-500 transition-colors">
              Pricing
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-colors flex items-center">
              <span>Get Started</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-colors w-full flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Get Started</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;