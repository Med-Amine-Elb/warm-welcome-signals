
import React from 'react';

const ServiceProcess = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16" data-scroll="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Notre Processus</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un service d'excellence en toute transparence, du premier contact à la livraison.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="relative" data-scroll="fade-right" style={{ transitionDelay: '0ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">1</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Consultation</h3>
              <p className="text-muted-foreground text-lg">
                Un conseiller dédié prend le temps de comprendre vos besoins et préférences pour vous orienter vers les meilleures options.
              </p>
            </div>
          </div>
          
          <div className="relative" data-scroll="fade-right" style={{ transitionDelay: '200ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">2</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Essai Personnalisé</h3>
              <p className="text-muted-foreground text-lg">
                Testez les véhicules présélectionnés lors d'essais routiers adaptés à vos attentes, dans des conditions optimales.
              </p>
            </div>
          </div>
          
          <div className="relative" data-scroll="fade-right" style={{ transitionDelay: '400ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">3</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Personnalisation</h3>
              <p className="text-muted-foreground text-lg">
                Configurez votre véhicule selon vos préférences, des finitions aux accessoires, pour une voiture qui vous ressemble.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative" data-scroll="fade-left" style={{ transitionDelay: '0ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">4</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Financement</h3>
              <p className="text-muted-foreground text-lg">
                Notre équipe financière vous accompagne pour trouver la solution de paiement la plus adaptée à votre situation.
              </p>
            </div>
          </div>
          
          <div className="relative" data-scroll="fade-left" style={{ transitionDelay: '200ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">5</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Préparation</h3>
              <p className="text-muted-foreground text-lg">
                Votre véhicule est minutieusement préparé par nos techniciens pour vous assurer une prise en main dans des conditions parfaites.
              </p>
            </div>
          </div>
          
          <div className="relative" data-scroll="fade-left" style={{ transitionDelay: '400ms' }}>
            <div className="glass-card p-8 h-full">
              <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">6</div>
              <h3 className="text-2xl font-medium mb-4 mt-4">Livraison</h3>
              <p className="text-muted-foreground text-lg">
                Profitez d'une livraison personnalisée avec une présentation détaillée de votre nouveau véhicule par un expert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
