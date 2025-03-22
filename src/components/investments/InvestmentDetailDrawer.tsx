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
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Repeat as RepeatIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { Investment } from '../../types';

interface InvestmentDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  investment: Investment | null;
  loading: boolean;
  investmentType: 'SIP' | 'LUMPSUM';
}

const InvestmentDetailDrawer: React.FC<InvestmentDetailDrawerProps> = ({
  open,
  onClose,
  investment,
  loading,
  investmentType
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
      case 'inactive':
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
        <Typography variant="h6">{investmentType === 'SIP' ? 'SIP' : 'Lumpsum'} Investment Details</Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : !investment ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No investment data available</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          {/* Header with basic investment info */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            mb: 3, 
            p: 2, 
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <Avatar
              sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: investmentType === 'SIP' ? 'primary.main' : 'secondary.main',
                mb: 2
              }}
            >
              <MoneyIcon />
            </Avatar>
            
            <Typography variant="h6" align="center">
              {formatCurrency(investment.amount)}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom align="center">
              Investment ID: {investment.investmentId}
            </Typography>
            
            <Chip 
              label={investment.status} 
              color={getStatusColor(investment.status) as any}
              size="small"
              sx={{ textTransform: 'capitalize', mt: 1 }}
            />
          </Box>
          
          {/* Investment Details */}
          <Typography variant="subtitle1" gutterBottom>
            Investment Information
          </Typography>
          
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">Customer ID</Typography>
                  </Box>
                }
                secondary={investment.customerId || 'N/A'}
              />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">Amount</Typography>
                  </Box>
                }
                secondary={formatCurrency(investment.amount)}
              />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{investmentType === 'SIP' ? 'Start Date' : 'Investment Date'}</Typography>
                  </Box>
                }
                secondary={formatDate(investment.startDate)}
              />
            </ListItem>
            
            {investmentType === 'SIP' && (
              <>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">End Date</Typography>
                      </Box>
                    }
                    secondary={investment.endDate ? formatDate(investment.endDate) : 'Ongoing'}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RepeatIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">Frequency</Typography>
                      </Box>
                    }
                    secondary={investment.frequency || 'Monthly'}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">Duration</Typography>
                      </Box>
                    }
                    secondary={`${investment.duration || 'N/A'} ${investment.duration === 1 ? 'month' : 'months'}`}
                  />
                </ListItem>
              </>
            )}
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Status Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Chip 
                label={investment.status} 
                color={getStatusColor(investment.status) as any}
                size="small"
                sx={{ mt: 0.5, textTransform: 'capitalize' }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Created On</Typography>
              <Typography variant="body1">{formatDate(investment.createdAt)}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Last Updated</Typography>
              <Typography variant="body1">{formatDate(investment.updatedAt)}</Typography>
            </Grid>
          </Grid>
          
          {investmentType === 'SIP' && (
            <>
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Payment Summary
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Monthly Amount</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(investment.amount)}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Total Payments</Typography>
                  <Typography variant="body1">
                    {investment.duration || 'N/A'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Total Value</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency((investment.amount || 0) * (investment.duration || 0))}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<InfoIcon />}
              onClick={() => console.log('View transaction history')}
            >
              Transaction History
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default InvestmentDetailDrawer; 