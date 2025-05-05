
import { useEffect } from 'react';
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
  useEffect(() => {
    window.scrollTo(0, 0);
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
        
        <FeaturedCars />
        
        <section className="section-padding bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services Premium</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous offrons une gamme complète de services pour répondre à tous vos besoins automobiles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
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
        </section>
        
        <AboutSection />
        
        <section className="relative py-32">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" }} />
          <div className="absolute inset-0 bg-card/80" />
          <div className="relative z-10 container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient max-w-4xl mx-auto">
              Prêt à découvrir votre prochaine voiture de rêve ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Prenez rendez-vous dès aujourd'hui pour un essai personnalisé ou visitez notre showroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Prendre rendez-vous
              </a>
              <a 
                href="#" 
                className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition-colors"
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
