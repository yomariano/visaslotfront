import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, rating, image }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-start mb-4">
      <div className="mr-4 mt-1">
        <Quote className="h-10 w-10 text-blue-100" />
      </div>
      <p className="text-gray-700 italic">{quote}</p>
    </div>
    
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "VisaSlot helped me secure an emergency visa appointment when all official channels showed no availability for months.",
      name: "Alex Johnson",
      title: "Student, United States",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      quote: "I was about to postpone my business trip due to no visa appointments, but VisaSlot found me a slot within 2 days!",
      name: "Sarah Chen",
      title: "Business Analyst, Singapore",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      quote: "The notifications are fast and reliable. Got an alert and booked my appointment within minutes before it was gone.",
      name: "Miguel Hernandez",
      title: "Software Engineer, Mexico",
      rating: 4,
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who found their visa appointments with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>

        <div className="mt-16 bg-white p-6 md:p-8 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">25,000+</div>
              <p className="text-gray-600">Appointments Found</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-cyan-500 mb-2">100+</div>
              <p className="text-gray-600">Countries Covered</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-500 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-500 mb-2">15,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;