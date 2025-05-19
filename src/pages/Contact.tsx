import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeForm, setActiveForm] = useState<"call" | "message" | null>(null);

  useEffect(() => {
    // Set mounted state immediately
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const startOverlay = (formType: "call" | "message") => {
    setActiveForm(formType);
    setIsExpanded(true);
    setAnimationPhase(1);

    setTimeout(() => setAnimationPhase(2), 600);
    setTimeout(() => setAnimationPhase(3), 1200);
    setTimeout(() => setAnimationPhase(4), 1800);
  };

  const handleScheduleCall = () => {
    startOverlay("call");
  };

  const handleSendMessage = () => {
    startOverlay("message");
  };

  const handleClose = () => {
    setAnimationPhase(3);
    setTimeout(() => setAnimationPhase(2), 300);
    setTimeout(() => setAnimationPhase(1), 600);
    setTimeout(() => {
      setAnimationPhase(0);
      setIsExpanded(false);
      setActiveForm(null);
    }, 900);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" />
      
      {/* Animation overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            {animationPhase >= 4 && (
              <motion.button
                onClick={handleClose}
                className="absolute top-8 right-8 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <X className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
              </motion.button>
            )}

            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Horizontal line animation */}
            <motion.div
              className="absolute bg-gray-300 h-[1px]"
              initial={{
                width: "0%",
                left: "75%",
                top: "60%",
              }}
              animate={{
                width: animationPhase >= 1 ? "100%" : "0%",
                left: "0%",
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />

            {/* Vertical line animation */}
            <motion.div
              className="absolute bg-gray-300 w-[1px]"
              initial={{
                height: "0%",
                top: "100%",
                left: "0%",
              }}
              animate={{
                height: animationPhase >= 2 ? "100%" : "0%",
                top: "0%",
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />

            {/* Form content */}
            <motion.div
              className="relative z-10 bg-white max-w-4xl w-full mx-8 p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 4 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeForm === "call" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Programmez un appel</h2>
                  <p className="text-gray-600 mb-6">
                    Réservez un créneau pour discuter avec notre équipe d'experts automobiles.
                  </p>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Demande d'appel envoyée", {
                      description: "Notre équipe vous contactera prochainement."
                    });
                    handleClose();
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date préférée
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Heure préférée
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">Sélectionnez une heure</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="callReason" className="block text-sm font-medium text-gray-700 mb-1">
                        Raison de l'appel
                      </label>
                      <textarea
                        id="callReason"
                        name="callReason"
                        rows={3}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Décrivez brièvement la raison de votre appel..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Confirmer
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeForm === "message" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Envoyez un message</h2>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Message envoyé", {
                      description: "Nous vous répondrons dans les plus brefs délais."
                    });
                    handleClose();
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full bg-gray-50 border-b border-black focus:outline-none focus:border-black px-0 py-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full bg-gray-50 border-b border-black focus:outline-none focus:border-black px-0 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        required
                        className="w-full bg-gray-50 border-b border-black focus:outline-none focus:border-black px-0 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telephone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        required
                        className="w-full bg-gray-50 border-b border-black focus:outline-none focus:border-black px-0 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full bg-gray-50 border-b border-black focus:outline-none focus:border-black px-0 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full bg-gray-50 border border-black focus:outline-none focus:border-black px-2 py-2"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="font-bold uppercase bg-transparent text-black px-0 py-2 tracking-wide hover:underline focus:outline-none"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Hero Section */}
      <motion.section
        className="relative w-full h-[60vh] flex items-center"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
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
      </motion.section>

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
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >DriveLuxe</motion.h2>
                <motion.p
                  className="text-lg text-gray-600 max-w-md"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                >
                  Nous sommes spécialisés dans la location de voitures de luxe et services automobiles exclusifs pour des expériences inoubliables.
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start space-x-4" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div className="p-3 bg-gray-100 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Adresse</h3>
                  <div className="text-gray-600">
                    <p>32 Boulevard d'Anfa Casablanca</p>
                    <p>20100, Maroc</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start space-x-4" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div className="p-3 bg-gray-100 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-gray-600">contact@driveluxe.ma</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start space-x-4" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div className="p-3 bg-gray-100 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                  <p className="text-gray-600">+212 522 123 456</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <h3 className="text-xl font-bold mb-4">Horaires</h3>
                <div className="space-y-1 text-gray-600">
                  <p>Lundi - Vendredi: 9h - 19h</p>
                  <p>Samedi: 10h - 18h</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
                <div className="flex space-x-4 text-gray-600">
                  <motion.a
                    href="#"
                    className="hover:text-black transition-colors"
                    whileHover={{ scale: 1.2, opacity: 0.7 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Instagram className="h-6 w-6" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="hover:text-black transition-colors"
                    whileHover={{ scale: 1.2, opacity: 0.7 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Facebook className="h-6 w-6" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="hover:text-black transition-colors"
                    whileHover={{ scale: 1.2, opacity: 0.7 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Linkedin className="h-6 w-6" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Column - Contact Cards */}
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              {/* Card 1 - Schedule a Call */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <Card 
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="relative p-10 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <motion.h3
                            className="text-2xl font-bold mb-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                          >
                            PROGRAMMEZ UN APPEL
                          </motion.h3>
                          <motion.p
                            className="text-gray-600 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                          >
                            Définissez un rendez-vous téléphonique avec notre équipe
                          </motion.p>
                          <motion.button
                            onClick={handleScheduleCall}
                            className="text-black font-medium text-underline group flex items-center"
                            whileHover={{ opacity: 0.6 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span>PROGRAMMER</span>
                            <span className="ml-2 flex items-center relative">
                              <svg width="12" height="12" viewBox="0 0 12 12" className="inline dot-svg">
                                <circle
                                  cx="6"
                                  cy="6"
                                  r="4.5"
                                  className="dot-fill"
                                  style={{ fill: 'currentColor', transformOrigin: 'center' }}
                                />
                                <circle
                                  cx="6"
                                  cy="6"
                                  r="4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                  className="dot-circle"
                                />
                              </svg>
                            </span>
                          </motion.button>
                        </div>
                        <span className="text-7xl md:text-9xl font-bold text-gray-100 transition-all duration-300 group-hover:text-gray-200">01</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
                
              {/* Card 2 - Send a Message */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <Card 
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="relative p-10 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <motion.h3
                            className="text-2xl font-bold mb-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                          >
                            ENVOYEZ UN MESSAGE
                          </motion.h3>
                          <motion.p
                            className="text-gray-600 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                          >
                            Posez-nous vos questions ou faites une demande spéciale
                          </motion.p>
                          <motion.button
                            onClick={handleSendMessage}
                            className="text-black font-medium text-underline group flex items-center"
                            whileHover={{ opacity: 0.6 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span>CONTACTER</span>
                            <span className="ml-2 flex items-center relative">
                              <svg width="12" height="12" viewBox="0 0 12 12" className="inline dot-svg">
                                <circle
                                  cx="6"
                                  cy="6"
                                  r="4.5"
                                  className="dot-fill"
                                  style={{ fill: 'currentColor', transformOrigin: 'center' }}
                                />
                                <circle
                                  cx="6"
                                  cy="6"
                                  r="4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  fill="none"
                                  className="dot-circle"
                                />
                              </svg>
                            </span>
                          </motion.button>
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

      <Footer />
    </div>
  );
};

export default Contact;