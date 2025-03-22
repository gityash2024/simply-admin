import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import PageHeader from '../../../components/common/PageHeader';
import DataTable from '../../../components/common/DataTable';
import investmentService from '../../../services/investmentService';
import customerService from '../../../services/customerService';
import { Investment, PaginationState } from '../../../types';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import InvestmentDetailDrawer from '../../../components/investments/InvestmentDetailDrawer';
import InvestmentFormDrawer from '../../../components/investments/InvestmentFormDrawer';
import { Column } from '../../../components/common/DataTable';
import LoadingScreen from '../../../components/common/LoadingScreen';

const mockInvestments: Investment[] = [
  {
    _id: '1',
    investmentId: 'LUMP00001',
    customerId: 'CUST001',
    amount: 50000,
    startDate: '2023-01-15',
    status: 'Active',
    createdAt: '2023-01-10',
    updatedAt: '2023-01-10',
    investmentType: 'LUMPSUM'
  },
  {
    _id: '2',
    investmentId: 'LUMP00002',
    customerId: 'CUST002',
    amount: 100000,
    startDate: '2023-02-20',
    status: 'Active',
    createdAt: '2023-02-15',
    updatedAt: '2023-02-15',
    investmentType: 'LUMPSUM'
  },
  {
    _id: '3',
    investmentId: 'LUMP00003',
    customerId: 'CUST003',
    amount: 25000,
    startDate: '2023-03-05',
    status: 'Completed',
    createdAt: '2023-03-01',
    updatedAt: '2023-09-10',
    investmentType: 'LUMPSUM'
  },
  {
    _id: '4',
    investmentId: 'LUMP00004',
    customerId: 'CUST004',
    amount: 75000,
    startDate: '2023-04-10',
    status: 'Pending',
    createdAt: '2023-04-05',
    updatedAt: '2023-04-05',
    investmentType: 'LUMPSUM'
  },
  {
    _id: '5',
    investmentId: 'LUMP00005',
    customerId: 'CUST005',
    amount: 150000,
    startDate: '2023-05-15',
    status: 'Inactive',
    createdAt: '2023-05-10',
    updatedAt: '2023-05-20',
    investmentType: 'LUMPSUM'
  }
];

const mockCustomers = {
  'CUST001': 'Rahul Sharma',
  'CUST002': 'Priya Patel',
  'CUST003': 'Amit Singh',
  'CUST004': 'Neha Gupta',
  'CUST005': 'Vikram Mehta'
};

