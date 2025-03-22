import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Button,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { Customer } from '../../types';

interface CustomerDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
  loading: boolean;
}

const CustomerDetailDrawer: React.FC<CustomerDetailDrawerProps> = ({
  open,
  onClose,
  customer,
  loading
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { 
          width: { xs: '100%', sm: 450 },
          overflow: 'auto'
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Customer Details</Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : !customer ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No customer data available</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          {/* Header with customer avatar and basic info */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center', 
            mb: 3, 
            p: 2, 
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <Avatar
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mb: { xs: 2, sm: 0 },
                mr: { sm: 3 }
              }}
            >
              {customer.firstName?.[0] || 'C'}
            </Avatar>
            
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h6">
                {customer.firstName} {customer.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customer ID: {customer.id}
              </Typography>
              <Chip 
                label={customer.status} 
                color={getStatusColor(customer.status) as any}
                size="small"
                sx={{ textTransform: 'capitalize', mt: 1 }}
              />
            </Box>
          </Box>
          
          {/* Main content with customer details */}
          <Typography variant="subtitle1" gutterBottom>
            Contact Information
          </Typography>
          
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">Email</Typography>
                  </Box>
                }
                secondary={customer.email || 'N/A'}
              />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">Phone</Typography>
                  </Box>
                }
                secondary={customer.mobile || 'N/A'}
              />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">Location</Typography>
                  </Box>
                }
                secondary={customer.location || 'N/A'}
              />
            </ListItem>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Personal Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Gender</Typography>
              <Typography variant="body1">{customer.gender || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Age</Typography>
              <Typography variant="body1">{customer.age || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Registered On</Typography>
              <Typography variant="body1">{formatDate(customer.registrationDate || '')}</Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Account Status
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">KYC Status</Typography>
              <Chip 
                label={customer.kycStatus || 'Not Verified'} 
                color={customer.kycStatus === 'verified' ? 'success' : 'warning'} 
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Account Type</Typography>
              <Typography variant="body1">{customer.accountType || 'Regular'}</Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Investment Summary
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">SIP Investments</Typography>
              <Typography variant="body1">
                {customer.sipInvestments || '0'} investments
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Lumpsum Investments</Typography>
              <Typography variant="body1">
                {customer.lumpsumInvestments || '0'} investments
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Total Investment Amount</Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹ {customer.totalInvestment ? customer.totalInvestment.toLocaleString('en-IN') : '0'}
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<PersonIcon />}
              onClick={() => console.log('Go to customer management')}
            >
              View in Customer Management
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default CustomerDetailDrawer; 