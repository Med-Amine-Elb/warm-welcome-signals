
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScheduleCall = () => {
    toast.success("Demande d'appel envoyée", {
      description: "Notre équipe vous contactera prochainement."
    });
  };

  const handleSendMessage = () => {
    toast.success("Message envoyé", {
      description: "Nous vous répondrons dans les plus brefs délais."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" />
      
      {/* Contact Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        </div>
        <div className="container mx-auto px-6 md:px-16 relative z-20 text-white">
          <div className="max-w-3xl">
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              data-scroll="reveal"
            >
              Contact
            </h1>
            <div className="h-1 w-24 bg-white my-8" data-scroll="fade-right"></div>
            <p 
              className="text-xl md:text-2xl max-w-lg"
              data-scroll="fade-up"
              style={{ '--scroll-delay': '2' } as React.CSSProperties}
            >
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre expérience automobile de luxe.
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
          
          {/* Contact Section */}
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
                  Nous sommes spécialisés dans la location de voitures de luxe et services automobiles exclusifs pour des expériences inoubliables.
                </p>
              </div>

              <div 
                className="space-y-10"
                data-scroll="fade-up"
                style={{ '--scroll-delay': '2' } as React.CSSProperties}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Adresse</h3>
                    <div className="text-gray-600">
                      <p>123 Avenue des Champs-Élysées</p>
                      <p>75008 Paris, France</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-600">info@driveluxe.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Horaires</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Lundi - Vendredi: 9h - 19h</p>
                    <p>Samedi: 10h - 18h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4 text-gray-600">
                    <a href="#" className="hover:text-black transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="hover:text-black transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="hover:text-black transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Cards */}
            <div className="space-y-8">
              {/* Card 1 - Schedule a Call */}
              <Card 
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                data-scroll="zoom-in"
                style={{ '--scroll-delay': '0' } as React.CSSProperties}
              >
                <CardContent className="p-0">
                  <div className="relative p-10 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">PROGRAMMEZ UN APPEL</h3>
                        <p className="text-gray-600 mb-8">Définissez un rendez-vous téléphonique avec notre équipe</p>
                        <button 
                          onClick={handleScheduleCall}
                          className="text-black font-medium text-underline"
                        >
                          PROGRAMMER
                        </button>
                      </div>
                      <span className="text-7xl md:text-9xl font-bold text-gray-100 transition-all duration-300 group-hover:text-gray-200">01</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
                
              {/* Card 2 - Send a Message */}
              <Card 
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                data-scroll="zoom-in"
                style={{ '--scroll-delay': '2' } as React.CSSProperties}
              >
                <CardContent className="p-0">
                  <div className="relative p-10 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">ENVOYEZ UN MESSAGE</h3>
                        <p className="text-gray-600 mb-8">Posez-nous vos questions ou faites une demande spéciale</p>
                        <button 
                          onClick={handleSendMessage}
                          className="text-black font-medium text-underline"
                        >
                          CONTACTER
                        </button>
                      </div>
                      <span className="text-7xl md:text-9xl font-bold text-gray-100 transition-all duration-300 group-hover:text-gray-200">02</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div 
            className="mt-24 h-96 bg-gray-100 relative overflow-hidden"
            data-scroll="fade-up"
          >
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1854696679644!2d2.296081995654633!3d48.869309912462755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4a8429041%3A0x1c31531ea4d7295!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sus!4v1682789612879!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
