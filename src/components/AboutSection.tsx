
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AboutSectionProps {
  isHomePage?: boolean;
}

const AboutSection = ({ isHomePage = true }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className={`section-padding ${isHomePage ? 'bg-card' : 'bg-background'}`} 
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative" data-scroll="fade-up">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Showroom de voitures de luxe"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg z-0 hidden md:block" />
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div data-scroll="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isHomePage ? 'À Propos de DriveLuxe' : 'Notre Histoire'}
              </h2>
              <div className="w-20 h-1 bg-accent mb-6" />
            </div>
            
            <div className="space-y-4" data-scroll="fade-up" data-delay="200">
              <p className="text-muted-foreground">
                Fondée en 2005, DriveLuxe s'est imposée comme la référence des concessions automobiles de luxe en France. Notre passion pour l'excellence automobile nous a conduits à sélectionner rigoureusement les véhicules les plus prestigieux pour notre clientèle exigeante.
              </p>
              <p className="text-muted-foreground">
                Chez DriveLuxe, nous ne vendons pas simplement des voitures, nous offrons une expérience complète, de la recherche du véhicule idéal à l'entretien régulier, en passant par des services personnalisés qui font notre réputation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4" data-scroll="fade-up" data-delay="400">
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-muted-foreground">Années d'expérience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-muted-foreground">Véhicules en stock</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-muted-foreground">Support client</p>
              </div>
            </div>
            
            {isHomePage && (
              <div className="pt-4" data-scroll="fade-up" data-delay="600">
                <Link to="/about">
                  <Button variant="default" className="bg-primary hover:bg-primary/80 text-white">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
