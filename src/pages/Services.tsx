
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/services/ServiceHero';
import MainServices from '@/components/services/MainServices';
import AdditionalServices from '@/components/services/AdditionalServices';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCTA from '@/components/services/ServiceCTA';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <ServiceHero />
        <MainServices />
        <AdditionalServices />
        <ServiceProcess />
        <ServiceCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
