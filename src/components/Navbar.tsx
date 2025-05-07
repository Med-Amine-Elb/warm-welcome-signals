
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black py-4 shadow-lg' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`text-3xl font-bold tracking-tight ${isScrolled ? 'text-white' : 'text-black'}`}>DriveLuxe</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          <Link to="/" className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}>
            Accueil
          </Link>
          <Link to="/vehicles" className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}>
            Voitures
          </Link>
          <Link to="/services" className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}>
            Services
          </Link>
          <Link to="/about" className={`text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-colors ${isScrolled ? 'text-white' : 'text-black'}`}>
            À Propos
          </Link>
          <Link to="/contact" className={`px-8 py-3 rounded-full bg-black text-white text-sm uppercase tracking-wider font-medium 
                transition-all hover:bg-gray-800 ${isScrolled ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-white' : 'text-black'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black p-6 animate-fade-in">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-sm font-medium uppercase tracking-wider text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/vehicles" 
              className="text-sm font-medium uppercase tracking-wider text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Voitures
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium uppercase tracking-wider text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium uppercase tracking-wider text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 rounded-full bg-white text-black w-full flex justify-center text-sm uppercase tracking-wider font-medium transition-all hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
      
      {/* Floating Schedule Button (Inspired by the UJET design) */}
      <div className="hidden lg:block">
        <Link to="/contact" className="fixed right-8 bottom-8 w-20 h-20 rounded-full bg-black text-white flex items-center justify-center
           shadow-lg transform transition-transform hover:scale-105 z-50">
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
