import { Customer, Investment } from '../types';
import moment from 'moment';

// Generate mock customer data
export const generateMockCustomers = (count: number = 50): Customer[] => {
  const customers: Customer[] = [];

  for (let i = 0; i < count; i++) {
    const customerId = `cust-${i + 1}`;
    const createdDate = moment().subtract(Math.floor(Math.random() * 365), 'days').toISOString();

    customers.push({
      _id: customerId,
      customerId: `CUS${10000 + i}`,
      firstName: `FirstName${i + 1}`,
      lastName: `LastName${i + 1}`,
      dateOfBirth: moment().subtract(Math.floor(Math.random() * 40) + 18, 'years').format('YYYY-MM-DD'),
      email: `customer${i + 1}@example.com`,
      mobileNumber: `+91${9000000000 + i}`,
      gender: i % 3 === 0 ? 'Female' : 'Male',
      taxStatus: 'Resident Individual',
      occupation: i % 6 === 0 ? 'Business' : i % 6 === 1 ? 'Service' : i % 6 === 2 ? 'Professional' : i % 6 === 3 ? 'Retired' : i % 6 === 4 ? 'Housewife' : 'Student',
      address: {
        addressLine1: `Address Line 1 - ${i + 1}`,
        addressLine2: `Address Line 2 - ${i + 1}`,
        city: `City${i % 10}`,
        state: i % 5 === 0 ? 'Karnataka' : i % 5 === 1 ? 'Maharashtra' : i % 5 === 2 ? 'Tamil Nadu' : i % 5 === 3 ? 'Uttar Pradesh' : 'Delhi',
        pincode: `${560000 + i}`,
        country: 'India'
      },
      panNumber: `ABCPD${1000 + i}F`,
      accountDetails: {
        accountNumber: `${8000000000 + i}`,
        ifscCode: 'HDFC0001234',
        bankName: 'HDFC Bank',
        branchName: 'Main Branch',
        accountType: i % 2 === 0 ? 'Savings' : 'Current'
      },
      communicationMode: i % 5 === 0 ? 'Physical' : i % 5 === 1 ? 'Email' : i % 5 === 2 ? 'Mobile' : i % 5 === 3 ? 'WhatsApp' : 'Both Email and Physical',
      holdingNature: i % 3 === 0 ? 'Single Holding' : i % 3 === 1 ? 'Joint Holding' : 'On Behalf Of Minor',
      status: i % 10 === 0 ? 'Inactive' : 'Active',
      createdAt: createdDate,
      updatedAt: createdDate
    });
  }

  return customers;
};

// Generate mock investment data
export const generateMockInvestments = (customers: Customer[], count: number = 100): Investment[] => {
  const investments: Investment[] = [];
  
  for (let i = 0; i < count; i++) {
    const customerIndex = Math.floor(Math.random() * customers.length);
    const customerId = customers[customerIndex]._id;
    const investmentType = i % 3 === 0 ? 'SIP' : 'LUMPSUM';
    const startDate = moment().subtract(Math.floor(Math.random() * 365), 'days').format('YYYY-MM-DD');
    const isActive = i % 10 !== 0;
    
    investments.push({
      _id: `inv-${i + 1}`,
      investmentId: `INV${20000 + i}`,
      customerId,
      investmentType,
      amount: Math.floor(Math.random() * 50000) + 1000,
      startDate,
      endDate: investmentType === 'SIP' ? moment(startDate).add(Math.floor(Math.random() * 36) + 12, 'months').format('YYYY-MM-DD') : undefined,
      frequency: investmentType === 'SIP' ? 'Monthly' : undefined,
      duration: investmentType === 'SIP' ? Math.floor(Math.random() * 36) + 12 : undefined,
      status: isActive ? 'Active' : 'Inactive',
      createdAt: moment(startDate).toISOString(),
      updatedAt: moment(startDate).toISOString()
    });
  }
  
  return investments;
};

// Mock service response for customer stats
export const getMockCustomerStats = () => {
  return {
    success: true,
    message: 'Customer statistics retrieved successfully',
    data: {
      total: 50,
      active: 45,
      newThisMonth: 8
    }
  };
};

// Mock service response for investment stats
export const getMockInvestmentStats = () => {
  return {
    success: true,
    message: 'Investment statistics retrieved successfully',
    data: {
      totalInvestments: 100,
      totalSipAmount: 1250000,
      totalLumpsumAmount: 3500000,
      activeInvestments: 90
    }
  };
};

// Initialize mock data
export const mockCustomers = generateMockCustomers();
export const mockInvestments = generateMockInvestments(mockCustomers);

// Mock API response function for pagination
export const paginateData = <T>(
  data: T[],
  page: number,
  perPage: number,
  filters?: Record<string, any>
) => {
  let filteredData = [...data];
  
  // Apply filters if any
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        filteredData = filteredData.filter(item => {
          const itemValue = (item as any)[key];
          
          if (typeof filters[key] === 'string') {
            return itemValue && itemValue.toString().toLowerCase().includes(filters[key].toLowerCase());
          }
          
          return itemValue === filters[key];
        });
      }
    });
  }
  
  // Calculate pagination
  const startIndex = page * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    success: true,
    message: 'Data retrieved successfully',
    data: paginatedData,
    pagination: {
      total: filteredData.length,
      page,
      perPage
    }
  };
};

