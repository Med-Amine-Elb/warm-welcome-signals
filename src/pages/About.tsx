
import { useEffect, useLayoutEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import AboutSection from '@/components/AboutSection';

// Updated timeline content to match the luxury car theme
const timeline = [
  {
    year: "2005",
    title: "Création de DriveLuxe",
    description: "Fondation de DriveLuxe à Paris avec une collection initiale de véhicules de luxe."
  },
  {
    year: "2012",
    title: "Expansion Nationale",
    description: "Ouverture de nouvelles concessions sur la Côte d'Azur et à Lyon."
  },
  {
    year: "2018",
    title: "Innovation Digitale",
    description: "Lancement de notre plateforme en ligne pour une expérience client personnalisée."
  }
];

// Team member
const founder = {
  name: "Alexandre Dupont",
  role: "Fondateur & Directeur",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
};

const About = () => {
  // Pre-load critical images
  useLayoutEffect(() => {
    const preloadImages = [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      founder.image
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add small timeout to allow DOM to be fully rendered before applying animations
    const timeout = setTimeout(() => {
      // Parallax scroll effect for background elements
      const handleScroll = () => {
        const scrollValue = window.scrollY;
        const bgElements = document.querySelectorAll('.parallax-bg');
        
        bgElements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = Number(element.dataset.speed) || 0.5;
          element.style.transform = `translateY(${scrollValue * speed}px)`;
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // Apply initial animations
      document.querySelectorAll('[data-scroll]').forEach(el => {
        el.classList.add('animate-in');
      });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeout);
      };
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] text-white overflow-hidden">
      <Navbar />
      
      <main>
        {/* Hero Section - Full-height split design */}
        <section className="h-screen relative flex flex-col">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Dark with text */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
              <div className="space-y-6">
                <span className="text-sm uppercase tracking-wider text-gray-400" data-scroll="fade-right">
                  À PROPOS
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight" data-scroll="fade-right">
                  Notre <br/> Histoire
                </h1>
                <p className="text-xl text-gray-300 max-w-md" data-scroll="fade-right" data-delay="200">
                  Découvrez l'engagement de DriveLuxe envers l'excellence automobile depuis 2005.
                </p>
              </div>
            </div>
            
            {/* Right side - Image or Design Element */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-3/4 h-3/4 relative">
                {/* Large letter styling */}
                <div className="absolute inset-0 text-[#2A2F3C] text-[40rem] font-bold leading-none opacity-20 flex items-center justify-center z-0 parallax-bg" data-speed="0.2">
                  D
                </div>
                
                <div className="relative z-10 w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="DriveLuxe showroom" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider mb-2 text-gray-400">Scroll</span>
            <ArrowDown className="w-5 h-5 animate-bounce-slow" />
          </div>
        </section>
        
        {/* Philosophy Section - Full width dark section */}
        <section className="py-32 px-8 md:px-16 lg:px-24 bg-[#1A1F2C]">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-12" data-scroll="fade-up">
                  Notre philosophie
                </h2>
                
                <div className="space-y-8">
                  <p className="text-xl text-gray-300" data-scroll="fade-up">
                    Fondée en 2005, DriveLuxe s'est imposée comme la référence des concessions automobiles de luxe en France. Notre passion pour l'excellence automobile guide chacune de nos décisions.
                  </p>
                  <p className="text-xl text-gray-300" data-scroll="fade-up" data-delay="200">
                    Chez DriveLuxe, nous ne vendons pas simplement des voitures, nous créons des expériences inoubliables pour les passionnés d'automobiles d'exception.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div data-scroll="fade-up" data-delay="300">
                  <p className="text-5xl font-bold text-white mb-2">15+</p>
                  <p className="text-gray-400">Années d'expérience</p>
                </div>
                <div data-scroll="fade-up" data-delay="400">
                  <p className="text-5xl font-bold text-white mb-2">500+</p>
                  <p className="text-gray-400">Clients satisfaits</p>
                </div>
                <div data-scroll="fade-up" data-delay="500">
                  <p className="text-5xl font-bold text-white mb-2">100+</p>
                  <p className="text-gray-400">Véhicules en stock</p>
                </div>
                <div data-scroll="fade-up" data-delay="600">
                  <p className="text-5xl font-bold text-white mb-2">24/7</p>
                  <p className="text-gray-400">Support client</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section with image */}
        <section className="py-32 px-8 md:px-16 lg:px-24 bg-[#151A24]">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Image Column */}
              <div className="order-2 md:order-1">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                    alt="Performance car"
                    className="w-full object-cover"
                    data-scroll="reveal"
                    loading="eager"
                  />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1A1F2C] z-10"></div>
                </div>
              </div>
              
              {/* Timeline Column */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-12" data-scroll="fade-up">
                  Notre parcours
                </h2>
                
                <div className="space-y-16">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative" data-scroll="fade-up" data-delay={index * 200}>
                      <div className="flex flex-col">
                        <span className="text-5xl font-bold text-gray-800">{item.year}</span>
                        <h3 className="text-2xl font-medium mt-2">{item.title}</h3>
                        <p className="text-gray-400 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/vehicles" className="inline-block mt-12 py-4 px-6 border border-white text-sm uppercase tracking-wider hover:bg-white hover:text-[#1A1F2C] transition-colors" data-scroll="fade-up">
                  Découvrir nos véhicules
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section - with full-width image */}
        <section className="py-32 px-8 md:px-16 lg:px-24 bg-[#1A1F2C]">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16" data-scroll="fade-up">
              La Direction
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8" data-scroll="fade-right">
                  <h3 className="text-3xl font-medium">{founder.name}</h3>
                  <p className="text-gray-400 mt-2">{founder.role}</p>
                </div>
                
                <p className="text-xl text-gray-300" data-scroll="fade-right" data-delay="200">
                  "Passionné par l'automobile de luxe depuis mon enfance, j'ai fondé DriveLuxe avec la vision de créer plus qu'une simple concession. Notre mission est de transformer l'achat d'un véhicule en une expérience mémorable, en alliant expertise technique, service impeccable et attention aux détails."
                </p>
              </div>
              
              <div className="relative" data-scroll="reveal">
                <img 
                  src={founder.image}
                  alt={founder.name}
                  className="w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action - full-width section */}
        <section className="py-32 px-8 md:px-16 lg:px-24 bg-[#151A24] text-center">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8" data-scroll="fade-up">
              Prêt à découvrir <br/> l'excellence automobile?
            </h2>
            
            <Link 
              to="/vehicles"
              className="inline-block mt-8 py-4 px-12 bg-white text-[#1A1F2C] text-sm uppercase tracking-wider hover:bg-opacity-90 transition-colors"
              data-scroll="fade-up" data-delay="200"
            >
              Explorer notre collection
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
