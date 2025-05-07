
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Navigation, Gauge, Fuel, Info } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import ScrollAnimation from '@/components/ScrollAnimation';

// Mock data for the vehicle
const vehicleData = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  year: 2023,
  price: '120,000',
  description: 'La Mercedes-Benz Classe S incarne le summum du luxe et de la technologie. Ce bijou automobile offre une expérience de conduite incomparable grâce à sa suspension active qui anticipe les irrégularités de la route et son silence de fonctionnement remarquable.',
  mileage: '5,000',
  fuelType: 'Hybride',
  transmission: 'Automatique',
  power: '435 ch',
  images: [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3'
  ],
  features: [
    'Sièges en cuir Nappa',
    'Système audio Burmester 4D',
    'Écrans OLED pour les passagers arrière',
    'Toit panoramique',
    'Conduite semi-autonome',
    'Massage des sièges avant et arrière',
    'Climatisation 4 zones',
    'Purification de l\'air HEPA'
  ]
};

const VehicleDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openBookingForm = () => {
    setIsBookingOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingOpen(false);
  };

  // In a real app, you would fetch the vehicle details based on the ID
  // Here we're using mock data for demonstration
  const vehicle = vehicleData;

  return (
    <ScrollAnimation>
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section with large image */}
          <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <img 
              src={vehicle.images[activeImage]} 
              alt={vehicle.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{vehicle.name}</h1>
              <p className="text-xl md:text-2xl opacity-90">{vehicle.year} | {vehicle.price} €</p>
            </div>
          </section>
          
          {/* Image Gallery */}
          <section className="px-6 md:px-16 py-8 bg-white">
            <div className="container mx-auto">
              <div className="grid grid-cols-4 gap-4">
                {vehicle.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer overflow-hidden rounded ${activeImage === index ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${vehicle.name} - Vue ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Vehicle Details */}
          <section className="px-6 md:px-16 py-12 bg-white">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column - Specifications */}
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6" data-scroll="fade-up">Présentation</h2>
                  <p className="text-lg text-gray-700 mb-10" data-scroll="fade-up">
                    {vehicle.description}
                  </p>
                  
                  <h2 className="text-3xl font-bold mb-6" data-scroll="fade-up">Spécifications</h2>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="flex items-center" data-scroll="fade-up">
                      <Calendar className="mr-4 h-6 w-6" />
                      <div>
                        <p className="text-sm text-gray-500">Année</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center" data-scroll="fade-up">
                      <Navigation className="mr-4 h-6 w-6" />
                      <div>
                        <p className="text-sm text-gray-500">Kilométrage</p>
                        <p className="font-medium">{vehicle.mileage} km</p>
                      </div>
                    </div>
                    <div className="flex items-center" data-scroll="fade-up">
                      <Fuel className="mr-4 h-6 w-6" />
                      <div>
                        <p className="text-sm text-gray-500">Carburant</p>
                        <p className="font-medium">{vehicle.fuelType}</p>
                      </div>
                    </div>
                    <div className="flex items-center" data-scroll="fade-up">
                      <Gauge className="mr-4 h-6 w-6" />
                      <div>
                        <p className="text-sm text-gray-500">Puissance</p>
                        <p className="font-medium">{vehicle.power}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6" data-scroll="fade-up">Équipements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {vehicle.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center" 
                        data-scroll="fade-up"
                        style={{ '--scroll-delay': index % 4 } as React.CSSProperties}
                      >
                        <Info className="mr-3 h-5 w-5 text-gray-400" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Column - Call to Action */}
                <div className="col-span-1" data-scroll="fade-left">
                  <div className="bg-gray-50 p-8 rounded-lg sticky top-32">
                    <h3 className="text-2xl font-bold mb-4">Intéressé par ce véhicule ?</h3>
                    <p className="mb-6 text-gray-600">
                      Réservez un essai dès aujourd'hui ou contactez-nous pour plus d'informations sur cette {vehicle.name}.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base"
                        onClick={openBookingForm}
                      >
                        Réserver un essai
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-black text-black hover:bg-black hover:text-white py-6 text-base"
                      >
                        Demander plus d'informations
                      </Button>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-center text-sm text-gray-500 mb-2">Ou contactez-nous directement</p>
                      <p className="text-center text-lg font-bold">+212 6 00 00 00 00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Related Vehicles - Add this in a real app */}
        </main>
        
        <Footer />
        
        {/* Booking Form Dialog */}
        <BookingForm 
          open={isBookingOpen} 
          onClose={closeBookingForm}
          vehicleName={vehicle.name}
        />
      </div>
    </ScrollAnimation>
  );
};

export default VehicleDetail;
