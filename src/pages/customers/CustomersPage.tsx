import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  TextField, 
  InputAdornment, 
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  SelectChangeEvent
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

import PageHeader from '../../components/common/PageHeader';
import DataTable, { Column } from '../../components/common/DataTable';
import CustomerDetailDrawer from '../../components/customers/CustomerDetailDrawer';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { customerService } from '../../services/customerService';
import { Customer, PaginationState } from '../../types';

const CustomersPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    perPage: 10,
    total: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    status: '',
    taxStatus: ''
  });
  
  // Customer detail drawer state
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerDetailLoading, setCustomerDetailLoading] = useState(false);
  
  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, [pagination.page, pagination.perPage, filters]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerService.getCustomers(pagination, {
        ...filters,
        search: searchQuery
      });

      if (response.success) {
        setCustomers(response.data);
        setPagination(prev => ({ ...prev, total: response.pagination.total }));
      } else {
        toast.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('An error occurred while fetching customers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (customerId: string) => {
    setCustomerDetailLoading(true);
    try {
      const response = await customerService.getCustomer(customerId);
      if (response.success) {
        setSelectedCustomer(response.data);
      } else {
        toast.error('Failed to fetch customer details');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast.error('An error occurred while fetching customer details');
    } finally {
      setCustomerDetailLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 0 }));
    fetchCustomers();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setFilters({
      gender: '',
      status: '',
      taxStatus: ''
    });
    setPagination(prev => ({ ...prev, page: 0 }));
    fetchCustomers();
  };

  const handleAddCustomer = () => {
    navigate('/customers/add');
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(null);
    fetchCustomerDetails(customer._id);
    setDetailDrawerOpen(true);
  };

  const handleOpenDeleteModal = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
    
    try {
      const response = await customerService.deleteCustomer(customerToDelete._id);
      if (response.success) {
        toast.success('Customer deleted successfully');
        fetchCustomers();
        setDeleteModalOpen(false);
      } else {
        toast.error(response.message || 'Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('An error occurred while deleting the customer');
    }
  };

  const columns: Column<Customer>[] = [
    {
      id: '_id',
      label: 'Customer ID',
      minWidth: 120,
      format: (value) => value.substring(0, 8) + '...'
    },
    {
      id: 'fullName',
      label: 'Name',
      minWidth: 170,
      format: (_, row) => `${row.firstName} ${row.lastName}`
    },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'mobile', label: 'Mobile Number', minWidth: 150 },
    { 
      id: 'gender', 
      label: 'Gender', 
      minWidth: 100,
      format: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : 'N/A'
    },
    { 
      id: 'city', 
      label: 'Location', 
      minWidth: 120,
      format: (value, row) => value && row.state ? `${value}, ${row.state}` : (value || 'N/A')
    },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      format: (value) => {
        const statusColor = value === 'active' ? 'success' : 
                           value === 'pending' ? 'warning' : 
                           value === 'blocked' ? 'error' : 'default';
        return (
          <Box 
            sx={{ 
              backgroundColor: `${statusColor}.light`, 
              color: `${statusColor}.dark`,
              borderRadius: '16px',
              px: 1.5,
              py: 0.5,
              display: 'inline-block',
              textTransform: 'capitalize',
              fontSize: '0.8125rem',
              fontWeight: 'medium'
            }}
          >
            {value}
          </Box>
        );
      }
    },
    { 
      id: 'createdAt', 
      label: 'Registration Date', 
      minWidth: 170,
      format: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    }
  ];

  return (
    <Box>
      <PageHeader 
        title="Customer Management" 
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Customers' }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCustomer}
          >
            Add Customer
          </Button>
        }
      />

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<FilterListIcon />}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Tooltip title="Refresh data">
              <Button 
                fullWidth 
                color="secondary"
                variant="outlined" 
                onClick={handleRefresh}
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {showFilters && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={filters.gender}
                    label="Gender"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    label="Status"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tax Status</InputLabel>
                  <Select
                    name="taxStatus"
                    value={filters.taxStatus}
                    label="Tax Status"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="taxpayer">Taxpayer</MenuItem>
                    <MenuItem value="non-taxpayer">Non-Taxpayer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {(filters.gender || filters.status || filters.taxStatus) && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>Active Filters:</Typography>
                {filters.gender && (
                  <Chip 
                    label={`Gender: ${filters.gender}`} 
                    size="small" 
                    onDelete={() => setFilters({...filters, gender: ''})}
                  />
                )}
                {filters.status && (
                  <Chip 
                    label={`Status: ${filters.status}`} 
                    size="small" 
                    onDelete={() => setFilters({...filters, status: ''})}
                  />
                )}
                {filters.taxStatus && (
                  <Chip 
                    label={`Tax Status: ${filters.taxStatus}`} 
                    size="small" 
                    onDelete={() => setFilters({...filters, taxStatus: ''})}
                  />
                )}
              </Box>
            )}
          </Box>
        )}
      </Paper>

      <DataTable
        columns={columns}
        data={customers}
        idField="_id"
        loading={loading}
        pagination={{
          page: pagination.page,
          totalCount: pagination.total,
          rowsPerPage: pagination.perPage,
          onPageChange: (page: number) => setPagination(prev => ({ ...prev, page })),
          onRowsPerPageChange: (rowsPerPage: number) => setPagination(prev => ({ ...prev, page: 0, perPage: rowsPerPage })),
          rowsPerPageOptions: [10, 25, 50, 100]
        }}
        actions={[
          {
            icon: <ViewIcon />,
            label: 'View',
            onClick: handleViewCustomer,
            color: 'primary',
            tooltip: 'View customer details'
          },
          {
            icon: <DeleteIcon />,
            label: 'Delete',
            onClick: handleOpenDeleteModal,
            color: 'error',
            tooltip: 'Delete customer'
          }
        ]}
        emptyStateMessage="No customers found. Try adjusting your filters or adding a new customer."
        onRowClick={handleViewCustomer}
      />

      {/* Customer Detail Drawer */}
      <CustomerDetailDrawer 
        open={detailDrawerOpen}
        customer={selectedCustomer}
        loading={customerDetailLoading}
        onClose={() => setDetailDrawerOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.firstName} ${customerToDelete?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteCustomer}
        onCancel={() => setDeleteModalOpen(false)}
        severity="error"
      />
    </Box>
  );
};

export default CustomersPage; 