
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedCars from '@/components/FeaturedCars';
import AboutSection from '@/components/AboutSection';
import ServiceCard from '@/components/ServiceCard';
import { Calendar, Car, Search, Settings } from 'lucide-react';

const services = [
  {
    icon: <Car className="w-6 h-6" />,
    title: "Voitures d'Exception",
    description: "Une sélection rigoureuse des plus belles voitures de luxe et de sport du marché."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Service Technique",
    description: "Des mécaniciens hautement qualifiés pour l'entretien et la réparation de votre véhicule."
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Essai sur Rendez-vous",
    description: "Réservez un essai personnalisé pour découvrir votre future voiture dans les meilleures conditions."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Recherche Personnalisée",
    description: "Nous trouvons pour vous le véhicule de vos rêves selon vos critères spécifiques."
  }
];

const Index = () => {
  // Refs for scroll animation sections
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Initialize scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add animation classes when element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    
    // Target elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroSection 
          title="L'Excellence Automobile à Votre Portée"
          subtitle="Découvrez notre collection exclusive de voitures de luxe et vivez une expérience automobile sans égale."
          ctaText="Explorer notre collection"
        />
        
        <div className="relative overflow-hidden">
          <FeaturedCars />
          
          <div ref={servicesRef} className="section-padding bg-background relative z-10">
            <div className="container mx-auto">
              <div 
                className="text-center mb-16 opacity-0" 
                data-scroll="fade-up"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient relative">
                  Nos Services Premium
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent"></span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Nous offrons une gamme complète de services pour répondre à tous vos besoins automobiles.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="opacity-0" 
                    data-scroll="fade-up"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <ServiceCard 
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <AboutSection />
        
        <section ref={ctaRef} className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 transition-transform duration-1000" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
              transform: 'scale(1.05)'
            }} 
            data-scroll="zoom-out"
          />
          <div className="absolute inset-0 bg-card/80" />
          <div 
            className="relative z-10 container mx-auto text-center px-4 opacity-0" 
            data-scroll="fade-up"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient max-w-4xl mx-auto">
              Prêt à découvrir votre prochaine voiture de rêve ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Prenez rendez-vous dès aujourd'hui pour un essai personnalisé ou visitez notre showroom.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0" 
              data-scroll="fade-up"
              style={{ transitionDelay: '200ms' }}
            >
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-md font-medium transition-colors transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                Prendre rendez-vous
              </a>
              <a 
                href="#" 
                className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition-colors transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
