
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { Car, Settings, Calendar, Search } from 'lucide-react';

const mainServices = [
  {
    icon: <Car className="w-6 h-6" />,
    title: "Vente de Véhicules",
    description: "Une sélection exclusive des plus belles voitures de luxe et de sport du marché, rigoureusement inspectées et préparées pour vous offrir une expérience de conduite incomparable."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Service Technique",
    description: "Notre équipe de mécaniciens hautement qualifiés vous assure un entretien et des réparations de qualité pour maintenir votre véhicule dans un état optimal, en utilisant uniquement des pièces d'origine."
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Essai sur Rendez-vous",
    description: "Réservez un essai personnalisé dans un environnement adapté pour découvrir votre future voiture. Nos conseillers vous accompagnent pour une expérience sur mesure, sans pression commerciale."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Recherche Personnalisée",
    description: "Vous ne trouvez pas la voiture de vos rêves ? Notre service de recherche sur mesure vous permet de définir précisément vos critères, et nous nous chargeons de trouver le véhicule parfait."
  }
];

const MainServices = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-scroll="fade-up">
          <h2 className="text-3xl font-bold mb-4">Services Premium</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de services conçus pour vous offrir une expérience automobile d'exception.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainServices.map((service, index) => (
            <div 
              key={index}
              data-scroll="fade-up"
              data-delay={index * 2}
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
    </section>
  );
};

export default MainServices;
