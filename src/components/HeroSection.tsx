
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText = "Découvrir",
  ctaLink = "/vehicles",
  backgroundImage = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
}: HeroSectionProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Enhanced parallax effect on scroll
    const handleScroll = () => {
      if (!bgRef.current || !contentRef.current) return;
      
      const scrollY = window.scrollY;
      const parallaxValue = scrollY * 0.5; // Increased effect
      const opacityValue = 1 - (scrollY / 600); // Faster fade
      
      bgRef.current.style.transform = `translateY(${parallaxValue}px) scale(${1 + scrollY * 0.0005})`;
      
      if (opacityValue > 0) {
        contentRef.current.style.opacity = opacityValue.toString();
        contentRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Split layout for UJET-like design */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Text content */}
        <div 
          ref={contentRef}
          className="relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24"
          style={{ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
        >
          <div className="max-w-xl">
            <h1 className="ujet-heading mb-8">
              {title}
            </h1>
            
            <p className="ujet-subheading mb-12 max-w-md">
              {subtitle}
            </p>
            
            <Link 
              to={ctaLink}
              className="btn-ujet flex items-center w-fit group"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Right side: Image with enhanced parallax and scaling */}
        <div className="hidden md:block relative overflow-hidden">
          <div 
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          />
        </div>
      </div>
      
      {/* Mobile background (only visible on mobile) */}
      <div 
        className="absolute inset-0 md:hidden bg-cover bg-center z-0 opacity-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Scroll indicator - UJET style with dot animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
          <div className="w-0.5 h-8 bg-black/20 relative">
            <div className="absolute w-1.5 h-1.5 -left-0.5 rounded-full bg-black animate-bounce-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
