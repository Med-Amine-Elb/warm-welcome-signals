
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Navigation } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  year: number;
  mileage: string;
  fuelType: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="overflow-hidden hover-scale glass-card">
      {/* Car Image */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-accent/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          {car.year}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{car.name}</h3>
          <p className="text-accent font-bold">{car.price} €</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center">
            <Navigation className="mr-1 h-4 w-4" />
            <span>{car.mileage} km</span>
          </div>
          <div>
            <span>{car.fuelType}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-5">
          <Button 
            variant="outline" 
            className="text-sm border-primary text-primary hover:bg-primary hover:text-white"
          >
            Détails
          </Button>
          <Button 
            className="text-sm bg-accent hover:bg-accent/80 text-white"
          >
            Réserver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
