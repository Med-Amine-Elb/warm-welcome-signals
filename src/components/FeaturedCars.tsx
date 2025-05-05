
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

// Featured cars data
const featuredCars = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "9 000",
    fuelType: "Essence",
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "12 500",
    fuelType: "Essence",
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "5 200",
    fuelType: "Essence",
  }
];

const FeaturedCars = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const childElements = sectionRef.current?.querySelectorAll('.animate-item');
    childElements?.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      childElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="section-padding bg-background" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-item opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Véhicules Premium</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de voitures de luxe, choisies avec soin pour les passionnés d'automobile exigeants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car, index) => (
            <div 
              key={car.id} 
              className="animate-item opacity-0"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-item opacity-0">
          <Link to="/vehicles">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Voir tous nos véhicules
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
