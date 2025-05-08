
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Navigation } from 'lucide-react';

const ServiceCTA = () => {
  return (
    <section className="bg-card py-16 px-4">
      <div className="container mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-lg" data-scroll="zoom-in">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'assistance ou d'informations?</h2>
              <p className="text-muted-foreground">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Nous appeler</span>
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2">
                <Navigation className="w-4 h-4" />
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
