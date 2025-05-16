
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Contact Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        </div>
        <div className="container mx-auto px-6 md:px-16 relative z-20 text-white mt-20">
          <div className="max-w-3xl">
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              data-scroll="reveal"
            >
              Let's connect
            </h1>
            <div className="h-1 w-24 bg-white my-8" data-scroll="fade-right"></div>
            <p 
              className="text-xl md:text-2xl max-w-lg"
              data-scroll="fade-up"
              style={{ '--scroll-delay': '2' } as React.CSSProperties}
            >
              Contact us for reservations, inquiries, or to learn more about our luxury automotive services.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full bg-gray-100 py-4">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-black">Accueil</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black font-medium">Contact</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow py-20 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          
          {/* Contact Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column - Contact Information */}
            <div className="space-y-16">
              <div 
                className="space-y-6"
                data-scroll="fade-up"
                style={{ '--scroll-delay': '0' } as React.CSSProperties}
              >
                <h2 className="text-4xl md:text-5xl font-bold">DriveLuxe</h2>
                <p className="text-lg text-gray-600 max-w-md">
                  Notre équipe est disponible pour vous assister dans toutes vos demandes concernant nos services de location de voitures de luxe.
                </p>
              </div>

              <div 
                className="space-y-12"
                data-scroll="fade-up"
                style={{ '--scroll-delay': '2' } as React.CSSProperties}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Adresse</h3>
                  <div className="text-gray-600">
                    <p>123 Avenue des Champs-Élysées</p>
                    <p>75008 Paris, France</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Contact</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Email: info@driveluxe.com</p>
                    <p>Téléphone: +33 1 23 45 67 89</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Horaires</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Lundi - Vendredi: 9h - 19h</p>
                    <p>Samedi: 10h - 18h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Cards */}
            <div className="space-y-8">
              {/* Card 1 - Schedule a Call */}
              <div 
                className="relative border border-gray-200 p-10 group hover-card"
                data-scroll="zoom-in"
                style={{ '--scroll-delay': '0' } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">PROGRAMMEZ UN APPEL</h3>
                    <p className="text-gray-600 mb-8">Définissez un rendez-vous téléphonique avec notre équipe</p>
                    <button className="text-underline font-medium">PROGRAMMER</button>
                  </div>
                  <span className="text-7xl md:text-9xl font-bold text-gray-100 transition-all duration-300 group-hover:text-gray-200">01</span>
                </div>
              </div>
                
              {/* Card 2 - Send a Message */}
              <div 
                className="relative border border-gray-200 p-10 group hover-card"
                data-scroll="zoom-in"
                style={{ '--scroll-delay': '2' } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">ENVOYEZ UN MESSAGE</h3>
                    <p className="text-gray-600 mb-8">Posez-nous vos questions ou faites une demande spéciale</p>
                    <button className="text-underline font-medium">CONTACTER</button>
                  </div>
                  <span className="text-7xl md:text-9xl font-bold text-gray-100 transition-all duration-300 group-hover:text-gray-200">02</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div 
            className="mt-24 h-96 bg-gray-200 relative overflow-hidden"
            data-scroll="fade-up"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg text-gray-500">Carte Google Maps intégrée ici</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
