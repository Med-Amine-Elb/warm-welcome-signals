import React from 'react';
import { Card } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

console.log("AdditionalServices mounted");

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

console.log("additionalServices array:", additionalServices);

const AdditionalServices = () => {
  return (
    <ScrollAnimation>
      <section className="py-24 px-4 md:px-8 bg-card relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560253023-3ec5d502b22f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20" data-scroll="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Services Complémentaires</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pour une expérience encore plus complète, nous vous proposons également ces services sur mesure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card 
                key={index} 
                className="glass-card p-6 hover-scale"
                data-scroll="zoom-in"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default AdditionalServices;
