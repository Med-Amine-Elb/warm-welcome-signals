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
  fuelTypes: string;
  modelYear: number;
  mileage: number;
  description: string;
  imageFileName: string;
  status: boolean;
  horsepower?: number;
  automatic?: boolean;
  engine?: string;
  ccBatteryCapacity?: number;
  totalSpeed?: number;
  performance?: string;
  seats?: number;
  torque?: number;
  featured?: boolean;
  specs?: VehicleSpecs;
  features?: string[];
  gallery?: string[];
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

export const vehicleService = {
  getAllVehicles: async (page = 0, size = 10, sortBy = 'id', sortOrder = 'DESC') => {
    try {
      const response = await axios.get<PaginatedResponse<Vehicle>>(`${API_BASE_URL}`, {
        params: {
          page,
          size,
          sort: `${sortBy},${sortOrder}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  getAllVehiclesWithoutPagination: async () => {
    try {
      const response = await axios.get<PaginatedResponse<Vehicle>>(`${API_BASE_URL}/all`);
      return response.data.content;
    } catch (error) {
      console.error('Error fetching all vehicles:', error);
      throw error;
    }
  },

  getVehicleById: async (id: number) => {
    try {
      const response = await axios.get<Vehicle>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle by id:', error);
      throw error;
    }
  },

  getVehiclesByFuelType: async (fuelType: string, page = 0, size = 10, sortBy = 'id', sortOrder = 'DESC') => {
    try {
      const response = await axios.get<PaginatedResponse<Vehicle>>(`${API_BASE_URL}/fuel-type/${fuelType}`, {
        params: {
          page,
          size,
          sort: `${sortBy},${sortOrder}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles by fuel type:', error);
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/brands`);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getPriceRange: async () => {
    try {
      const response = await axios.get<PriceRange>(`${API_BASE_URL}/price-range`);
      return response.data;
    } catch (error) {
      console.error('Error fetching price range, calculating from data:', error);
      // Fallback: calculate from actual data
      const vehicles = await vehicleService.getAllVehiclesWithoutPagination();
      const prices = vehicles.map(v => v.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    }
  },

  getYearRange: async () => {
    try {
      const response = await axios.get<YearRange>(`${API_BASE_URL}/year-range`);
      return response.data;
    } catch (error) {
      console.error('Error fetching year range, calculating from data:', error);
      // Fallback: calculate from actual data
      const vehicles = await vehicleService.getAllVehiclesWithoutPagination();
      const years = vehicles.map(v => v.modelYear);
      return {
        min: Math.min(...years),
        max: Math.max(...years)
      };
    }
  },

  getFuelTypes: async () => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/fuel-types`);
      return response.data;
    } catch (error) {
      console.error('Error fetching fuel types:', error);
      throw error;
    }
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
    return `http://localhost:8081/image/${imageFilename}`;
  }
}; 
