import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ScrollFadeIn from '@/components/ScrollFadeIn';

// Car inventory data
const carsInventory = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport",
    brand: "Mercedes-Benz" // Added brand property
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport",
    brand: "Audi" // Added brand property
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport",
    brand: "BMW" // Added brand property
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    price: "155 400",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport",
    brand: "Porsche" // Added brand property
  }
];

const Vehicles = () => {
  const [activeCar, setActiveCar] = useState(carsInventory[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state and helpers must be inside the component
  const [priceOrder, setPriceOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const resetFilters = () => {
    setPriceOrder('asc');
    setCategoryFilter('');
    setBrandFilter('');
  };

  const uniqueCategories = Array.from(new Set(carsInventory.map(car => car.category)));
  const uniqueBrands = Array.from(new Set(carsInventory.map(car => car.brand)));

  const filteredCars = carsInventory
    .filter(car => (categoryFilter ? car.category === categoryFilter : true))
    .filter(car => (brandFilter ? car.brand === brandFilter : true))
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s/g, ''));
      const priceB = parseInt(b.price.replace(/\s/g, ''));
      return priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  const [activeFilterTab, setActiveFilterTab] = useState<null | 'prix' | 'categorie' | 'marque'>(null);

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
            <ScrollFadeIn>
              <h1 className="ujet-heading font-black text-4xl md:text-7xl mb-2 bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent animate-fade-in">
                Notre Collection
              </h1>
            </ScrollFadeIn>
            <div className="ujet-divider"></div>
            <p className="ujet-subheading text-lg md:text-2xl font-light text-gray-600 mb-2 animate-fade-in delay-200">
              Découvrez l'élite de l'automobile de luxe
            </p>
            {/* Modern Filter Bar */}
            <div className="w-full flex flex-col items-center mt-6 mb-8">
              {/* Tabs Row */}
              <div className="w-full max-w-3xl flex items-center justify-between bg-gray-50 rounded-t-2xl" style={{ minHeight: '48px' }}>
                {/* All (reset) tab */}
                <button
                  className={`ml-4 px-0 py-4 text-base uppercase tracking-widest font-bold border-none bg-transparent transition text-left ${!activeFilterTab && priceOrder === 'asc' && categoryFilter === '' && brandFilter === '' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                  onClick={() => {
                    setActiveFilterTab(null);
                    resetFilters();
                  }}
                  style={{ letterSpacing: '0.08em' }}
                >
                  All
                </button>
                {/* Filter tabs */}
                <div className="flex-1 flex justify-center items-center space-x-8">
                  {[
                    { key: 'prix', label: 'PRIX' },
                    { key: 'categorie', label: 'CATÉGORIE' },
                    { key: 'marque', label: 'MARQUE' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      className={`px-0 py-4 text-base uppercase tracking-widest font-bold border-none bg-transparent transition ${activeFilterTab === tab.key ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                      onClick={() => setActiveFilterTab(tab.key as typeof activeFilterTab)}
                      style={{ letterSpacing: '0.08em' }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Close (X) button */}
                <button
                  className="mr-4 p-2 text-gray-500 hover:text-black bg-transparent border-none text-xl"
                  onClick={() => setActiveFilterTab(null)}
                  aria-label="Fermer le filtre"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Divider */}
              <div className="w-full max-w-3xl border-b border-gray-200" />
              {/* Filter Options Bar */}
              {activeFilterTab && (
                <div className="w-full max-w-3xl flex items-center justify-center bg-transparent px-6 py-4">
                  <div className="flex items-center space-x-6">
                    {activeFilterTab === 'prix' && (
                      <>
                        <button
                          className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${priceOrder === 'asc' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                          onClick={() => setPriceOrder('asc')}
                        >
                          Croissant
                        </button>
                        <button
                          className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${priceOrder === 'desc' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                          onClick={() => setPriceOrder('desc')}
                        >
                          Décroissant
                        </button>
                      </>
                    )}
                    {activeFilterTab === 'categorie' && (
                      <>
                        <button
                          className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${categoryFilter === '' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                          onClick={() => setCategoryFilter('')}
                        >
                          Toutes
                        </button>
                        {uniqueCategories.map(cat => (
                          <button
                            key={cat}
                            className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${categoryFilter === cat ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                            onClick={() => setCategoryFilter(cat)}
                          >
                            {cat}
                          </button>
                        ))}
                      </>
                    )}
                    {activeFilterTab === 'marque' && (
                      <>
                        <button
                          className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${brandFilter === '' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                          onClick={() => setBrandFilter('')}
                        >
                          Toutes
                        </button>
                        {uniqueBrands.map(brand => (
                          <button
                            key={brand}
                            className={`text-sm uppercase tracking-wide font-semibold bg-transparent border-0 border-b-2 transition-all duration-200 ${brandFilter === brand ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-black'}`}
                            onClick={() => setBrandFilter(brand)}
                          >
                            {brand}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
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
        <ScrollFadeIn y={60}>
          <section className="py-16 px-6 md:py-24 md:px-12 lg:px-24 bg-black text-white">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div>
                  <h2 className="ujet-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                    Découvrez notre collection exclusive
                  </h2>
                  <p className="text-white/70 mb-8 max-w-lg">
                    Nous proposons une sélection de voitures de luxe pour tous les goûts et tous les budgets.
                  </p>
                </div>
                <div className="flex justify-start md:justify-end">
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
        </ScrollFadeIn>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
