
import React from 'react';

const ServiceHero = () => {
  return (
    <section 
      className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632752893012-6b22e8467e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwc2VydmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center" data-scroll="fade-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Nos Services</h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Des solutions premium pour répondre à tous vos besoins automobiles.
        </p>
      </div>
    </section>
  );
};

export default ServiceHero;
