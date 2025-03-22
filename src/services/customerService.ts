import { Customer, ApiResponse, ListingApiResponse, PaginationState } from '../types';
import { getData, postData, putData, deleteData } from './api';
import { MOCK_CUSTOMERS } from './mockData';

// Flag to use mock data (for development)
const USE_MOCK_DATA = true;

interface CustomerFilters {
  search?: string;
  status?: string;
  gender?: string;
  taxStatus?: string;
  [key: string]: string | undefined;
}

export const customerService = {
  // Get customers with pagination and filters
  getCustomers: async (
    pagination: PaginationState, 
    filters: CustomerFilters = {}
  ): Promise<ListingApiResponse<Customer[]>> => {
    if (USE_MOCK_DATA) {
      let filteredCustomers = [...MOCK_CUSTOMERS];
      
      // Apply filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(
          customer => 
            customer.firstName.toLowerCase().includes(searchLower) || 
            customer.lastName.toLowerCase().includes(searchLower) || 
            customer.email.toLowerCase().includes(searchLower) || 
            customer.mobile.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.status) {
        filteredCustomers = filteredCustomers.filter(
          customer => customer.status === filters.status
        );
      }
      
      if (filters.gender) {
        filteredCustomers = filteredCustomers.filter(
          customer => customer.gender === filters.gender
        );
      }
      
      if (filters.taxStatus) {
        filteredCustomers = filteredCustomers.filter(
          customer => customer.taxStatus === filters.taxStatus
        );
      }
      
      // Apply pagination
      const total = filteredCustomers.length;
      const { page, perPage } = pagination;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedCustomers = filteredCustomers.slice(start, end);
      
      return {
        success: true,
        message: 'Customers retrieved successfully',
        data: paginatedCustomers,
        pagination: {
          page,
          perPage,
          total
        }
      };
    }
    
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination params
      queryParams.append('page', pagination.page.toString());
      queryParams.append('limit', pagination.perPage.toString());
      
      // Add filter params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      return await getData<Customer[]>(`/customers?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error fetching customers:', error);
      return {
        success: false,
        message: 'Failed to fetch customers',
        data: [],
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          total: 0
        }
      };
    }
  },
  
  // Get customer by ID
  getCustomer: async (id: string): Promise<ApiResponse<Customer>> => {
    if (USE_MOCK_DATA) {
      const customer = MOCK_CUSTOMERS.find(c => c._id === id);
      
      if (customer) {
        return {
          success: true,
          message: 'Customer found',
          data: customer
        };
      }
      
      return {
        success: false,
        message: 'Customer not found',
        data: null as unknown as Customer
      };
    }
    
    try {
      return await getData<Customer>(`/customers/${id}`);
    } catch (error) {
      console.error('Error fetching customer:', error);
      return {
        success: false,
        message: 'Failed to fetch customer',
        data: null as unknown as Customer
      };
    }
  },
  
  // Create new customer
  createCustomer: async (customerData: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    if (USE_MOCK_DATA) {
      // Generate a mock ID and timestamps
      const newCustomer: Customer = {
        _id: 'mock_' + Date.now().toString(),
        firstName: customerData.firstName || '',
        lastName: customerData.lastName || '',
        email: customerData.email || '',
        mobile: customerData.mobile || '',
        gender: customerData.gender || '',
        dateOfBirth: customerData.dateOfBirth || '',
        taxStatus: customerData.taxStatus || 'non-taxpayer',
        occupation: customerData.occupation || '',
        city: customerData.city || '',
        state: customerData.state || '',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to mock data
      MOCK_CUSTOMERS.unshift(newCustomer);
      
      return {
        success: true,
        message: 'Customer created successfully',
        data: newCustomer
      };
    }
    
    try {
      return await postData<Customer>('/customers', customerData);
    } catch (error) {
      console.error('Error creating customer:', error);
      return {
        success: false,
        message: 'Failed to create customer',
        data: null as unknown as Customer
      };
    }
  },
  
  // Update existing customer
  updateCustomer: async (id: string, customerData: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    if (USE_MOCK_DATA) {
      const index = MOCK_CUSTOMERS.findIndex(c => c._id === id);
      
      if (index !== -1) {
        // Update customer and set updatedAt timestamp
        const updatedCustomer = {
          ...MOCK_CUSTOMERS[index],
          ...customerData,
          updatedAt: new Date().toISOString()
        };
        
        MOCK_CUSTOMERS[index] = updatedCustomer;
        
        return {
          success: true,
          message: 'Customer updated successfully',
          data: updatedCustomer
        };
      }
      
      return {
        success: false,
        message: 'Customer not found',
        data: null as unknown as Customer
      };
    }
    
    try {
      return await putData<Customer>(`/customers/${id}`, customerData);
    } catch (error) {
      console.error('Error updating customer:', error);
      return {
        success: false,
        message: 'Failed to update customer',
        data: null as unknown as Customer
      };
    }
  },
  
  // Delete customer
  deleteCustomer: async (id: string): Promise<ApiResponse<null>> => {
    if (USE_MOCK_DATA) {
      const index = MOCK_CUSTOMERS.findIndex(c => c._id === id);
      
      if (index !== -1) {
        MOCK_CUSTOMERS.splice(index, 1);
        
        return {
          success: true,
          message: 'Customer deleted successfully',
          data: null
        };
      }
      
      return {
        success: false,
        message: 'Customer not found',
        data: null
      };
    }
    
    try {
      return await deleteData(`/customers/${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error);
      return {
        success: false,
        message: 'Failed to delete customer',
        data: null
      };
    }
  }
};

export default customerService; 