
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, Map } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log('Contact form submitted:', data);
    toast({
      title: "Message envoyé",
      description: "Nous vous contacterons bientôt. Merci pour votre message!",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 md:px-16 py-12 md:py-24 bg-black text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 data-scroll="fade-up" className="text-4xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
              <p data-scroll="fade-up" className="text-xl opacity-80 mb-0">
                Nous sommes à votre disposition pour répondre à toutes vos questions
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information & Form */}
        <section className="px-6 md:px-16 py-12 md:py-24 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Contact Information */}
              <div data-scroll="fade-right">
                <h2 className="text-3xl font-bold mb-8">Informations de contact</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-4 rounded-full mr-6">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                      <p className="text-gray-600">+212 6 00 00 00 00</p>
                      <p className="text-gray-600">+212 5 00 00 00 00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-4 rounded-full mr-6">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <p className="text-gray-600">contact@driveluxe.com</p>
                      <p className="text-gray-600">info@driveluxe.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-4 rounded-full mr-6">
                      <Map className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Adresse</h3>
                      <p className="text-gray-600">123 Boulevard Mohammed V</p>
                      <p className="text-gray-600">Casablanca, Maroc</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span>9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Contact Form */}
              <div data-scroll="fade-left">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6">Envoyez-nous un message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="+212 6 00 00 00 00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Comment pouvons-nous vous aider ?" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-black hover:bg-gray-800 text-white py-6"
                      >
                        Envoyer le message
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="h-[400px] w-full bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Carte Google Maps ici</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
