<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);

=======

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
>>>>>>> f9ffe25448ddf01b226405c3e282039bf5534ec8
  useEffect(() => {
    // Set mounted state immediately
    setIsMounted(true);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
<<<<<<< HEAD
      {/* Contact Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        {/* Animated Text Content */}
        <motion.div
          className="container mx-auto px-6 md:px-16 relative text-white z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              Contact
            </motion.h1>
            <motion.div
              className="h-1 w-24 bg-white my-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
            <motion.p
              className="text-xl md:text-2xl max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre expérience automobile de luxe.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full bg-gray-100 py-4 relative z-30">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-black">Accueil</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black font-medium">Contact</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.main 
        className="flex-grow bg-white relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 md:px-16 py-20">
          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Information */}
            <motion.div 
              className="space-y-16"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">DriveLuxe</h2>
                <p className="text-lg text-gray-600 max-w-md">
                  Nous sommes spécialisés dans la location de voitures de luxe et services automobiles exclusifs pour des expériences inoubliables.
                </p>
              </div>

              <div className="space-y-10">
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
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
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-600">info@driveluxe.com</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4">Horaires</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Lundi - Vendredi: 9h - 19h</p>
                    <p>Samedi: 10h - 18h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right Column - Contact Cards */}
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              {/* Card 1 - Schedule a Call */}
              <motion.div variants={itemVariants}>
                <Card 
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
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
              </motion.div>
                
              {/* Card 2 - Send a Message */}
              <motion.div variants={itemVariants}>
                <Card 
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
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
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div 
            className="mt-24 h-96 bg-gray-100 relative overflow-hidden z-20"
            variants={itemVariants}
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
          </motion.div>
        </div>
      </motion.main>

=======
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
      
>>>>>>> f9ffe25448ddf01b226405c3e282039bf5534ec8
      <Footer />
      <Toaster />
    </div>
  );
};

export default Contact;