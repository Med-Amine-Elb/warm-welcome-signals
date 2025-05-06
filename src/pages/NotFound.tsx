
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ScrollAnimation>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-6 py-24 text-center">
            <div data-scroll="fade-up" className="mb-12">
              <h1 className="ujet-heading mb-6">404</h1>
              <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
              <p className="ujet-subheading mb-12 max-w-md mx-auto">
                Cette page n'existe pas ou a été déplacée.
              </p>
            </div>
            
            <Link 
              to="/"
              data-scroll="fade-up" 
              className="btn-ujet inline-flex items-center group mx-auto"
              style={{ '--scroll-delay': 2 } as React.CSSProperties}
            >
              <ArrowLeft className="mr-2 w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </ScrollAnimation>
  );
};

export default NotFound;