// Mock Customers
export const MOCK_CUSTOMERS: Customer[] = [
  {
    _id: 'cust1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '9876543210',
    dateOfBirth: '1990-01-15',
    taxStatus: 'taxpayer',
    gender: 'male',
    occupation: 'Software Engineer',
    city: 'Bangalore',
    state: 'Karnataka',
    status: 'active',
    createdAt: '2023-01-15T10:30:00.000Z',
    updatedAt: '2023-05-20T14:45:00.000Z'
  },
  {
    _id: 'cust2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    mobile: '8765432109',
    dateOfBirth: '1992-03-25',
    taxStatus: 'non-taxpayer',
    gender: 'female',
    occupation: 'Marketing Manager',
    city: 'Mumbai',
    state: 'Maharashtra',
    status: 'active',
    createdAt: '2023-02-10T09:15:00.000Z',
    updatedAt: '2023-06-05T11:20:00.000Z'
  },
  {
    _id: 'cust3',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '7654321098',
    dateOfBirth: '1988-07-18',
    taxStatus: 'taxpayer',
    gender: 'male',
    occupation: 'Financial Advisor',
    city: 'Delhi',
    state: 'Delhi',
    status: 'pending',
    createdAt: '2023-03-05T15:45:00.000Z',
    updatedAt: '2023-03-05T15:45:00.000Z'
  },
  {
    _id: 'cust4',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    mobile: '6543210987',
    dateOfBirth: '1995-11-05',
    taxStatus: 'non-taxpayer',
    gender: 'female',
    occupation: 'Teacher',
    city: 'Chennai',
    state: 'Tamil Nadu',
    status: 'active',
    createdAt: '2023-04-12T08:30:00.000Z',
    updatedAt: '2023-07-02T16:15:00.000Z'
  },
  {
    _id: 'cust5',
    firstName: 'Amit',
    lastName: 'Kumar',
    email: 'amit.kumar@example.com',
    mobile: '5432109876',
    dateOfBirth: '1983-09-30',
    taxStatus: 'taxpayer',
    gender: 'male',
    occupation: 'Business Owner',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'blocked',
    createdAt: '2023-05-18T13:45:00.000Z',
    updatedAt: '2023-06-25T10:20:00.000Z'
  },
  {
    _id: 'cust6',
    firstName: 'Sneha',
    lastName: 'Reddy',
    email: 'sneha.reddy@example.com',
    mobile: '4321098765',
    dateOfBirth: '1991-04-12',
    taxStatus: 'taxpayer',
    gender: 'female',
    occupation: 'Data Scientist',
    city: 'Pune',
    state: 'Maharashtra',
    status: 'active',
    createdAt: '2023-06-22T11:10:00.000Z',
    updatedAt: '2023-06-22T11:10:00.000Z'
  },
  {
    _id: 'cust7',
    firstName: 'Vijay',
    lastName: 'Singh',
    email: 'vijay.singh@example.com',
    mobile: '3210987654',
    dateOfBirth: '1987-12-03',
    taxStatus: 'non-taxpayer',
    gender: 'male',
    occupation: 'Civil Engineer',
    city: 'Kolkata',
    state: 'West Bengal',
    status: 'active',
    createdAt: '2023-07-05T09:30:00.000Z',
    updatedAt: '2023-07-05T09:30:00.000Z'
  },
  {
    _id: 'cust8',
    firstName: 'Ananya',
    lastName: 'Gupta',
    email: 'ananya.gupta@example.com',
    mobile: '2109876543',
    dateOfBirth: '1994-06-28',
    taxStatus: 'taxpayer',
    gender: 'female',
    occupation: 'Doctor',
    city: 'Bangalore',
    state: 'Karnataka',
    status: 'active',
    createdAt: '2023-08-14T14:25:00.000Z',
    updatedAt: '2023-08-14T14:25:00.000Z'
  },
  {
    _id: 'cust9',
    firstName: 'Rajesh',
    lastName: 'Iyer',
    email: 'rajesh.iyer@example.com',
    mobile: '1098765432',
    dateOfBirth: '1981-02-19',
    taxStatus: 'taxpayer',
    gender: 'male',
    occupation: 'Professor',
    city: 'Chennai',
    state: 'Tamil Nadu',
    status: 'pending',
    createdAt: '2023-09-08T16:50:00.000Z',
    updatedAt: '2023-09-08T16:50:00.000Z'
  },
  {
    _id: 'cust10',
    firstName: 'Divya',
    lastName: 'Nair',
    email: 'divya.nair@example.com',
    mobile: '0987654321',
    dateOfBirth: '1996-10-09',
    taxStatus: 'non-taxpayer',
    gender: 'female',
    occupation: 'Graphic Designer',
    city: 'Mumbai',
    state: 'Maharashtra',
    status: 'active',
    createdAt: '2023-10-01T10:05:00.000Z',
    updatedAt: '2023-10-01T10:05:00.000Z'
  }
];

// Mock Investments
export const MOCK_INVESTMENTS: Investment[] = [
  // Add mock investments data here
];

// Generate more mock data as needed 