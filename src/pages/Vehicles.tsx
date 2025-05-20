import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

// Car inventory data
const carsInventory = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport",
    brand: "Mercedes-Benz"
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport",
    brand: "Audi"
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    category: "Sport",
    brand: "BMW"
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    price: "155 400",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    category: "Sport",
    brand: "Porsche"
  }
];

const Vehicles = () => {
  const [activeCar, setActiveCar] = useState(carsInventory[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Quick filter states
  const [priceOrder, setPriceOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<null | 'prix' | 'categorie' | 'marque'>(null);

  // Advanced filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2024]);
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc' | 'year-asc' | 'year-desc'>('price-asc');

  const resetFilters = () => {
    // Reset quick filters
    setPriceOrder('asc');
    setCategoryFilter('');
    setBrandFilter('');
    setActiveFilterTab(null);
    
    // Reset advanced filters
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 200000]);
    setYearRange([2020, 2024]);
    setSortOrder('price-asc');
  };

  const uniqueCategories = Array.from(new Set(carsInventory.map(car => car.category)));
  const uniqueBrands = Array.from(new Set(carsInventory.map(car => car.brand)));

  const filteredCars = carsInventory
    // Apply quick filters
    .filter(car => (categoryFilter ? car.category === categoryFilter : true))
    .filter(car => (brandFilter ? car.brand === brandFilter : true))
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s/g, ''));
      const priceB = parseInt(b.price.replace(/\s/g, ''));
      return priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
    })
    // Apply advanced filters
    .filter(car => {
      const price = parseInt(car.price.replace(/\s/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .filter(car => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.includes(car.category);
    })
    .filter(car => {
      if (selectedBrands.length === 0) return true;
      return selectedBrands.includes(car.brand);
    })
    .filter(car => car.year >= yearRange[0] && car.year <= yearRange[1])
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return parseInt(a.price.replace(/\s/g, '')) - parseInt(b.price.replace(/\s/g, ''));
        case 'price-desc':
          return parseInt(b.price.replace(/\s/g, '')) - parseInt(a.price.replace(/\s/g, ''));
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        default:
          return 0;
      }
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
            <ScrollFadeIn>
              <h1 className="ujet-heading font-black text-4xl md:text-7xl mb-2 bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent animate-fade-in">
                Notre Collection
              </h1>
            </ScrollFadeIn>
            <div className="ujet-divider"></div>
            <p className="ujet-subheading text-lg md:text-2xl font-light text-gray-600 mb-2 animate-fade-in delay-200">
              Découvrez l'élite de l'automobile de luxe
            </p>

            {/* Quick Filter Bar */}
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
                {/* Advanced Filter Button */}
                <Button
                  variant="ghost"
                  className="mr-4 flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden md:inline">Filtres avancés</span>
                </Button>
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

            {/* Advanced Filter Sidebar */}
            {isFilterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filtres avancés</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-4">Prix</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      min={0}
                      max={200000}
                      step={1000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{priceRange[0].toLocaleString()} €</span>
                      <span>{priceRange[1].toLocaleString()} €</span>
                    </div>
                  </div>

                  {/* Year Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-4">Année</h3>
                    <Slider
                      value={yearRange}
                      onValueChange={(value) => setYearRange(value as [number, number])}
                      min={2020}
                      max={2024}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-4">Catégories</h3>
                    <div className="space-y-2">
                      {uniqueCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-4">Marques</h3>
                    <div className="space-y-2">
                      {uniqueBrands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                              }
                            }}
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sort Order */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-4">Trier par</h3>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="year-asc">Année croissante</option>
                      <option value="year-desc">Année décroissante</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={resetFilters}
                    >
                      Réinitialiser
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Appliquer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Vehicle Display - Clean Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-8">
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
              <div className="relative h-[calc(100vh-200px)]">
                <img
                  src={activeCar.image}
                  alt={activeCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-white text-2xl font-medium mb-2">{activeCar.name}</h3>
                  <p className="text-white/80">{activeCar.price} €</p>
                </div>
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
