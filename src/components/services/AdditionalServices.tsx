
import React from 'react';
import { Card } from '@/components/ui/card';

const additionalServices = [
  {
    title: "Financement sur Mesure",
    description: "Des solutions de financement adaptées à votre situation, avec des taux compétitifs et des options flexibles."
  },
  {
    title: "Assurance Tous Risques",
    description: "Des offres d'assurance complètes pour protéger votre investissement automobile."
  },
  {
    title: "Importation de Véhicules",
    description: "Un service d'importation de véhicules rares depuis l'étranger, en gérant toutes les formalités administratives."
  },
  {
    title: "Personnalisation",
    description: "Des options de personnalisation pour rendre votre voiture unique, depuis les jantes jusqu'à l'intérieur."
  },
  {
    title: "Conciergerie",
    description: "Un service premium pour gérer tous les aspects de votre expérience automobile, de la livraison à domicile à la prise en charge pour l'entretien."
  },
  {
    title: "Garantie Étendue",
    description: "Extension de garantie pour une tranquillité d'esprit totale, avec assistance routière 24/7."
  }
];

const AdditionalServices = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-scroll="fade-up">
          <h2 className="text-3xl font-bold mb-4">Services Complémentaires</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pour une expérience encore plus complète, nous vous proposons également ces services sur mesure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {additionalServices.map((service, index) => (
            <Card 
              key={index} 
              className="glass-card p-6 hover-scale"
              data-scroll="zoom-in"
              data-delay={index}
            >
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
