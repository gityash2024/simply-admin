import { DropdownOption, ApiResponse } from '../types';
import { fetchData } from './api';

type DropdownType = 
  | 'occupation'
  | 'taxStatus'
  | 'holdingNature' 
  | 'panExemptCategory' 
  | 'dividendPayMode'
  | 'accountType'
  | 'state'
  | 'country'
  | 'communicationMode';

export const dropdownService = {
  // Get dropdown options by type
  getDropdownOptions: async (type: DropdownType): Promise<ApiResponse<DropdownOption[]>> => {
    try {
      return await fetchData<ApiResponse<DropdownOption[]>>(`/dropdowns/${type}`);
    } catch (error) {
      throw error;
    }
  },

  // Get all dropdown options (for initial app load or settings page)
  getAllDropdownOptions: async (): Promise<Record<DropdownType, DropdownOption[]>> => {
    try {
      const response = await fetchData<ApiResponse<Record<DropdownType, DropdownOption[]>>>('/dropdowns');
      return response.data || {} as Record<DropdownType, DropdownOption[]>;
    } catch (error) {
      throw error;
    }
  },

  // Update dropdown option
  updateDropdownOption: async (type: DropdownType, id: string, data: Partial<DropdownOption>): Promise<ApiResponse<DropdownOption>> => {
    try {
      return await fetchData<ApiResponse<DropdownOption>>(`/dropdowns/${type}/${id}`, data);
    } catch (error) {
      throw error;
    }
  },

  // Mock data for development - can be removed in production
  getMockDropdownOptions: (type: DropdownType): DropdownOption[] => {
    switch (type) {
      case 'occupation':
        return [
          { _id: '1', code: 'business', name: 'Business', active: true },
          { _id: '2', code: 'service', name: 'Service', active: true },
          { _id: '3', code: 'professional', name: 'Professional', active: true },
          { _id: '4', code: 'retired', name: 'Retired', active: true },
          { _id: '5', code: 'housewife', name: 'Housewife', active: true },
          { _id: '6', code: 'student', name: 'Student', active: true }
        ];
      case 'taxStatus':
        return [
          { _id: '1', code: 'resident', name: 'Resident Individual', active: true },
          { _id: '2', code: 'nri', name: 'NRI', active: true },
          { _id: '3', code: 'foreign', name: 'Foreign National', active: true }
        ];
      case 'holdingNature':
        return [
          { _id: '1', code: 'single', name: 'Single Holding', active: true },
          { _id: '2', code: 'joint', name: 'Joint Holding', active: true },
          { _id: '3', code: 'guardian', name: 'On Behalf Of Minor', active: true }
        ];
      case 'panExemptCategory':
        return [
          { _id: '1', code: 'not_exempt', name: 'Not Exempt', active: true },
          { _id: '2', code: 'exempt', name: 'Exempt', active: true }
        ];
      case 'dividendPayMode':
        return [
          { _id: '1', code: 'payout', name: 'Payout', active: true },
          { _id: '2', code: 'reinvest', name: 'Reinvestment', active: true }
        ];
      case 'accountType':
        return [
          { _id: '1', code: 'savings', name: 'Savings', active: true },
          { _id: '2', code: 'current', name: 'Current', active: true }
        ];
      case 'state':
        return [
          { _id: '1', code: 'KA', name: 'Karnataka', active: true },
          { _id: '2', code: 'MH', name: 'Maharashtra', active: true },
          { _id: '3', code: 'TN', name: 'Tamil Nadu', active: true },
          { _id: '4', code: 'UP', name: 'Uttar Pradesh', active: true },
          { _id: '5', code: 'DL', name: 'Delhi', active: true }
        ];
      case 'country':
        return [
          { _id: '1', code: 'IN', name: 'India', active: true },
          { _id: '2', code: 'US', name: 'United States', active: true },
          { _id: '3', code: 'UK', name: 'United Kingdom', active: true },
          { _id: '4', code: 'SG', name: 'Singapore', active: true },
          { _id: '5', code: 'AU', name: 'Australia', active: true }
        ];
      case 'communicationMode':
        return [
          { _id: '1', code: 'physical', name: 'Physical', active: true },
          { _id: '2', code: 'email', name: 'Email', active: true },
          { _id: '3', code: 'mobile', name: 'Mobile', active: true },
          { _id: '4', code: 'whatsapp', name: 'WhatsApp', active: true },
          { _id: '5', code: 'email_physical', name: 'Both Email and Physical', active: true }
        ];
      default:
        return [];
    }
  }
};

export default dropdownService; 