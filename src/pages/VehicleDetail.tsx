import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Fuel, Car, Users, Bolt, Gauge, GitFork, DoorOpen, CheckCircle2, Navigation } from 'lucide-react';
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
import { vehicleService, Vehicle } from '@/services/vehicleService';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Vehicle | null>(null);
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
    
    const fetchCarDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const fetchedCar = await vehicleService.getVehicleById(Number(id));
          if (fetchedCar) {
            setCar(fetchedCar);
          } else {
            setCar(null);
            toast({
              title: "Erreur",
              description: "Véhicule non trouvé",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error fetching car details:', error);
          setCar(null);
          toast({
            title: "Erreur",
            description: "Impossible de charger les détails du véhicule",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCarDetails();
  }, [id, toast]);

  useEffect(() => {
    if (car) {
      setCurrentImageIndex(0);
    }
  }, [car]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Réservation d'essai confirmée",
      description: `Nous vous contacterons bientôt pour confirmer votre essai de ${car?.name}.`,
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
      description: `Nous vous enverrons plus d'informations sur ${car?.name} dans les plus brefs délais.`,
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
      description: `Nous vous contacterons bientôt concernant les options de financement pour ${car?.name}.`,
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

  const openWhatsapp = () => {
    const whatsappLink = "https://wa.me/212600000000";
    window.open(whatsappLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Chargement des détails du véhicule...</p>
          </div>
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

  const mainImage = car.imageFileName ? vehicleService.getImageUrl(car.imageFileName) : '/fallback-car.png';
  const allImages = [mainImage, ...(car.gallery ? car.gallery.map(img => vehicleService.getImageUrl(img)) : [])];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    e.currentTarget.src = '/fallback-car.png';
  };
  
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                <BreadcrumbPage>{car?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="flex-grow">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Car Gallery */}
              <div className="relative bg-white p-2 rounded-lg shadow-lg animate-fade-in">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={allImages[currentImageIndex]} 
                    alt={car?.name || 'Car image'} 
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="eager" 
                  />
                </div>
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/40 hover:bg-black/60 text-white rounded-full pointer-events-auto transition-all duration-200 hover:scale-110"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/40 hover:bg-black/60 text-white rounded-full pointer-events-auto transition-all duration-200 hover:scale-110"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                </div>
                )}
                
                {/* Thumbnails */}
                {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${currentImageIndex === index ? 'ring-2 ring-primary ring-offset-2 ring-offset-white' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentImageIndex(index); }}
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
              </div>
              
              {/* Car Info */}
              <div className="space-y-8 animate-fade-in-delay-200">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">{car?.name}</h1>
                    <span className="text-4xl lg:text-5xl font-extrabold text-primary mt-2 sm:mt-0">{Number(car?.price).toLocaleString()} €</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-lg text-gray-700 font-medium">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{car?.modelYear}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5 text-primary" />
                      <span>{car?.brand || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-5 w-5 text-primary" />
                      <span>{car?.fuelType || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-3xl font-semibold mb-4 text-gray-800">Description</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{car?.description || 'Aucune description disponible pour ce véhicule.'}</p>
                </div>
                
                {car?.specs && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800">Caractéristiques techniques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-lg">
                    <div className="flex items-center space-x-4">
                      <Car className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                          <p className="font-medium text-gray-700">Moteur:</p>
                          <p className="text-muted-foreground">{car.specs.engine || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Bolt className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">Puissance:</p>
                          <p className="text-muted-foreground">{car.specs.power || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Gauge className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                          <p className="font-medium text-gray-700">Accélération (0-100 km/h):</p>
                          <p className="text-muted-foreground">{car.specs.acceleration || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Users className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                          <p className="font-medium text-gray-700">Sièges:</p>
                          <p className="text-muted-foreground">{car.specs.seats || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <GitFork className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                          <p className="font-medium text-gray-700">Transmission:</p>
                          <p className="text-muted-foreground">{car.specs.transmission || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Navigation className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                          <p className="font-medium text-gray-700">Transmission (Drive):</p>
                          <p className="text-muted-foreground">{car.specs.drive || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <DoorOpen className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">Portes:</p>
                          <p className="text-muted-foreground">{car.specs.doors || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {car?.features && car.features.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Équipements</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-lg text-muted-foreground">
                      {car.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                </div>
                )}

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 max-w-full">
                  <Button className="flex-grow sm:flex-none py-4 px-6 text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 shadow-lg font-semibold whitespace-nowrap bg-black hover:bg-black/80" onClick={() => setShowTestDriveDialog(true)}>
                    Réserver un essai
                  </Button>
                  <Button variant="outline" className="flex-grow sm:flex-none py-4 px-6 text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 border-primary text-primary hover:bg-primary hover:text-white shadow-lg font-semibold whitespace-nowrap" onClick={() => setShowInfoDialog(true)}>
                    Demander des informations
                    </Button>
                  <Button variant="outline" className="flex-grow sm:flex-none py-4 px-6 text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 border-primary text-primary hover:bg-primary hover:text-white shadow-lg font-semibold whitespace-nowrap" onClick={() => setShowFinanceDialog(true)}>
                    Demander un financement
                  </Button>
                  <Button variant="outline" className="flex-grow sm:flex-none py-4 px-6 text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 border-green-500 text-green-600 hover:bg-green-500 hover:text-white shadow-lg font-semibold whitespace-nowrap flex items-center justify-center" onClick={openWhatsapp}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Contactez nous
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">Découvrez d'autres véhicules qui pourraient vous intéresser</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* This section would dynamically load similar vehicles from the API */}
              <p className="text-center text-muted-foreground col-span-full">Aucun véhicule similaire pour le moment.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Test Drive Dialog */}
      <Dialog open={showTestDriveDialog} onOpenChange={setShowTestDriveDialog}>
        <DialogContent 
          className="sm:max-w-[425px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300"
          aria-labelledby="testDriveDialogTitle"
          aria-describedby="testDriveDialogDescription"
          aria-modal="true"
        >
          <DialogHeader>
            <DialogTitle id="testDriveDialogTitle">Réserver un essai</DialogTitle>
            <DialogDescription id="testDriveDialogDescription">
              Remplissez ce formulaire pour réserver un essai routier de la {car?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTestDriveSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Téléphone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="col-span-3" aria-required="false" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date préférée</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="col-span-3" rows={3} aria-required="false" />
            </div>
            <DialogFooter>
              <Button type="submit">Envoyer la demande</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Info Request Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent 
          className="sm:max-w-[425px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300"
          aria-labelledby="infoDialogTitle"
          aria-describedby="infoDialogDescription"
          aria-modal="true"
        >
          <DialogHeader>
            <DialogTitle id="infoDialogTitle">Demande d'informations</DialogTitle>
            <DialogDescription id="infoDialogDescription">
              Remplissez ce formulaire pour recevoir plus d'informations sur la {car?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInfoSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="infoName" className="text-right">Nom</Label>
              <Input id="infoName" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="infoEmail" className="text-right">Email</Label>
              <Input id="infoEmail" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="infoPhone" className="text-right">Téléphone</Label>
              <Input id="infoPhone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="col-span-3" aria-required="false" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="infoMessage" className="text-right">Message</Label>
              <Textarea id="infoMessage" name="message" value={formData.message} onChange={handleInputChange} className="col-span-3" rows={3} aria-required="false" />
            </div>
            <DialogFooter>
              <Button type="submit">Envoyer la demande</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Finance Request Dialog */}
      <Dialog open={showFinanceDialog} onOpenChange={setShowFinanceDialog}>
        <DialogContent 
          className="sm:max-w-[425px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300"
          aria-labelledby="financeDialogTitle"
          aria-describedby="financeDialogDescription"
          aria-modal="true"
        >
          <DialogHeader>
            <DialogTitle id="financeDialogTitle">Demande de financement</DialogTitle>
            <DialogDescription id="financeDialogDescription">
              Remplissez ce formulaire pour demander un financement pour la {car?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFinanceSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="financeName" className="text-right">Nom</Label>
              <Input id="financeName" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="financeEmail" className="text-right">Email</Label>
              <Input id="financeEmail" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" required aria-required="true" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="financePhone" className="text-right">Téléphone</Label>
              <Input id="financePhone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="col-span-3" aria-required="false" />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="financeMessage" className="text-right">Message</Label>
              <Textarea id="financeMessage" name="message" value={formData.message} onChange={handleInputChange} className="col-span-3" rows={3} aria-required="false" />
            </div>
            <DialogFooter>
              <Button type="submit">Envoyer la demande</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleDetail;
