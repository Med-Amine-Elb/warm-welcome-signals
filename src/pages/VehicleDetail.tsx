import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Fuel, 
  Car, 
  Users, 
  Bolt, 
  Gauge, 
  GitFork, 
  DoorOpen, 
  CheckCircle2, 
  Navigation, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Zap,
  Settings,
  Shield,
  Star,
  Clock,
  TrendingUp,
  Award,
  X,
  ChevronRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Vehicle, vehicleService } from '@/services/vehicleService';
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "@/components/CarCard";
import ScrollAnimation from '@/components/ScrollAnimation';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Vehicle | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTestDriveDialog, setShowTestDriveDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [activeForm, setActiveForm] = useState<"testDrive" | "info" | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const { toast } = useToast();
  const [suggestedVehicles, setSuggestedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCarDetailsAndSuggestions = async () => {
      if (id) {
        try {
          setLoading(true);
          const fetchedCar = await vehicleService.getVehicleById(Number(id));
          if (fetchedCar) {
            setCar(fetchedCar);
            // Fetch all vehicles for suggestions
            const allVehicles = await vehicleService.getAllVehiclesWithoutPagination();
            const filteredSuggestions = allVehicles.filter(v => 
              v.id !== fetchedCar.id && 
              (v.brand === fetchedCar.brand || v.category === fetchedCar.category)
            ).slice(0, 4); // Limit to 4 suggested cars
            setSuggestedVehicles(filteredSuggestions);

          } else {
            setCar(null);
            toast({
              title: "Erreur",
              description: "Véhicule non trouvé",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error fetching car details or suggestions:', error);
          setCar(null);
          toast({
            title: "Erreur",
            description: "Impossible de charger les détails du véhicule ou les suggestions.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCarDetailsAndSuggestions();
  }, [id, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startOverlay = (formType: "testDrive" | "info") => {
    setActiveForm(formType);
    setIsExpanded(true);
    setAnimationPhase(1);

    setTimeout(() => setAnimationPhase(2), 600);
    setTimeout(() => setAnimationPhase(3), 1200);
    setTimeout(() => setAnimationPhase(4), 1800);
  };

  const handleClose = () => {
    setAnimationPhase(3);
    setTimeout(() => setAnimationPhase(2), 300);
    setTimeout(() => setAnimationPhase(1), 600);
    setTimeout(() => {
      setAnimationPhase(0);
      setIsExpanded(false);
      setActiveForm(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: '',
      });
    }, 900);
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande de test drive envoyée",
      description: `Nous vous contacterons bientôt pour organiser votre test drive de la ${car?.name}.`,
    });
    handleClose();
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande d'informations envoyée",
      description: `Nous vous enverrons bientôt plus d'informations sur la ${car?.name}.`,
    });
    handleClose();
  };

  const openWhatsapp = () => {
    const whatsappLink = "https://wa.me/212600000000";
    window.open(whatsappLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Véhicule non trouvé</h1>
            <p className="text-gray-600 mb-8">Le véhicule que vous recherchez n'existe pas ou a été retiré.</p>
            <Link to="/vehicles">
              <Button className="btn-ujet">Retour à la liste des véhicules</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = car.imageFileName ? vehicleService.getImageUrl(car.imageFileName) : '/fallback-car.png';
  const allImages = [mainImage, ...(car.gallery ? car.gallery.map(img => vehicleService.getImageUrl(img)) : [])];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    e.currentTarget.src = '/fallback-car.png';
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-[120px]"></div>
      
      {/* Hero Section with Breadcrumb */}
      <section className="py-6 md:py-8 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="hover:text-black transition-colors text-sm">Accueil</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <Link to="/vehicles" className="hover:text-black transition-colors text-sm">Véhicules</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{car.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <ScrollAnimation>
        <main className="flex-grow">
          {/* Main Content */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column - Gallery */}
                <div className="xl:col-span-2 space-y-6">
                  {/* Main Image */}
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover-scale glass-card">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={allImages[currentImageIndex]} 
                        alt={car?.name || 'Car image'} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={handleImageError}
                        loading="eager" 
                      />
                      {allImages.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Image précédente"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Image suivante"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {currentImageIndex + 1} / {allImages.length}
                      </div>
                      {car.featured && (
                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Vedette
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-5 gap-3">
                      {allImages.map((img, index) => (
                        <div 
                          key={index}
                          className={`aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover-scale ${
                            index === currentImageIndex ? 'ring-2 ring-black shadow-lg' : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img 
                            src={img} 
                            alt={`${car?.name || 'Car'} - vue ${index + 1}`} 
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vehicle Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Specifications */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-black" />
                        Spécifications Clés
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Moteur</span>
                          <span className="font-semibold">{car.specs?.engine || car.engine || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Puissance</span>
                          <span className="font-semibold">{car.specs?.power || car.horsepower ? `${car.horsepower} ch` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Transmission</span>
                          <span className="font-semibold">{car.specs?.transmission || (car.automatic ? 'Automatique' : 'Manuelle')}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Places</span>
                          <span className="font-semibold">{car.specs?.seats || car.seats || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-black" />
                        Performance
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Accélération</span>
                          <span className="font-semibold">{car.specs?.acceleration || car.performance || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Vitesse max</span>
                          <span className="font-semibold">{car.specs?.maxSpeed || car.totalSpeed || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Couple</span>
                          <span className="font-semibold">{car.torque ? `${car.torque} Nm` : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{car?.description}</p>
                  </div>

                  {/* Features */}
                  {car.features && car.features.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-black" />
                        Équipements & Options
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-black flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Vehicle Info & Actions */}
                <div className="space-y-6">
                  {/* Vehicle Header */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {car?.name}
                        </h1>
                        <p className="text-lg text-gray-600">{car?.brand}</p>
                      </div>
                      
                      <div className="text-3xl md:text-4xl font-bold text-black">
                        {Number(car?.price).toLocaleString()} €
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {car?.category}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {car?.fuelTypes}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {car?.modelYear}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-black" />
                      Informations Rapides
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Année</span>
                        </div>
                        <span className="font-semibold">{car?.modelYear}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Kilométrage</span>
                        </div>
                        <span className="font-semibold">{car?.mileage?.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Places</span>
                        </div>
                        <span className="font-semibold">{car.specs?.seats || car.seats || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DoorOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Portes</span>
                        </div>
                        <span className="font-semibold">{car.specs?.doors || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                    <h3 className="text-lg font-bold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full btn-ujet flex items-center justify-center"
                        onClick={() => startOverlay("testDrive")}
                      >
                        <Car className="w-5 h-5 mr-2" />
                        Demander un essai
                      </Button>
                      <Button 
                        className="bg-black text-white border border-white px-8 py-3 text-lg font-semibold transition-all duration-200 w-full"
                        onClick={() => startOverlay("info")}
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Demander des informations
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 text-lg font-semibold" 
                        onClick={openWhatsapp}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </Button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg glass-card hover-scale">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-black" />
                      Contact
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">+33 1 23 45 67 89</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">contact@bmwstore.fr</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Paris, France</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Suggested Vehicles Section */}
          {suggestedVehicles.length > 0 && (
            <section className="py-24 px-6 md:px-16 bg-white">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                  <div className="mb-8 md:mb-0">
                    <h2 data-scroll="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Véhicules similaires</h2>
                    <div data-scroll="reveal" className="w-16 h-1 bg-black mb-6"></div>
                    <p data-scroll="fade-up" className="max-w-md text-gray-600">
                      Découvrez d'autres véhicules qui pourraient vous intéresser, similaires à celui que vous consultez.
                    </p>
                  </div>
                  <Link 
                    to="/vehicles" 
                    className="btn-ujet mt-4"
                  >
                    Voir tous les véhicules
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-animation">
                  {suggestedVehicles.map((suggestedCar, index) => (
                    <div 
                      key={suggestedCar.id}
                      className="opacity-0"
                      data-scroll="fade-up"
                      style={{ '--scroll-delay': index * 2 } as React.CSSProperties}
                    >
                      <CarCard car={suggestedCar} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Call to Action Section */}
          <section className="py-16 bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Intéressé par ce véhicule ?</h2>
                <p className="text-xl opacity-90 mb-8">
                  Contactez-nous dès maintenant pour organiser un essai ou obtenir plus d'informations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-white text-black border border-black px-8 py-3 text-lg font-semibold transition-all duration-200 w-full flex items-center justify-center hover:bg-black hover:text-white hover:border-white"
                    onClick={() => startOverlay("testDrive")}
                  >
                    <Car className="w-5 h-5 mr-2" />
                    Demander un essai
                  </Button>
                  <Button 
                    className="bg-black text-white border border-white px-8 py-3 text-lg font-semibold transition-all duration-200 w-full"
                    onClick={() => startOverlay("info")}
                  >
                    Plus d'informations
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </ScrollAnimation>
      
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
              {activeForm === "testDrive" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Demande d'essai</h2>
                  <p className="text-gray-600 mb-6">
                    Remplissez ce formulaire pour demander un essai de la {car?.name}.
                  </p>
                  <form className="space-y-4" onSubmit={handleTestDriveSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="testDriveName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="testDriveName"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="testDrivePhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="testDrivePhone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="testDriveEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="testDriveEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="testDriveDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date souhaitée
                      </label>
                      <input
                        type="date"
                        id="testDriveDate"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="testDriveMessage" className="block text-sm font-medium text-gray-700 mb-1">
                        Message (optionnel)
                      </label>
                      <textarea
                        id="testDriveMessage"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Précisez vos préférences pour l'essai..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeForm === "info" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Demande d'informations</h2>
                  <p className="text-gray-600 mb-6">
                    Remplissez ce formulaire pour recevoir plus d'informations sur la {car?.name}.
                  </p>
                  <form className="space-y-4" onSubmit={handleInfoSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="infoName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="infoName"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="infoPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="infoPhone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="infoEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="infoEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="infoMessage" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="infoMessage"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Décrivez ce que vous souhaitez savoir sur ce véhicule..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
