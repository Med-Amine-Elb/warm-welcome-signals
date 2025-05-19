
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on pages that need white text
  const isAboutPage = location.pathname === '/about';
  const isServicesPage = location.pathname === '/services';
  const isContactPage = location.pathname === '/contact';
  const useWhiteText = isAboutPage || isServicesPage || isContactPage;

  // Check scroll position on mount and whenever pathname changes
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check scroll position immediately on render (crucial for initial page load)
    checkScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [location.pathname]); // Re-run when path changes

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white py-4 shadow-md' 
          : `bg-transparent py-8 ${useWhiteText ? 'text-white' : ''}`
      }`}
    >
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">
        <Link to="/" className={`flex items-center ${isScrolled || !useWhiteText ? 'text-black' : 'text-white'}`}>
          <span className="text-3xl font-bold tracking-tight">DriveLuxe</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          <Link 
            to="/" 
            className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${
              isScrolled || !useWhiteText ? 'text-black' : 'text-white'
            }`}
          >
            Accueil
          </Link>
          <Link 
            to="/vehicles" 
            className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${
              isScrolled || !useWhiteText ? 'text-black' : 'text-white'
            }`}
          >
            Voitures
          </Link>
          <Link 
            to="/services" 
            className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${
              isScrolled || !useWhiteText ? 'text-black' : 'text-white'
            }`}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${
              isScrolled || !useWhiteText ? 'text-black' : 'text-white'
            }`}
          >
            À Propos
          </Link>
          <Link 
            to="/contact" 
            className={`btn-ujet ${isScrolled || !useWhiteText ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled || !useWhiteText ? 'text-black' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white p-6 animate-fade-in">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-sm font-medium uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/vehicles" 
              className="text-sm font-medium uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Voitures
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="btn-ujet w-full flex justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
      
      {/* Floating Schedule Button (Inspired by the UJET design) */}
      <div className="hidden lg:block">
        <Link to="/contact" className="floating-button">
          <div className="text-xs uppercase tracking-wider text-center leading-tight">
            <span className="block">Prendre</span>
            <span className="block">RDV</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
