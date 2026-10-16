import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return isActive 
      ? "text-[#B8860B] font-bold transition-all relative after:content-[''] after:absolute after:bottom-[-6px] after:right-0 after:left-0 after:h-[2px] after:bg-[#B8860B]" 
      : "text-[#6B6B6B] hover:text-[#1A1A1A] font-medium transition-colors";
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return isActive 
      ? "bg-[#B8860B]/10 text-[#B8860B] font-bold border-r-4 border-[#B8860B] block px-4 py-3" 
      : "text-[#6B6B6B] font-medium hover:bg-[#F5F3F0] hover:text-[#1A1A1A] block px-4 py-3 border-r-4 border-transparent transition-colors";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <img 
              src="/img11111.png" 
              alt="شعار المستشار بهاء البحيري" 
              className="w-12 h-12 rounded-xl object-contain shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-[#1A1A1A] tracking-tight group-hover:text-[#B8860B] transition-colors">
                المستشار بهاء البحيري
              </span>
              <span className="text-[11px] text-[#B8860B] font-bold tracking-wider">
                محامٍ بالنقض والدستورية العليا
              </span>
            </div>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-base">
            <Link to="/" className={getLinkClass('/')}>الرئيسية</Link>
            <Link to="/services" className={getLinkClass('/services')}>الخدمات القانونية</Link>
            <Link to="/about" className={getLinkClass('/about')}>عن المحامي</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>تواصل معنا</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {location.pathname !== '/booking' && (
              <Link 
                to="/booking" 
                className="bg-[#B8860B] hover:bg-[#996515] text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                احجز استشارة
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1A1A1A] hover:text-[#B8860B] p-2 focus:outline-none transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#FAFAF8] border-b border-[#E8E4DF] shadow-xl py-3 flex flex-col animate-in slide-in-from-top-2 duration-200">
          <Link to="/" className={getMobileLinkClass('/')} onClick={closeMenu}>الرئيسية</Link>
          <Link to="/services" className={getMobileLinkClass('/services')} onClick={closeMenu}>الخدمات القانونية</Link>
          <Link to="/about" className={getMobileLinkClass('/about')} onClick={closeMenu}>عن المحامي</Link>
          <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={closeMenu}>تواصل معنا</Link>
          
          {location.pathname !== '/booking' && (
            <div className="border-t border-[#E8E4DF] mt-2 pt-4 px-4 pb-2 flex flex-col gap-3">
              <Link 
                to="/booking" 
                className="w-full text-center bg-[#B8860B] hover:bg-[#996515] text-white px-6 py-3 rounded-xl font-bold shadow-sm"
                onClick={closeMenu}
              >
                احجز استشارة الآن
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
