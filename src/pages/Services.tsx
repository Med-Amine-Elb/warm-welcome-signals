
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Car, Settings, Calendar, Search, Navigation, Phone } from 'lucide-react';

// Services data
const mainServices = [
  {
    icon: <Car className="w-6 h-6" />,
    title: "Vente de Véhicules",
    description: "Une sélection exclusive des plus belles voitures de luxe et de sport du marché, rigoureusement inspectées et préparées pour vous offrir une expérience de conduite incomparable."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Service Technique",
    description: "Notre équipe de mécaniciens hautement qualifiés vous assure un entretien et des réparations de qualité pour maintenir votre véhicule dans un état optimal, en utilisant uniquement des pièces d'origine."
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Essai sur Rendez-vous",
    description: "Réservez un essai personnalisé dans un environnement adapté pour découvrir votre future voiture. Nos conseillers vous accompagnent pour une expérience sur mesure, sans pression commerciale."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Recherche Personnalisée",
    description: "Vous ne trouvez pas la voiture de vos rêves ? Notre service de recherche sur mesure vous permet de définir précisément vos critères, et nous nous chargeons de trouver le véhicule parfait."
  }
];

const additionalServices = [
  {
    title: "Financement sur Mesure",
    description: "Des solutions de financement adaptées à votre situation, avec des taux compétitifs et des options flexibles."
  },
  {
    title: "Assurance Tous Risques",
    description: "Des offres d'assurance complètes pour protéger votre investissement automobile."
  },
  {
    title: "Importation de Véhicules",
    description: "Un service d'importation de véhicules rares depuis l'étranger, en gérant toutes les formalités administratives."
  },
  {
    title: "Personnalisation",
    description: "Des options de personnalisation pour rendre votre voiture unique, depuis les jantes jusqu'à l'intérieur."
  },
  {
    title: "Conciergerie",
    description: "Un service premium pour gérer tous les aspects de votre expérience automobile, de la livraison à domicile à la prise en charge pour l'entretien."
  },
  {
    title: "Garantie Étendue",
    description: "Extension de garantie pour une tranquillité d'esprit totale, avec assistance routière 24/7."
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632752893012-6b22e8467e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwc2VydmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-background/70"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Services</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Des solutions premium pour répondre à tous vos besoins automobiles.
            </p>
          </div>
        </section>
        
        {/* Main Services */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Services Premium</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre gamme complète de services conçus pour vous offrir une expérience automobile d'exception.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <div 
                  key={index}
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <ServiceCard 
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Services Complémentaires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pour une expérience encore plus complète, nous vous proposons également ces services sur mesure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="glass-card p-6 hover-scale"
                >
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service Process */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Notre Processus de Service</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un service d'excellence en toute transparence, du premier contact à la livraison.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">1</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Consultation</h3>
                  <p className="text-muted-foreground">
                    Un conseiller dédié prend le temps de comprendre vos besoins et préférences pour vous orienter vers les meilleures options.
                  </p>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">2</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Essai Personnalisé</h3>
                  <p className="text-muted-foreground">
                    Testez les véhicules présélectionnés lors d'essais routiers adaptés à vos attentes, dans des conditions optimales.
                  </p>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">3</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Personnalisation</h3>
                  <p className="text-muted-foreground">
                    Configurez votre véhicule selon vos préférences, des finitions aux accessoires, pour une voiture qui vous ressemble.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">4</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Financement</h3>
                  <p className="text-muted-foreground">
                    Notre équipe financière vous accompagne pour trouver la solution de paiement la plus adaptée à votre situation.
                  </p>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">5</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Préparation</h3>
                  <p className="text-muted-foreground">
                    Votre véhicule est minutieusement préparé par nos techniciens pour vous assurer une prise en main dans des conditions parfaites.
                  </p>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="glass-card p-6 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">6</div>
                  <h3 className="text-xl font-medium mb-3 mt-4">Livraison</h3>
                  <p className="text-muted-foreground">
                    Profitez d'une livraison personnalisée avec une présentation détaillée de votre nouveau véhicule par un expert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-card py-16 px-4">
          <div className="container mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'assistance ou d'informations?</h2>
                  <p className="text-muted-foreground">
                    Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/80 text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Nous appeler</span>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>Visiter le showroom</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
