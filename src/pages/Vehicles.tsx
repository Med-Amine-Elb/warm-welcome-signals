
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

// Car inventory data
const carsInventory = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport"
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport"
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport"
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    price: "155 400",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport"
  }
];

const Vehicles = () => {
  const [activeCar, setActiveCar] = useState(carsInventory[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Minimalist Hero/Header */}
        <section className="py-8 px-6 md:py-12 md:px-12 lg:px-24">
          <div className="max-w-screen-xl mx-auto">
            <h1 data-scroll="reveal" className="ujet-heading font-light text-4xl md:text-6xl mb-4">
              Notre Collection
            </h1>
            <div className="ujet-divider"></div>
          </div>
        </section>
        
        {/* Main Vehicle Display - Clean Split Layout */}
        <section className="w-full min-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Left Column: Vehicle List */}
            <div className="bg-white p-6 md:p-12 lg:p-24 h-full overflow-y-auto">
              {carsInventory.map((car, index) => (
                <div 
                  key={car.id}
                  className={`border-b border-gray-100 py-8 cursor-pointer transition-all duration-500 ${car.id === activeCar.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                  onClick={() => setActiveCar(car)}
                  data-scroll="fade-right"
                  style={{ '--scroll-delay': index * 2 } as React.CSSProperties}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{car.category}</span>
                    <h2 className={`text-2xl md:text-3xl mb-2 transition-all ${car.id === activeCar.id ? 'font-medium' : 'font-light'}`}>
                      {car.name}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="font-light">{car.year}</span>
                      <Button
                        variant="ghost"
                        className={`p-0 h-auto ${car.id === activeCar.id ? 'opacity-100' : 'opacity-0'}`}
                        asChild
                      >
                        <Link to={`/vehicles/${car.id}`} className="text-underline">
                          Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column: Selected Vehicle Image */}
            <div className="h-full bg-gray-100 relative overflow-hidden">
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  backgroundImage: `url(${activeCar.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-12 bg-white/80 backdrop-blur-sm max-w-md">
                <p className="text-lg md:text-xl font-light mb-2">{activeCar.price} €</p>
                <Link 
                  to={`/vehicles/${activeCar.id}`}
                  className="text-underline text-sm flex items-center group"
                >
                  Voir les détails
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-6 md:py-24 md:px-12 lg:px-24 bg-black text-white">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div data-scroll="fade-right">
                <h2 className="ujet-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                  Découvrez notre collection exclusive
                </h2>
                <p className="text-white/70 mb-8 max-w-lg">
                  Nous proposons une sélection de voitures de luxe pour tous les goûts et tous les budgets.
                </p>
              </div>
              <div className="flex justify-start md:justify-end" data-scroll="fade-left">
                <Button
                  className="rounded-full bg-white text-black px-8 py-6 text-sm uppercase tracking-wider hover:bg-gray-200"
                  asChild
                >
                  <Link to="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
