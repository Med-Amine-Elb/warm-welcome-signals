
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Navigation, Fuel, Car, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Vehicle, vehicleService } from '@/services/vehicleService';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock car data with extended properties for the detail view
const mockCarsInventory: (Vehicle & {
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    maxSpeed: string;
    transmission: string;
    drive: string;
    seats: number;
    doors: number;
  };
  features: string[];
  gallery: string[];
})[] = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    brand: "Mercedes-Benz",
    price: 145900,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2023,
    description: "La Mercedes-Benz AMG GT incarne l'essence même du luxe sportif. Dotée d'un puissant moteur V8 biturbo, cette voiture offre des performances exceptionnelles et un design à couper le souffle qui ne manquera pas d'attirer tous les regards.",
    imageFileName: "mercedes-amg-gt.jpg",
    status: true,
    specs: {
      engine: "V8 Biturbo",
      power: "585 ch",
      acceleration: "3.2s (0-100 km/h)",
      maxSpeed: "318 km/h",
      transmission: "Automatique 9 vitesses",
      drive: "Propulsion arrière",
      seats: 2,
      doors: 2,
    },
    features: [
      "Système de navigation MBUX",
      "Sièges sport en cuir Nappa",
      "Système audio premium Burmester",
      "Assistance au stationnement avec caméra 360°",
      "Mode de conduite AMG Dynamic Select",
      "Jantes AMG 20 pouces",
      "Système de freinage AMG haute performance",
      "Éclairage d'ambiance personnalisable"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1621069269775-2c7b33a51eaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    brand: "Audi",
    price: 189500,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2022,
    description: "L'Audi R8 Spyder représente le summum de la technologie et du design automobile. Son moteur V10 atmosphérique offre une sonorité incomparable et des sensations de conduite pures, tandis que son toit rétractable vous permet de profiter pleinement de chaque trajet.",
    imageFileName: "audi-r8-spyder.jpg",
    status: true,
    specs: {
      engine: "V10 5.2L FSI",
      power: "620 ch",
      acceleration: "3.1s (0-100 km/h)",
      maxSpeed: "329 km/h",
      transmission: "S tronic 7 rapports",
      drive: "Quattro (transmission intégrale)",
      seats: 2,
      doors: 2,
    },
    features: [
      "Virtual Cockpit Audi avec écran 12.3 pouces",
      "Système audio Bang & Olufsen",
      "Sièges baquets en cuir Nappa fin",
      "Freins en céramique",
      "Suspensions magnétiques adaptatives",
      "Capote électrique à ouverture rapide",
      "Sélecteur de mode de conduite Audi Drive Select",
      "Pack extérieur carbone"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    brand: "BMW",
    price: 98750,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2023,
    description: "La BMW M4 Competition allie performances extrêmes et utilisabilité quotidienne. Son design agressif, son châssis parfaitement équilibré et son six cylindres en ligne biturbo en font une référence dans sa catégorie pour les amateurs de conduite dynamique.",
    imageFileName: "bmw-m4-competition.jpg",
    status: true,
    specs: {
      engine: "6 cylindres en ligne biturbo",
      power: "510 ch",
      acceleration: "3.9s (0-100 km/h)",
      maxSpeed: "290 km/h",
      transmission: "M Steptronic 8 rapports",
      drive: "Propulsion arrière",
      seats: 4,
      doors: 2,
    },
    features: [
      "Système BMW Live Cockpit Professional",
      "Sièges baquets M en cuir Merino",
      "Système audio Harman Kardon",
      "Freins M Compound",
      "Suspension adaptative M",
      "Jantes M en alliage léger 19\"/20\"",
      "Différentiel actif M",
      "Pack Carbone M"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1617814076668-3880958e6696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 4,
    name: "Range Rover Sport",
    brand: "Land Rover",
    price: 122900,
    category: "SUV",
    fuelType: "Diesel",
    modelYear: 2023,
    description: "Le Range Rover Sport mêle luxe raffiné et performances tout-terrain exceptionnelles. Son design élégant, ses technologies avancées et son habitacle somptueux en font l'un des SUV les plus désirables du marché premium.",
    imageFileName: "range-rover-sport.jpg",
    status: true,
    specs: {
      engine: "V8 Diesel",
      power: "350 ch",
      acceleration: "6.5s (0-100 km/h)",
      maxSpeed: "240 km/h",
      transmission: "Automatique 8 rapports",
      drive: "4x4 permanente",
      seats: 5,
      doors: 5,
    },
    features: [
      "Système d'infodivertissement Pivi Pro",
      "Intérieur cuir Windsor perforé",
      "Système audio Meridian Signature Sound",
      "Suspension pneumatique électronique",
      "Terrain Response 2",
      "Jantes 22 pouces en alliage",
      "Toit panoramique coulissant",
      "Écrans arrière intégrés aux appuie-têtes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1529440547539-b8507892316d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550759340-a22a8f7e09f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    ]
  }
];

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTestDriveDialog, setShowTestDriveDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const carId = parseInt(id, 10);
      const foundCar = mockCarsInventory.find(c => c.id === carId);
      
      if (foundCar) {
        setCar(foundCar);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Réservation d'essai confirmée",
      description: `Nous vous contacterons bientôt pour confirmer votre essai de ${car.name}.`,
    });
    setShowTestDriveDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: '',
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande d'informations envoyée",
      description: `Nous vous enverrons plus d'informations sur ${car.name} dans les plus brefs délais.`,
    });
    setShowInfoDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: '',
    });
  };

  const openWhatsapp = () => {
    const whatsappLink = "https://wa.me/212600000000";
    window.open(whatsappLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <section className="section-padding">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Véhicule non trouvé</h1>
              <p className="text-muted-foreground mb-8">
                Désolé, nous n'avons pas pu trouver le véhicule que vous recherchez.
              </p>
              <Link to="/vehicles">
                <Button>Retour aux véhicules</Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const mainImage = vehicleService.getImageUrl(car.imageFileName);
  const allImages = [mainImage, ...car.gallery];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-[100px] bg-gray-100 py-3 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Accueil</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/vehicles" className="text-muted-foreground hover:text-foreground transition-colors">Véhicules</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{car.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="flex-grow">
        <section className="section-padding py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Car Gallery */}
              <div className="relative glass-card p-2 rounded-lg">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img 
                    src={allImages[currentImageIndex]} 
                    alt={car.name} 
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto"
                    onClick={prevImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto"
                    onClick={nextImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden cursor-pointer ${
                        currentImageIndex === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${car.name} - vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Car Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{car.modelYear}</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="mr-1 h-4 w-4" />
                        <span>{car.brand}</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="mr-1 h-4 w-4" />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-accent">{car.price.toLocaleString()} €</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-medium mb-3">Description</h2>
                  <p className="text-muted-foreground">{car.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-medium mb-3">Caractéristiques techniques</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Car className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Moteur</p>
                        <p className="text-sm text-muted-foreground">{car.specs.engine}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><path d="m8 6 4-4 4 4"/><path d="M6 12a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M8 10v1"/><path d="M16 10v1"/></svg>
                      <div>
                        <p className="font-medium">Puissance</p>
                        <p className="text-sm text-muted-foreground">{car.specs.power}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><path d="M12 12v.001"/><path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z"/><path d="M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z"/><path d="M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2 0-2.3-.5-3-.9-1.1 1.9-2 3.5-2.5 4.4z"/><circle cx="12" cy="12" r="2"/></svg>
                      <div>
                        <p className="font-medium">0-100 km/h</p>
                        <p className="text-sm text-muted-foreground">{car.specs.acceleration}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Places</p>
                        <p className="text-sm text-muted-foreground">{car.specs.seats}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <Button 
                    className="w-full bg-black hover:bg-black/80 text-white"
                    onClick={() => setShowTestDriveDialog(true)}
                  >
                    Réserver un essai
                  </Button>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => setShowInfoDialog(true)}
                    >
                      Demander plus d'informations
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                      onClick={openWhatsapp}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Contactez nous
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Équipements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {car.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cars */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Véhicules similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockCarsInventory
                  .filter(c => c.id !== car.id && c.category === car.category)
                  .slice(0, 3)
                  .map((relatedCar) => (
                    <div key={relatedCar.id} className="glass-card overflow-hidden rounded-lg hover-scale">
                      <Link to={`/vehicles/${relatedCar.id}`}>
                        <div className="aspect-w-16 aspect-h-9">
                          <img 
                            src={vehicleService.getImageUrl(relatedCar.imageFileName)} 
                            alt={relatedCar.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{relatedCar.name}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-muted-foreground">{relatedCar.modelYear}</span>
                            <span className="text-accent font-bold">{relatedCar.price.toLocaleString()} €</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Test Drive Dialog */}
      <Dialog open={showTestDriveDialog} onOpenChange={setShowTestDriveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Réserver un essai</DialogTitle>
            <DialogDescription>
              Complétez le formulaire ci-dessous pour réserver un essai de {car?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTestDriveSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date préférée</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Confirmer la réservation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Info Request Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Demande d'informations</DialogTitle>
            <DialogDescription>
              Complétez le formulaire ci-dessous pour recevoir plus d'informations sur {car?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Questions spécifiques</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Envoyer la demande</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
