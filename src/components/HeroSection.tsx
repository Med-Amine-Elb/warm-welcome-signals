
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const parallaxValue = scrollY * 0.4;
      bgRef.current.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
      
      // Text fade effect
      if (titleRef.current && textRef.current && ctaRef.current) {
        const fadeValue = 1 - (scrollY / 500);
        if (fadeValue > 0) {
          titleRef.current.style.opacity = fadeValue.toString();
          titleRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
          
          textRef.current.style.opacity = fadeValue.toString();
          textRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
          
          ctaRef.current.style.opacity = fadeValue.toString();
          ctaRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0 parallax-bg"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Gradient Overlay with enhanced depth */}
      <div className="absolute inset-0 hero-gradient z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
        <div className="max-w-5xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient"
            style={{ 
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            {title}
          </h1>
          
          <p 
            ref={textRef}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
            style={{ transition: 'transform 0.5s ease-out, opacity 0.5s ease-out' }}
          >
            {subtitle}
          </p>
          
          <div 
            ref={ctaRef}
            style={{ transition: 'transform 0.5s ease-out, opacity 0.5s ease-out' }}
          >
            <Link to={ctaLink}>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/80 text-white font-medium px-10 py-7 rounded-md 
                  transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-glow"
              >
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-14 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
