import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import PaymentSuccessPage from './app/payment-success/page';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <div id="supported-countries">
          <Testimonials />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;