import { Investment, ApiResponse, ListingApiResponse, PaginationState } from '../types';
import { fetchData, postData, putData, deleteData } from './api';
import { mockInvestments, paginateData, getMockInvestmentStats } from './mockData';

// Flag to determine if we should use mock data
const USE_MOCK_DATA = true;

export const investmentService = {
  // Get all investments with pagination
  getInvestments: async (
    pagination: PaginationState, 
    filters?: { 
      customerId?: string; 
      investmentType?: 'SIP' | 'LUMPSUM'; 
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<ListingApiResponse<Investment[]>> => {
    try {
      if (USE_MOCK_DATA) {
        return paginateData<Investment>(mockInvestments, pagination.page, pagination.perPage, filters);
      }
      return await fetchData<ListingApiResponse<Investment[]>>('/investments', {
        page: pagination.page,
        perPage: pagination.perPage,
        ...filters
      });
    } catch (error) {
      throw error;
    }
  },

  // Get investment by ID
  getInvestmentById: async (id: string): Promise<ApiResponse<Investment>> => {
    try {
      if (USE_MOCK_DATA) {
        const investment = mockInvestments.find(i => i._id === id);
        return {
          success: !!investment,
          message: investment ? 'Investment found' : 'Investment not found',
          data: investment as Investment
        };
      }
      return await fetchData<ApiResponse<Investment>>(`/investments/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new investment
  createInvestment: async (investmentData: Partial<Investment>): Promise<ApiResponse<Investment>> => {
    try {
      if (USE_MOCK_DATA) {
        const newInvestment: Investment = {
          ...investmentData,
          _id: `inv-${mockInvestments.length + 1}`,
          investmentId: `INV${20000 + mockInvestments.length + 1}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Investment;
        
        mockInvestments.push(newInvestment);
        
        return {
          success: true,
          message: 'Investment created successfully',
          data: newInvestment
        };
      }
      return await postData<ApiResponse<Investment>>('/investments', investmentData);
    } catch (error) {
      throw error;
    }
  },

  // Update investment
  updateInvestment: async (id: string, investmentData: Partial<Investment>): Promise<ApiResponse<Investment>> => {
    try {
      if (USE_MOCK_DATA) {
        const index = mockInvestments.findIndex(i => i._id === id);
        
        if (index === -1) {
          return {
            success: false,
            message: 'Investment not found',
            data: null as unknown as Investment
          };
        }
        
        const updatedInvestment = {
          ...mockInvestments[index],
          ...investmentData,
          updatedAt: new Date().toISOString()
        };
        
        mockInvestments[index] = updatedInvestment;
        
        return {
          success: true,
          message: 'Investment updated successfully',
          data: updatedInvestment
        };
      }
      return await putData<ApiResponse<Investment>>(`/investments/${id}`, investmentData);
    } catch (error) {
      throw error;
    }
  },

  // Delete investment
  deleteInvestment: async (id: string): Promise<ApiResponse<null>> => {
    try {
      if (USE_MOCK_DATA) {
        const index = mockInvestments.findIndex(i => i._id === id);
        
        if (index === -1) {
          return {
            success: false,
            message: 'Investment not found',
            data: null
          };
        }
        
        mockInvestments.splice(index, 1);
        
        return {
          success: true,
          message: 'Investment deleted successfully',
          data: null
        };
      }
      return await deleteData<ApiResponse<null>>(`/investments/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Get SIP investments
  getSipInvestments: async (pagination: PaginationState, filters?: any): Promise<ListingApiResponse<Investment[]>> => {
    try {
      if (USE_MOCK_DATA) {
        const sipInvestments = mockInvestments.filter(i => i.investmentType === 'SIP');
        return paginateData<Investment>(sipInvestments, pagination.page, pagination.perPage, filters);
      }
      return await fetchData<ListingApiResponse<Investment[]>>('/investments', {
        page: pagination.page,
        perPage: pagination.perPage,
        investmentType: 'SIP',
        ...filters
      });
    } catch (error) {
      throw error;
    }
  },

  // Get lumpsum investments
  getLumpsumInvestments: async (pagination: PaginationState, filters?: any): Promise<ListingApiResponse<Investment[]>> => {
    try {
      if (USE_MOCK_DATA) {
        const lumpsumInvestments = mockInvestments.filter(i => i.investmentType === 'LUMPSUM');
        return paginateData<Investment>(lumpsumInvestments, pagination.page, pagination.perPage, filters);
      }
      return await fetchData<ListingApiResponse<Investment[]>>('/investments', {
        page: pagination.page,
        perPage: pagination.perPage,
        investmentType: 'LUMPSUM',
        ...filters
      });
    } catch (error) {
      throw error;
    }
  },

  // Get investment statistics
  getInvestmentStats: async (): Promise<ApiResponse<{
    totalInvestments: number;
    totalSipAmount: number;
    totalLumpsumAmount: number;
    activeInvestments: number;
  }>> => {
    try {
      if (USE_MOCK_DATA) {
        return getMockInvestmentStats();
      }
      return await fetchData<ApiResponse<{
        totalInvestments: number;
        totalSipAmount: number;
        totalLumpsumAmount: number;
        activeInvestments: number;
      }>>('/investments/statistics');
    } catch (error) {
      throw error;
    }
  }
};

export default investmentService; 