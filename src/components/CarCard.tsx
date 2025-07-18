import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Vehicle, vehicleService } from '@/services/vehicleService';

interface CarCardProps {
  car: Vehicle;
}

const CarCard = ({ car }: CarCardProps) => {
  // Function to open WhatsApp
  const openWhatsapp = () => {
    // Using a temporary link that will be modified by the user later
    const whatsappLink = "https://wa.me/212600000000";
    window.open(whatsappLink, '_blank');
  };

  return (
    <Card className="overflow-hidden hover-scale glass-card">
      {/* Car Image */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={vehicleService.getImageUrl(car.imageFileName)} 
          alt={car.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {car.modelYear}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{car.name}</h3>
          <p className="text-accent font-bold">{car.price.toLocaleString()} €</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{car.modelYear}</span>
          </div>
          <div className="flex items-center">
            <Navigation className="mr-1 h-4 w-4" />
            <span>{car.brand}</span>
          </div>
          <div>
            <span>{car.fuelTypes}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-5">
          <Link to={`/vehicles/${car.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="text-sm border-primary text-primary hover:bg-primary hover:text-white w-full"
            >
              Détails
            </Button>
          </Link>
          <Button 
            className="text-sm bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
            onClick={openWhatsapp}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Réserver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
