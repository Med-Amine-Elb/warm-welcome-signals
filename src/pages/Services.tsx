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
    document.body.classList.add('services-page');
    return () => {
      document.body.classList.remove('services-page');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#10131a] to-[#181c24]">
      <Navbar />
      <main className="flex-grow">
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
