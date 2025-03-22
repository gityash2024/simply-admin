import { ApiResponse } from '../types';
import { User } from '../types';
import { postData } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Flag to determine if we should use mock data
const USE_MOCK_DATA = true;

// Mock admin user for development
const MOCK_ADMIN_USER: User = {
  _id: 'admin-1',
  username: 'admin',
  email: 'admin@example.com',
  firstName: 'Super',
  lastName: 'Admin',
  role: 'admin',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
};

// Mock token for development
const MOCK_TOKEN = 'mock-jwt-token-for-development';

export const authService = {
  // Login user and get token
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    try {
      if (USE_MOCK_DATA) {
        // For development, we'll accept our hardcoded admin credentials
        const isValidCredentials = 
          credentials.email === 'admin@example.com' && 
          credentials.password === 'admin123';
        
        if (isValidCredentials) {
          // For development, store token and user in localStorage
          localStorage.setItem('token', MOCK_TOKEN);
          localStorage.setItem('user', JSON.stringify(MOCK_ADMIN_USER));
          
          return {
            success: true,
            message: 'Login successful',
            data: {
              user: MOCK_ADMIN_USER,
              token: MOCK_TOKEN
            }
          };
        } else {
          return {
            success: false,
            message: 'Invalid email or password',
            data: null as unknown as LoginResponse
          };
        }
      }
      
      // When connecting to a real API
      const response = await postData<LoginResponse>('/auth/login', credentials);
      
      // The response from postData should have this structure:
      // { success: boolean, message: string, data: LoginResponse | null }
      
      if (response.success && response.data) {
        // Store token and user in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: response.success,
        message: response.message,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during login',
        data: null as unknown as LoginResponse
      };
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove automatic redirect - navigation will be handled by React Router
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};

export default authService; 