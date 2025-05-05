
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { Card } from '@/components/ui/card';

const timeline = [
  {
    year: "2005",
    title: "Création de DriveLuxe",
    description: "Fondation de DriveLuxe à Paris avec une collection initiale de 15 véhicules de luxe."
  },
  {
    year: "2008",
    title: "Expansion du showroom",
    description: "Agrandissement de notre espace d'exposition pour accueillir plus de 50 véhicules."
  },
  {
    year: "2012",
    title: "Lancement du service technique",
    description: "Ouverture de notre atelier spécialisé pour l'entretien et la personnalisation de véhicules haut de gamme."
  },
  {
    year: "2015",
    title: "Certification Excellence",
    description: "Obtention de la certification 'Excellence Automobile' pour la qualité de nos services."
  },
  {
    year: "2018",
    title: "Développement national",
    description: "Ouverture de nouvelles concessions à Lyon et sur la Côte d'Azur."
  },
  {
    year: "2023",
    title: "Innovation digitale",
    description: "Lancement de notre plateforme en ligne pour une expérience client améliorée et personnalisée."
  }
];

const team = [
  {
    name: "Alexandre Dupont",
    role: "Directeur Général",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    description: "Passionné d'automobile depuis plus de 25 ans, Alexandre a fondé DriveLuxe avec la vision de créer une expérience client inégalée dans le secteur automobile de luxe."
  },
  {
    name: "Sophie Martin",
    role: "Directrice Commerciale",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    description: "Avec son expertise en marketing de luxe, Sophie dirige notre équipe commerciale et développe des stratégies innovantes pour enrichir l'expérience client."
  },
  {
    name: "Thomas Leroy",
    role: "Chef Mécanicien",
    image: "https://images.unsplash.com/photo-1618675067902-2aa56b32a3e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lY2hhbmljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Fort de ses 20 ans d'expérience chez les plus grands constructeurs, Thomas supervise notre atelier technique et garantit l'excellence de nos services d'entretien."
  },
  {
    name: "Marie Dubois",
    role: "Responsable Relation Client",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGJ1c2luZXNzJTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    description: "Marie veille à ce que chaque client bénéficie d'un suivi personnalisé et d'une attention aux détails qui font la différence."
  }
];

const values = [
  {
    title: "Excellence",
    description: "Nous visons l'excellence dans tous les aspects de notre activité, de la sélection des véhicules au service après-vente."
  },
  {
    title: "Passion",
    description: "Notre équipe partage une passion authentique pour l'automobile qui se reflète dans chaque interaction avec nos clients."
  },
  {
    title: "Intégrité",
    description: "Nous privilégions l'honnêteté et la transparence dans toutes nos relations commerciales."
  },
  {
    title: "Innovation",
    description: "Nous recherchons constamment de nouvelles façons d'améliorer l'expérience de nos clients et de rester à la pointe du secteur."
  }
];

const About = () => {
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-background/70"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">À Propos de Nous</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Découvrez l'histoire et les valeurs qui font de DriveLuxe votre concession automobile de confiance.
            </p>
          </div>
        </section>
        
        {/* About Section */}
        <AboutSection isHomePage={false} />
        
        {/* Values Section */}
        <section className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des principes fondamentaux qui guident chaque aspect de notre entreprise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="glass-card p-6 hover-scale text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Notre Histoire</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Le parcours de DriveLuxe, de ses débuts modestes à sa position actuelle de leader.
              </p>
            </div>
            
            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -ml-px hidden md:block"></div>
              
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-accent -ml-2 hidden md:block"></div>
                  
                  {/* Year */}
                  <div className={`md:w-1/2 mb-4 md:mb-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <span className="text-3xl font-bold text-gradient">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 glass-card p-6 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  }`}>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des passionnés d'automobile dévoués à vous offrir un service d'exception.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="animate-fade-in opacity-0" style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}>
                  <Card className="glass-card overflow-hidden hover-scale">
                    <div className="aspect-w-1 aspect-h-1">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Ce Que Nos Clients Disent</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez les expériences de ceux qui nous ont fait confiance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 relative">
                <div className="text-4xl text-primary opacity-30 absolute top-4 left-4">"</div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  J'ai acheté ma première Mercedes chez DriveLuxe et l'expérience a été exceptionnelle du début à la fin. L'équipe a pris le temps de comprendre mes besoins et m'a guidé vers le véhicule parfait pour moi.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Pierre Lemaire</h4>
                    <p className="text-sm text-muted-foreground">Client depuis 2018</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 relative">
                <div className="text-4xl text-primary opacity-30 absolute top-4 left-4">"</div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  Le service après-vente de DriveLuxe est incomparable. J'ai eu un problème mineur avec ma Porsche et ils l'ont résolu immédiatement, en m'offrant même une voiture de courtoisie haut de gamme pendant la réparation.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Isabelle Moreau</h4>
                    <p className="text-sm text-muted-foreground">Cliente depuis 2020</p>
                  </div>
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

export default About;
