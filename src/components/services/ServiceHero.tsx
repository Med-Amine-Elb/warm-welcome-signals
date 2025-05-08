
import React from 'react';

const ServiceHero = () => {
  return (
    <section 
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="relative z-10 text-center max-w-4xl px-4" data-scroll="text-reveal">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">Excellence Automobile</h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
          Transformez votre vision automobile en réalité avec notre expertise premium.
        </p>
      </div>
    </section>
  );
};

export default ServiceHero;
