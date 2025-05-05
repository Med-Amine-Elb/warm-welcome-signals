
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

// Car inventory data
const carsInventory = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    price: "145 900",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lcmNlZGVzJTIwYW1nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "9 000",
    fuelType: "Essence",
    brand: "Mercedes-Benz",
    category: "Sport"
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    price: "189 500",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXVkaSUyMHI4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "12 500",
    fuelType: "Essence",
    brand: "Audi",
    category: "Sport"
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    price: "98 750",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJtdyUyMG00fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "5 200",
    fuelType: "Essence",
    brand: "BMW",
    category: "Sport"
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    price: "155 400",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "18 350",
    fuelType: "Essence",
    brand: "Porsche",
    category: "Sport"
  },
  {
    id: 5,
    name: "Range Rover Sport",
    price: "122 900",
    image: "https://images.unsplash.com/photo-1529440547539-b8507892316d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZ2Ugcm92ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    year: 2023,
    mileage: "7 200",
    fuelType: "Diesel",
    brand: "Land Rover",
    category: "SUV"
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    price: "245 700",
    image: "https://images.unsplash.com/photo-1522686978237-a3962b9e959e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    year: 2022,
    mileage: "15 200",
    fuelType: "Essence",
    brand: "Bentley",
    category: "GT"
  },
];

const Vehicles = () => {
  const [cars, setCars] = useState(carsInventory);
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    category: "",
    minPrice: 0,
    maxPrice: 300000,
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Filter cars based on current filters
    const filteredCars = carsInventory.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           car.brand.toLowerCase().includes(filters.search.toLowerCase());
      const matchesBrand = !filters.brand || car.brand === filters.brand;
      const matchesCategory = !filters.category || car.category === filters.category;
      const price = parseInt(car.price.replace(/\s/g, ''));
      const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;
      
      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });
    
    setCars(filteredCars);
  }, [filters]);
  
  // Extract unique brands and categories for filters
  const brands = Array.from(new Set(carsInventory.map(car => car.brand)));
  const categories = Array.from(new Set(carsInventory.map(car => car.category)));
  
  const handleReset = () => {
    setFilters({
      search: "",
      brand: "",
      category: "",
      minPrice: 0,
      maxPrice: 300000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-background/70"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Voitures</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explorez notre collection exclusive de véhicules de luxe et trouvez la voiture de vos rêves.
            </p>
          </div>
        </section>
        
        {/* Filters and Cars */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-lg sticky top-24">
                  <h2 className="text-xl font-medium mb-6">Filtres</h2>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Recherche</p>
                    <Input
                      type="text"
                      placeholder="Rechercher..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="bg-muted"
                    />
                  </div>
                  
                  {/* Brand Filter */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Marque</p>
                    <Select
                      value={filters.brand}
                      onValueChange={(value) => setFilters({...filters, brand: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les marques" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les marques</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Catégorie</p>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters({...filters, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les catégories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les catégories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Prix</p>
                      <span className="text-xs text-muted-foreground">
                        {filters.minPrice.toLocaleString()} € - {filters.maxPrice.toLocaleString()} €
                      </span>
                    </div>
                    <Slider
                      defaultValue={[filters.minPrice, filters.maxPrice]}
                      min={0}
                      max={300000}
                      step={10000}
                      minStepsBetweenThumbs={1}
                      onValueChange={(value) => setFilters({
                        ...filters, 
                        minPrice: value[0], 
                        maxPrice: value[1]
                      })}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Reset Button */}
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={handleReset}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
              
              {/* Cars Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-muted-foreground">
                    {cars.length} véhicules trouvés
                  </p>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Plus récent</SelectItem>
                      <SelectItem value="oldest">Plus ancien</SelectItem>
                      <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                      <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {cars.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cars.map((car, index) => (
                      <div 
                        key={car.id} 
                        className="animate-fade-in opacity-0" 
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                      >
                        <CarCard car={car} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">Aucun véhicule trouvé</h3>
                    <p className="text-muted-foreground mb-6">
                      Essayez de modifier vos critères de recherche
                    </p>
                    <Button onClick={handleReset}>
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
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
