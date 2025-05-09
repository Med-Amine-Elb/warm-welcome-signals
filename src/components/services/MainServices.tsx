import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { Car, Settings, Calendar, Search } from 'lucide-react';

const mainServices = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Vente de Véhicules",
    description: "Une sélection exclusive des plus belles voitures de luxe et de sport du marché, rigoureusement inspectées et préparées pour vous offrir une expérience de conduite incomparable."
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Service Technique",
    description: "Notre équipe de mécaniciens hautement qualifiés vous assure un entretien et des réparations de qualité pour maintenir votre véhicule dans un état optimal, en utilisant uniquement des pièces d'origine."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Essai sur Rendez-vous",
    description: "Réservez un essai personnalisé dans un environnement adapté pour découvrir votre future voiture. Nos conseillers vous accompagnent pour une expérience sur mesure, sans pression commerciale."
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Recherche Personnalisée",
    description: "Vous ne trouvez pas la voiture de vos rêves ? Notre service de recherche sur mesure vous permet de définir précisément vos critères, et nous nous chargeons de trouver le véhicule parfait."
  }
];

const MainServices = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Services Premium</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de services conçus pour vous offrir une expérience automobile d'exception.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow hover:shadow-2xl transition-transform duration-300 hover:scale-105 p-8 flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:animate-pulse">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
