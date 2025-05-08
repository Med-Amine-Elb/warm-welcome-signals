
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
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Car inventory data
const carsInventory = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "9 000",
    fuelType: "Essence",
    brand: "Mercedes-Benz",
    category: "Sport",
    description: "La Mercedes-Benz AMG GT incarne l'essence même du luxe sportif. Dotée d'un puissant moteur V8 biturbo, cette voiture offre des performances exceptionnelles et un design à couper le souffle qui ne manquera pas d'attirer tous les regards.",
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
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nJTIwZ3R8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVyY2VkZXMlMjBhbWclMjBpbnRlcmlvcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1621069269775-2c7b33a51eaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWVyY2VkZXMlMjBhbWclMjBlbmdpbmV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "12 500",
    fuelType: "Essence",
    brand: "Audi",
    category: "Sport",
    description: "L'Audi R8 Spyder représente le summum de la technologie et du design automobile. Son moteur V10 atmosphérique offre une sonorité incomparable et des sensations de conduite pures, tandis que son toit rétractable vous permet de profiter pleinement de chaque trajet.",
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
      "https://images.unsplash.com/photo-1580274455191-1c62238fa332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXVkaSUyMHI4fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF1ZGklMjByOCUyMGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF1ZGklMjByOCUyMGVuZ2luZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "5 200",
    fuelType: "Essence",
    brand: "BMW",
    category: "Sport",
    description: "La BMW M4 Competition allie performances extrêmes et utilisabilité quotidienne. Son design agressif, son châssis parfaitement équilibré et son six cylindres en ligne biturbo en font une référence dans sa catégorie pour les amateurs de conduite dynamique.",
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
      "https://images.unsplash.com/photo-1607853554281-8c369112eacf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJtdyUyMG00fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwbTQlMjBpbnRlcmlvcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1617814076668-3880958e6696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIwbTQlMjBlbmdpbmV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    price: "155 400",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "18 350",
    fuelType: "Essence",
    brand: "Porsche",
    category: "Sport",
    description: "La légendaire Porsche 911 Carrera continue d'évoluer tout en restant fidèle à son héritage. Cette icône du sport automobile combine une maniabilité exceptionnelle, des performances de haut niveau et un confort surprenant pour une utilisation quotidienne.",
    specs: {
      engine: "Flat-6 biturbo",
      power: "450 ch",
      acceleration: "3.7s (0-100 km/h)",
      maxSpeed: "306 km/h",
      transmission: "PDK 8 rapports",
      drive: "Propulsion arrière",
      seats: 2,
      doors: 2,
    },
    features: [
      "Système PCM avec navigation et Apple CarPlay",
      "Sièges Sport Plus en cuir",
      "Système audio Bose Surround Sound",
      "Suspension PASM (Porsche Active Suspension Management)",
      "Mode Sport et Sport Plus",
      "Jantes Carrera Classic 20/21 pouces",
      "Phares LED adaptatifs",
      "Pack Chrono Sport avec sélecteur de mode"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e66927e09f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9yc2NoZSUyMDkxMXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnNjaGUlMjA5MTElMjBpbnRlcmlvcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cG9yc2NoZSUyMDkxMSUyMGVuZ2luZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 5,
    name: "Range Rover Sport",
    price: "122 900",
    image: "https://images.unsplash.com/photo-1529440547539-b8507892316d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZ2Ugcm92ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "7 200",
    fuelType: "Diesel",
    brand: "Land Rover",
    category: "SUV",
    description: "Le Range Rover Sport mêle luxe raffiné et performances tout-terrain exceptionnelles. Son design élégant, ses technologies avancées et son habitacle somptueux en font l'un des SUV les plus désirables du marché premium.",
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
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZ2Ugcm92ZXIlMjBzcG9ydHxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZ2Ulcm92ZXIlMjBpbnRlcmlvcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550759340-a22a8f7e09f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmdlJTIwcm92ZXIlMjBlbmdpbmV8ZW58MHwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    ]
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    price: "245 700",
    image: "https://images.unsplash.com/photo-1522686978237-a3962b9e959e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "15 200",
    fuelType: "Essence",
    brand: "Bentley",
    category: "GT",
    description: "La Bentley Continental GT est l'incarnation parfaite du grand tourisme de luxe. Alliant artisanat traditionnel et technologies de pointe, elle offre des performances exceptionnelles dans un écrin de raffinement absolu.",
    specs: {
      engine: "W12 6.0L biturbo",
      power: "635 ch",
      acceleration: "3.6s (0-100 km/h)",
      maxSpeed: "333 km/h",
      transmission: "Double embrayage 8 rapports",
      drive: "Transmission intégrale",
      seats: 4,
      doors: 2,
    },
    features: [
      "Système d'infodivertissement avec écran rotatif",
      "Intérieur en cuir naturel avec boiseries précieuses",
      "Système audio Naim for Bentley",
      "Suspensions pneumatiques intelligentes",
      "Système de conduite dynamique Bentley",
      "Jantes forgées 22 pouces",
      "Éclairage d'ambiance avec 7 thèmes",
      "Cadrans analogiques plaqués or"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVudGxleSUyMGNvbnRpbmVudGFsfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600706432502-77a0e2e32790?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleSUyMGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1621911864149-fc36cad3839f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVudGxleSUyMGVuZ2luZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    ]
  },
];

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTestDriveDialog, setShowTestDriveDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showFinanceDialog, setShowFinanceDialog] = useState(false);
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
    
    // Find the car by ID
    if (id) {
      const carId = parseInt(id, 10);
      const foundCar = carsInventory.find(c => c.id === carId);
      
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

  const handleFinanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande de financement envoyée",
      description: `Nous vous contacterons bientôt concernant les options de financement pour ${car.name}.`,
    });
    setShowFinanceDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: '',
    });
  };

  // Fonction pour ouvrir WhatsApp
  const openWhatsapp = () => {
    // On utilisera un lien temporaire qui sera modifié par l'utilisateur plus tard
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

  const allImages = [car.image, ...car.gallery];
  
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
      
      {/* Breadcrumb Navigation - Now positioned directly under Navbar with lighter background */}
      <div className="bg-gray-100 py-3 border-b border-gray-200">
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
        {/* Car Details */}
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
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="mr-1 h-4 w-4" />
                        <span>{car.mileage} km</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="mr-1 h-4 w-4" />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-accent">{car.price} €</span>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <div>
                        <p className="font-medium">Vitesse max</p>
                        <p className="text-sm text-muted-foreground">{car.specs.maxSpeed}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 6v4"/><path d="M12 14h.01"/></svg>
                      <div>
                        <p className="font-medium">Transmission</p>
                        <p className="text-sm text-muted-foreground">{car.specs.transmission}</p>
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
            
            {/* Additional Information */}
            <div className="mt-16 space-y-10">
              {/* Features */}
              <div>
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
              <div>
                <h2 className="text-2xl font-bold mb-6">Véhicules similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {carsInventory
                    .filter(c => c.id !== car.id && c.category === car.category)
                    .slice(0, 3)
                    .map((relatedCar) => (
                      <div key={relatedCar.id} className="glass-card overflow-hidden rounded-lg hover-scale">
                        <Link to={`/vehicles/${relatedCar.id}`}>
                          <div className="aspect-w-16 aspect-h-9">
                            <img 
                              src={relatedCar.image} 
                              alt={relatedCar.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">{relatedCar.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-muted-foreground">{relatedCar.year}</span>
                              <span className="text-accent font-bold">{relatedCar.price} €</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="bg-accent/10 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-3">Vous avez des questions?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions concernant ce véhicule ou nos services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Nous appeler
                  </Button>
                  <Button className="bg-accent hover:bg-accent/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Nous contacter
                  </Button>
                </div>
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

      {/* Financing Dialog */}
      <Dialog open={showFinanceDialog} onOpenChange={setShowFinanceDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Demande de financement</DialogTitle>
            <DialogDescription>
              Complétez le formulaire ci-dessous pour recevoir des options de financement pour {car?.name} à {car?.price} €.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFinanceSubmit} className="space-y-4">
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
                <Label htmlFor="message">Informations supplémentaires</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  rows={3}
                  placeholder="Acompte, durée de financement souhaitée, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Demander un financement</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
