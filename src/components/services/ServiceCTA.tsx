
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Navigation } from 'lucide-react';

const ServiceCTA = () => {
  return (
    <section className="py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562101806-67eb6ad48f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed opacity-10"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="glass-card p-12 md:p-16 rounded-lg" data-scroll="zoom-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Concrétisez votre rêve automobile</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
              </p>
              <p className="text-lg text-muted-foreground font-light italic">
                "L'excellence n'est pas une action, c'est une habitude." - Nous incarnons cette philosophie dans chaque service que nous proposons.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-4">
              <Button className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2 h-14 text-lg px-8">
                <Phone className="w-5 h-5" />
                <span>Nous appeler</span>
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 h-14 text-lg px-8">
                <Navigation className="w-5 h-5" />
                <span>Visiter le showroom</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
