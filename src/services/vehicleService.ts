
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/products';

export interface VehicleSpecs {
  engine: string;
  power: string;
  acceleration: string;
  maxSpeed: string;
  transmission: string;
  drive: string;
  seats: number;
  doors: number;
}

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  fuelType: string;
  modelYear: number;
  mileage: string; // Assuming mileage is a string like "9 000"
  description: string;
  imageFileName: string;
  status: boolean;
  specs: VehicleSpecs; // Add specs
  features: string[]; // Add features array
  gallery: string[]; // Add gallery array of image file names
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface YearRange {
  min: number;
  max: number;
}

// Mock data for development
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT",
    brand: "Mercedes-Benz",
    price: 145900,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2023,
    description: "La Mercedes-Benz AMG GT incarne l'essence même du luxe sportif.",
    imageFileName: "mercedes-amg-gt.jpg",
    status: true,
  },
  {
    id: 2,
    name: "Audi R8 Spyder",
    brand: "Audi",
    price: 189500,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2022,
    description: "L'Audi R8 Spyder représente le summum de la technologie et du design automobile.",
    imageFileName: "audi-r8-spyder.jpg",
    status: true,
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    brand: "BMW",
    price: 98750,
    category: "Sport",
    fuelType: "Essence",
    modelYear: 2023,
    description: "La BMW M4 Competition allie performances extrêmes et utilisabilité quotidienne.",
    imageFileName: "bmw-m4-competition.jpg",
    status: true,
  },
  {
    id: 4,
    name: "Range Rover Sport",
    brand: "Land Rover",
    price: 122900,
    category: "SUV",
    fuelType: "Diesel",
    modelYear: 2023,
    description: "Le Range Rover Sport mêle luxe raffiné et performances tout-terrain exceptionnelles.",
    imageFileName: "range-rover-sport.jpg",
    status: true,
  }
];

export const vehicleService = {
  getAllVehicles: async (page = 0, size = 10, sortBy = 'id', sortOrder = 'DESC') => {
    // For development, return mock data
    const start = page * size;
    const end = start + size;
    const content = mockVehicles.slice(start, end);
    
    const mockResponse: PaginatedResponse<Vehicle> = {
      content,
      pageable: {
        sort: { sorted: true, unsorted: false, empty: false },
        pageNumber: page,
        pageSize: size,
        offset: start,
        paged: true,
        unpaged: false,
      },
      totalPages: Math.ceil(mockVehicles.length / size),
      totalElements: mockVehicles.length,
      last: end >= mockVehicles.length,
      first: page === 0,
      sort: { sorted: true, unsorted: false, empty: false },
      number: page,
      numberOfElements: content.length,
      size: size,
      empty: content.length === 0,
    };
    
    return mockResponse;
  },

  getAllVehiclesWithoutPagination: async () => {
    return mockVehicles;
  },

  getVehicleById: async (id: number) => {
    const vehicle = mockVehicles.find(v => v.id === id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  },

  getVehiclesByFuelType: async (fuelType: string, page = 0, size = 10, sortBy = 'id', sortOrder = 'DESC') => {
    const filtered = mockVehicles.filter(v => v.fuelType === fuelType);
    const start = page * size;
    const end = start + size;
    const content = filtered.slice(start, end);
    
    const mockResponse: PaginatedResponse<Vehicle> = {
      content,
      pageable: {
        sort: { sorted: true, unsorted: false, empty: false },
        pageNumber: page,
        pageSize: size,
        offset: start,
        paged: true,
        unpaged: false,
      },
      totalPages: Math.ceil(filtered.length / size),
      totalElements: filtered.length,
      last: end >= filtered.length,
      first: page === 0,
      sort: { sorted: true, unsorted: false, empty: false },
      number: page,
      numberOfElements: content.length,
      size: size,
      empty: content.length === 0,
    };
    
    return mockResponse;
  },

  getAllBrands: async () => {
    const brands = [...new Set(mockVehicles.map(v => v.brand))];
    return brands;
  },

  getAllCategories: async () => {
    const categories = [...new Set(mockVehicles.map(v => v.category))];
    return categories;
  },

  getPriceRange: async () => {
    const prices = mockVehicles.map(v => v.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  },

  getYearRange: async () => {
    const years = mockVehicles.map(v => v.modelYear);
    return {
      min: Math.min(...years),
      max: Math.max(...years)
    };
  },

  getFuelTypes: async () => {
    const fuelTypes = [...new Set(mockVehicles.map(v => v.fuelType))];
    return fuelTypes;
  },

  createVehicle: async (vehicleData: FormData) => {
    const response = await axios.post<Vehicle>(API_BASE_URL, vehicleData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  createVehicleJson: async (vehicleData: Omit<Vehicle, 'id' | 'imageFileName'>) => {
    const response = await axios.post<Vehicle>(API_BASE_URL, vehicleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  updateVehicle: async (id: number, vehicleData: FormData) => {
    const response = await axios.put<Vehicle>(`${API_BASE_URL}/${id}`, vehicleData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateVehicleJson: async (id: number, vehicleData: Omit<Vehicle, 'id' | 'imageFileName'>) => {
    const response = await axios.put<Vehicle>(`${API_BASE_URL}/${id}`, vehicleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  deleteVehicle: async (id: number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  getImageUrl: (imageFilename: string) => {
    // For development, return placeholder images based on the filename
    const imageMap: Record<string, string> = {
      'mercedes-amg-gt.jpg': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'audi-r8-spyder.jpg': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'bmw-m4-competition.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'range-rover-sport.jpg': 'https://images.unsplash.com/photo-1529440547539-b8507892316d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    };
    
    return imageMap[imageFilename] || `http://localhost:8081/image/${imageFilename}`;
  }
}; 
