import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

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
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center" aria-label="VisaSlot Home">
            <Calendar className="h-8 w-8 text-blue-500 mr-2" aria-hidden="true" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              VisaSlot
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-500 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-500 transition-colors">
              Testimonials
            </a>
            <a href="#supported-countries" className="text-gray-700 hover:text-blue-500 transition-colors">
              Schengen Countries
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-500 transition-colors flex items-center" aria-expanded="false" aria-haspopup="true">
                <span>Resources</span>
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <a href="/blog/schengen-visa-guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Schengen Visa Guide
                </a>
                <a href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  FAQs
                </a>
                <a href="/appointment-tips" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Appointment Tips
                </a>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-colors flex items-center" aria-label="Get Started with VisaSlot">
              <span>Get Started</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg animate-fadeIn" role="navigation" aria-label="Mobile Navigation">
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
                href="#supported-countries" 
                className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Schengen Countries
              </a>

              <div className="py-2 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-400 mb-2">Resources</p>
                <a 
                  href="/blog/schengen-visa-guide" 
                  className="block pl-2 py-1 text-gray-700 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schengen Visa Guide
                </a>
                <a 
                  href="/faq" 
                  className="block pl-2 py-1 text-gray-700 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQs
                </a>
                <a 
                  href="/appointment-tips" 
                  className="block pl-2 py-1 text-gray-700 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointment Tips
                </a>
              </div>
              
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-colors w-full flex items-center justify-center mt-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Get Started with VisaSlot"
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