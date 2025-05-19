
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure page is scrolled to top on mount and set loaded state immediately
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Immediate loading state rather than delayed to avoid flicker on navigation
    setIsLoaded(true);
    
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all animated elements
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé",
        description: "Merci pour votre message. Nous vous répondrons bientôt!",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className={`flex-grow transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero section with background */}
        <section className="relative bg-black text-white pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 text-[20rem] font-bold text-gray-800 opacity-10 leading-none select-none">
            CONTACT
          </div>
          <div className="container mx-auto px-6 md:px-16 relative z-10">
            <h1 
              data-scroll="fade-up" 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 animate-in"
            >
              Contactez-nous
            </h1>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact information column */}
              <div className="space-y-12">
                <div data-scroll="fade-up" className="space-y-6 animate-in">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nous contacter</h2>
                  <p className="text-gray-600 max-w-md">
                    Notre équipe dévouée est prête à vous aider pour toute demande concernant nos véhicules de luxe et nos services.
                  </p>
                </div>
                
                <div className="space-y-6" data-scroll="fade-up">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Visitez-nous</h3>
                      <p className="text-gray-600">32 Boulevard d'Anfa, Casablanca 20100, Maroc</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Appelez-nous</h3>
                      <p className="text-gray-600">+212 522 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-black mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Écrivez-nous</h3>
                      <p className="text-gray-600">contact@driveluxe.ma</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4" data-scroll="fade-up">
                  <h3 className="text-xl font-bold">Horaires d'ouverture</h3>
                  <div>
                    <p className="flex justify-between border-b border-gray-200 py-2">
                      <span>Lundi - Vendredi</span>
                      <span>9:00 - 19:00</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-200 py-2">
                      <span>Samedi</span>
                      <span>10:00 - 17:00</span>
                    </p>
                    <p className="flex justify-between py-2">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact form column */}
              <div 
                className="bg-gray-50 p-8 border border-gray-200" 
                data-scroll="fade-up"
              >
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium uppercase tracking-wider">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-colors duration-200"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium uppercase tracking-wider">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-colors duration-200"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium uppercase tracking-wider">
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-colors duration-200"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-colors duration-200 resize-none"
                      placeholder="Comment pouvons-nous vous aider?"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-gray-800 text-white py-4 px-6 text-sm uppercase tracking-wider"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Trouvez notre showroom</h2>
            <div className="h-[400px] bg-gray-200 relative">
              {/* This would be replaced with an actual map component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Carte Google Maps serait affichée ici</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Contact;
