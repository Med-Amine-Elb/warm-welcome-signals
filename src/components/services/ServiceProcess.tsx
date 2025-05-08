
import React from 'react';

const ServiceProcess = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-scroll="fade-up">
          <h2 className="text-3xl font-bold mb-4">Notre Processus de Service</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un service d'excellence en toute transparence, du premier contact à la livraison.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 relative" data-scroll="fade-right" data-delay="0">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">1</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Consultation</h3>
              <p className="text-muted-foreground">
                Un conseiller dédié prend le temps de comprendre vos besoins et préférences pour vous orienter vers les meilleures options.
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative" data-scroll="fade-right" data-delay="2">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">2</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Essai Personnalisé</h3>
              <p className="text-muted-foreground">
                Testez les véhicules présélectionnés lors d'essais routiers adaptés à vos attentes, dans des conditions optimales.
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative" data-scroll="fade-right" data-delay="4">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">3</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Personnalisation</h3>
              <p className="text-muted-foreground">
                Configurez votre véhicule selon vos préférences, des finitions aux accessoires, pour une voiture qui vous ressemble.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative" data-scroll="fade-left" data-delay="0">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">4</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Financement</h3>
              <p className="text-muted-foreground">
                Notre équipe financière vous accompagne pour trouver la solution de paiement la plus adaptée à votre situation.
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative" data-scroll="fade-left" data-delay="2">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">5</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Préparation</h3>
              <p className="text-muted-foreground">
                Votre véhicule est minutieusement préparé par nos techniciens pour vous assurer une prise en main dans des conditions parfaites.
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative" data-scroll="fade-left" data-delay="4">
            <div className="glass-card p-6 h-full">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">6</div>
              <h3 className="text-xl font-medium mb-3 mt-4">Livraison</h3>
              <p className="text-muted-foreground">
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
