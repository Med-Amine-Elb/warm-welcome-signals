
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Calendar, Car, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '@/components/ScrollAnimation';

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
    <ScrollAnimation>
      <div className="min-h-screen">
        <Navbar />
        
        <main>
          <HeroSection 
            title="L'Excellence Automobile"
            subtitle="Découvrez notre collection exclusive de voitures de luxe et vivez une expérience automobile sans égale."
            ctaText="Explorer notre collection"
          />
          
          {/* Featured Cars Section - UJET-inspired layout */}
          <section className="py-24 px-6 md:px-16 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                <div className="mb-8 md:mb-0">
                  <h2 data-scroll="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Véhicules en Vedette</h2>
                  <div data-scroll="reveal" className="w-16 h-1 bg-black mb-6"></div>
                  <p data-scroll="fade-up" className="max-w-md text-gray-600">
                    Découvrez notre sélection des plus belles voitures de luxe disponibles dès maintenant.
                  </p>
                </div>
                <Link 
                  data-scroll="fade-left" 
                  to="/vehicles" 
                  className="btn-ujet mt-4"
                >
                  Voir tous les véhicules
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
                {/* Will use existing FeaturedCars component that can't be modified */}
              </div>
            </div>
          </section>
          
          {/* Services Section - Split layout inspired by UJET */}
          <section className="split-layout full-bleed">
            {/* Left panel */}
            <div className="bg-black text-white py-24 px-6 md:px-16 flex items-center">
              <div className="max-w-xl">
                <h2 data-scroll="fade-up" className="text-4xl md:text-5xl font-bold mb-8">
                  Nos Services Premium
                </h2>
                <p data-scroll="fade-up" className="text-xl mb-10 opacity-80">
                  Nous offrons une gamme complète de services pour répondre à tous vos besoins automobiles.
                </p>
                <Link to="/services" data-scroll="fade-up" className="inline-block border border-white py-3 px-8 uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                  Tous nos services
                </Link>
              </div>
            </div>
            
            {/* Right panel */}
            <div className="bg-white py-24 px-6 md:px-16">
              <div className="grid grid-cols-1 gap-6 md:gap-10">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="opacity-0" 
                    data-scroll="fade-left"
                    style={{ '--scroll-delay': index * 2 } as React.CSSProperties}
                  >
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-4 rounded-full mr-6">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* About Section - UJET-inspired design */}
          <section className="py-24 px-6 md:px-16 bg-white">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div data-scroll="fade-right">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Notre Histoire</h2>
                  <div className="w-16 h-1 bg-black mb-8"></div>
                  <p className="text-gray-600 mb-6">
                    Fondée en 2005, DriveLuxe s'est imposée comme la référence des concessions automobiles de luxe en France. Notre passion pour l'excellence automobile nous a conduits à sélectionner rigoureusement les véhicules les plus prestigieux pour notre clientèle exigeante.
                  </p>
                  <p className="text-gray-600 mb-10">
                    Chez DriveLuxe, nous ne vendons pas simplement des voitures, nous offrons une expérience complète, de la recherche du véhicule idéal à l'entretien régulier, en passant par des services personnalisés qui font notre réputation.
                  </p>
                  <Link to="/about" className="inline-block bg-black text-white px-8 py-3 font-medium tracking-wider uppercase hover:bg-black/80 transition-colors">
                    En savoir plus
                  </Link>
                </div>
                
                <div className="relative image-hover" data-scroll="fade-left">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Showroom de voitures de luxe"
                    className="w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -left-6 w-1/2 h-24 bg-black z-0"></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Full-width CTA Section */}
          <section className="relative py-32 overflow-hidden bg-black text-white">
            <div className="container mx-auto px-6 md:px-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8" 
                  data-scroll="fade-up"
                >
                  Prêt à découvrir votre prochaine voiture de rêve ?
                </h2>
                <p 
                  className="text-xl opacity-80 mb-12"
                  data-scroll="fade-up"
                  style={{ '--scroll-delay': 2 } as React.CSSProperties}
                >
                  Prenez rendez-vous dès aujourd'hui pour un essai personnalisé ou visitez notre showroom.
                </p>
                <div 
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  data-scroll="fade-up"
                  style={{ '--scroll-delay': 4 } as React.CSSProperties}
                >
                  <Link 
                    to="/contact" 
                    className="btn-ujet bg-white text-black hover:bg-gray-200"
                  >
                    Prendre rendez-vous
                  </Link>
                  <Link 
                    to="/contact" 
                    className="border border-white text-white px-8 py-3 uppercase text-sm tracking-wider font-medium 
                            transition-all hover:bg-white hover:text-black"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </ScrollAnimation>
  );
};

export default Index;