const LumpsumInvestmentsPage = () => {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    page: 0,
    perPage: 10,
    total: 0
  });
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState({
    status: 'all'
  });
  const [customerData, setCustomerData] = useState<{[key: string]: string}>({});
  const [customers, setCustomers] = useState<{id: string, name: string}[]>([]);
  
  // State for view/edit/delete functionality
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState<boolean>(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Add state for form loading
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // Comment the real data fetch for now and use mock data
    // fetchInvestments();
    // fetchCustomers();
    
    // Use mock data instead
    setLoading(true);
    setTimeout(() => {
      setInvestments(mockInvestments);
      setCustomerData(mockCustomers);
      setCustomers(Object.entries(mockCustomers).map(([id, name]) => ({ id, name: name as string })));
      setPagination({
        ...pagination,
        total: mockInvestments.length
      });
      setLoading(false);
    }, 1000); // Simulate loading
  }, [pagination.page, pagination.perPage, filters]);

  const handleSearch = () => {
    // fetchInvestments();
  };

  const handleRefresh = () => {
    setSearch('');
    setFilters({ status: 'all' });
    setPagination({ ...pagination, page: 0 });
    // fetchInvestments();
  };

  const handleAdd = () => {
    setSelectedInvestment(null);
    setIsEditing(false);
    setFormDrawerOpen(true);
  };

  const handleView = (investment: Investment) => {
    setSelectedInvestment(investment);
    setDetailDrawerOpen(true);
  };

  const handleEdit = (investment: Investment) => {
    setSelectedInvestment(investment);
    setIsEditing(true);
    setFormDrawerOpen(true);
  };

  const handleDelete = (investment: Investment) => {
    setSelectedInvestment(investment);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedInvestment) return;
    
    setDeleteLoading(true);
    try {
      // const response = await investmentService.deleteInvestment(selectedInvestment._id);
      
      // if (response.success) {
        toast.success('Investment deleted successfully');
        // fetchInvestments();
        setDeleteModalOpen(false);
      // } else {
        // toast.error(response.message || 'Failed to delete investment');
      // }
    } catch (error) {
      toast.error('An error occurred while deleting the investment');
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleChangePage = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (newPerPage: number) => {
    setPagination({ page: 0, perPage: newPerPage, total: pagination.total });
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const name = event.target.name as string;
    const value = event.target.value;
    
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleFormSubmit = async (values: any) => {
    setFormLoading(true);
    
    try {
      // Mock response for both edit and create
      const mockResponse = {
        success: true,
        message: isEditing ? 'Lumpsum investment updated successfully' : 'Lumpsum investment created successfully'
      };
      
      if (isEditing && selectedInvestment) {
        // response = await investmentService.updateInvestment(selectedInvestment._id, values);
        // Mock response
        if (mockResponse.success) {
          toast.success('Lumpsum investment updated successfully');
          // fetchInvestments();
          setFormDrawerOpen(false);
        } else {
          toast.error(mockResponse.message || 'Failed to update Lumpsum investment');
        }
      } else {
        // response = await investmentService.createInvestment(values);
        // Mock response
        if (mockResponse.success) {
          toast.success('Lumpsum investment created successfully');
          // fetchInvestments();
          setFormDrawerOpen(false);
        } else {
          toast.error(mockResponse.message || 'Failed to create Lumpsum investment');
        }
      }
    } catch (error) {
      toast.error('An error occurred while saving the investment');
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'default' | 'primary' | 'secondary' | 'info' = 'default';
    
    switch (status.toLowerCase()) {
      case 'active':
        color = 'success';
        break;
      case 'pending':
        color = 'warning';
        break;
      case 'completed':
        color = 'info';
        break;
      case 'cancelled':
      case 'inactive':
        color = 'error';
        break;
    }
    
    return (
      <Chip 
        label={status} 
        color={color} 
        size="small" 
        sx={{ textTransform: 'capitalize' }}
      />
    );
  };

  // Update columns to use correct format for DataTable component
  const columns: Column<Investment>[] = [
    {
      id: 'investmentId',
      label: 'Investment ID',
      minWidth: 150,
      format: (value) => value
    },
    {
      id: 'customerId',
      label: 'Customer Name',
      minWidth: 180,
      format: (value, row) => customerData[value] || value
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 150,
      format: (value) => `₹${value.toLocaleString('en-IN')}`
    },
    {
      id: 'startDate',
      label: 'Start Date',
      minWidth: 120,
      format: (value) => new Date(value).toLocaleDateString()
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      format: (value) => getStatusChip(value)
    },
    {
      id: 'createdAt',
      label: 'Created Date',
      minWidth: 150,
      format: (value) => new Date(value).toLocaleDateString()
    }
  ];

  // Define actions for the data table
  const actions = [
    {
      icon: <ViewIcon />,
      label: 'View',
      onClick: handleView,
      tooltip: 'View investment details',
      color: 'primary' as const
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      onClick: handleEdit,
      tooltip: 'Edit investment',
      color: 'primary' as const
    },
    {
      icon: <DeleteIcon />,
      label: 'Delete',
      onClick: handleDelete,
      tooltip: 'Delete investment',
      color: 'error' as const
    }
  ];

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%', 
      maxWidth: '100%',
      display: 'flex', 
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden'
    }}>
      <PageHeader
        title="Lumpsum Investments"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Investments' },
          { title: 'Lumpsum' }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Lumpsum Investment
          </Button>
        }
      />

      <Paper elevation={2} sx={{ p: 2, mb: 3, width: '100%', maxWidth: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search Investments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status"
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ 
        flexGrow: 1, 
        width: '100%', 
        maxWidth: '100%',
        height: 'calc(100vh - 300px)', 
        minHeight: '400px',
        overflow: 'auto',
        position: 'relative'
      }}>
        {loading && <LoadingScreen />}
        <DataTable
          columns={columns}
          data={investments}
          idField="_id"
          loading={loading}
          actions={actions}
          pagination={{
            page: pagination.page,
            totalCount: pagination.total,
            rowsPerPage: pagination.perPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleChangeRowsPerPage
          }}
          emptyStateMessage="No Lumpsum investments found"
        />
      </Box>
      
      {/* Detail Drawer */}
      <InvestmentDetailDrawer
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        investment={selectedInvestment}
        loading={false}
        investmentType="LUMPSUM"
      />
      
      {/* Form Drawer */}
      <InvestmentFormDrawer
        open={formDrawerOpen}
        onClose={() => setFormDrawerOpen(false)}
        onSubmit={handleFormSubmit}
        investment={isEditing ? selectedInvestment : null}
        loading={formLoading}
        investmentType="LUMPSUM"
        title={isEditing ? "Edit Lumpsum Investment" : "Add Lumpsum Investment"}
        customers={customers}
      />
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        title="Delete Investment"
        message="Are you sure you want to delete this investment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        severity="error"
      />
    </Box>
  );
};

export default LumpsumInvestmentsPage; 