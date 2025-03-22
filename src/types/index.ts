// Auth Types
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Customer Types
export interface Customer {
  _id: string;
  id?: string; // Alternative ID format
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  taxStatus: string;
  gender: string;
  occupation: string;
  city: string;
  state: string;
  location?: string; // Combined location
  status: string;
  kycStatus?: string;
  accountType?: string;
  age?: number;
  registrationDate?: string;
  sipInvestments?: number;
  lumpsumInvestments?: number;
  totalInvestment?: number;
  createdAt: string;
  updatedAt: string;
}

// Investment Types
export interface Investment {
  _id: string;
  investmentId: string;
  customerId: string;
  investmentType: 'SIP' | 'LUMPSUM';
  amount: number;
  startDate: string;
  endDate?: string;
  frequency?: 'Monthly' | 'Quarterly' | 'Yearly';
  duration?: number;
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

// Dropdown Data Types
export interface DropdownOption {
  _id: string;
  code: string;
  name: string;
  status?: string;
  active: boolean;
  taxExempt?: boolean;
  taxPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Table Pagination Type
export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ListingApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination: {
    total: number;
    page: number;
    perPage: number;
  };
} 