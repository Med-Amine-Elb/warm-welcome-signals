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

  // Filter state and helpers must be inside the component
  const [priceOrder, setPriceOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const uniqueCategories = Array.from(new Set(carsInventory.map(car => car.category)));
  const uniqueBrands = Array.from(new Set((carsInventory).map(car => car.brand).filter(Boolean)));

  const filteredCars = carsInventory
    .filter(car => (categoryFilter ? car.category === categoryFilter : true))
    .filter(car => (brandFilter ? car.brand === brandFilter : true))
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s/g, ''));
      const priceB = parseInt(b.price.replace(/\s/g, ''));
      return priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

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
        <section className="py-8 px-6 md:py-12 md:px-12 lg:px-24 mt-16 md:mt-24">
          <div className="max-w-screen-xl mx-auto">
            <h1 data-scroll="reveal" className="ujet-heading font-black text-4xl md:text-7xl mb-2 bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent animate-fade-in">
              Notre Collection
            </h1>
            <div className="ujet-divider"></div>
            <p className="ujet-subheading text-lg md:text-2xl font-light text-gray-600 mb-2 animate-fade-in delay-200">
              Découvrez l'élite de l'automobile de luxe
            </p>
            {/* Filter Bar */}
            <div className="w-full flex justify-center mt-6 mb-8">
              <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl px-6 py-4 max-w-2xl w-full border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Filter */}
                  <div className="flex flex-col items-center">
                    <label className="flex justify-center items-center gap-2 text-center w-full text-xs font-extrabold mb-2 tracking-widest uppercase bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
                      {/* Price icon */}
                      <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v8m0 0l-3-3m3 3l3-3' /></svg>
                      Prix
                    </label>
                    <select
                      className="appearance-none border-none rounded-full px-4 py-2 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-all"
                      value={priceOrder}
                      onChange={e => setPriceOrder(e.target.value)}
                    >
                      <option value="asc">Croissant</option>
                      <option value="desc">Décroissant</option>
                    </select>
                  </div>
                  {/* Category Filter */}
                  <div className="flex flex-col items-center">
                    <label className="flex items-center gap-1 justify-center text-center w-full text-xs font-extrabold mb-2 tracking-widest uppercase bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
                      {/* Category icon */}
                      <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' /></svg>
                      Catégorie
                    </label>
                    <select
                      className="appearance-none border-none rounded-full px-4 py-2 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-all"
                      value={categoryFilter}
                      onChange={e => setCategoryFilter(e.target.value)}
                    >
                      <option value="">Toutes</option>
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  {/* Brand Filter */}
                  <div className="flex flex-col items-center">
                    <label className="flex items-center gap-1 justify-center text-center w-full text-xs font-extrabold mb-2 tracking-widest uppercase bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
                      {/* Brand icon */}
                      <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' fill='none'/><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h8' /></svg>
                      Marque
                    </label>
                    <select
                      className="appearance-none border-none rounded-full px-4 py-2 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-all"
                      value={brandFilter}
                      onChange={e => setBrandFilter(e.target.value)}
                    >
                      <option value="">Toutes</option>
                      {uniqueBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Vehicle Display - Clean Split Layout */}
        <section className="w-full min-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Left Column: Vehicle List */}
            <div className="bg-white p-6 md:p-12 lg:p-24 h-full overflow-y-auto">
              {filteredCars.map((car, index) => (
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
