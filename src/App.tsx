import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin imports have been removed and moved to My_dashboard
import ServiceDetails from './pages/ServiceDetails';

// Public Layout Wrapper
function PublicLayout() {
  const location = useLocation();
  const isBookingPage = location.pathname === '/booking';

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] text-[#1A1A1A] relative selection:bg-[#B8860B]/20 selection:text-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Sticky Contact Widget */}
      {!isBookingPage && (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
          <a 
            href="https://wa.me/201223747594" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="تواصل عبر واتساب"
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ring-4 ring-white/60"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
