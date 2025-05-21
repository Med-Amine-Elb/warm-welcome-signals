import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/products';

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  fuelType: string;
  modelYear: number;
  description: string;
  imageFileName: string;
  status: boolean;
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
    const response = await axios.get<PaginatedResponse<Vehicle>>(`${API_BASE_URL}/all`, {
      params: { page, size, sortBy, sortOrder }
    });
    return response.data;
  },

  getAllVehiclesWithoutPagination: async () => {
    const response = await axios.get<Vehicle[]>(`${API_BASE_URL}/all-no-pagination`);
    return response.data;
  },

  getVehicleById: async (id: number) => {
    const response = await axios.get<Vehicle>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  getVehiclesByFuelType: async (fuelType: string, page = 0, size = 10, sortBy = 'id', sortOrder = 'DESC') => {
    const response = await axios.get<PaginatedResponse<Vehicle>>(`${API_BASE_URL}/filterFuel`, {
      params: { filterFuel: fuelType, page, size, sortBy, sortOrder }
    });
    return response.data;
  },

  getAllBrands: async () => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/brands`);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/categories`);
    return response.data;
  },

  getPriceRange: async () => {
    const response = await axios.get<PriceRange>(`${API_BASE_URL}/price-range`);
    return response.data;
  },

  getYearRange: async () => {
    const response = await axios.get<YearRange>(`${API_BASE_URL}/year-range`);
    return response.data;
  },

  getFuelTypes: async () => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/fuel-types`);
    return response.data;
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