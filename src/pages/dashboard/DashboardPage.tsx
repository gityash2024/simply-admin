import { useEffect, useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import moment from 'moment';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { customerService } from '../../services/customerService';
import { investmentService } from '../../services/investmentService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [customerStats, setCustomerStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0
  });
  const [investmentStats, setInvestmentStats] = useState({
    totalInvestments: 0,
    totalSipAmount: 0,
    totalLumpsumAmount: 0,
    activeInvestments: 0
  });
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be proper API calls
        // For now, we'll use our mock data
        const customerStatsResponse = await customerService.getCustomerStats();
        const investmentStatsResponse = await investmentService.getInvestmentStats();
        
        // Get recent customers (mock data for now)
        const customersResponse = await customerService.getCustomers({ 
          page: 0, 
          perPage: 5, 
          total: 0 
        });
        
        if (customerStatsResponse.success) {
          setCustomerStats(customerStatsResponse.data);
        }
        
        if (investmentStatsResponse.success) {
          setInvestmentStats(investmentStatsResponse.data);
        }
        
        if (customersResponse.success) {
          setRecentCustomers(customersResponse.data || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // For mock data purposes, we'll define chart data here
  const investmentDistributionData = {
    labels: ['SIP', 'Lumpsum'],
    datasets: [
      {
        data: [investmentStats.totalSipAmount, investmentStats.totalLumpsumAmount],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  const monthlySummaryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Investments',
        backgroundColor: 'rgba(78, 115, 223, 0.8)',
        borderColor: 'rgba(78, 115, 223, 1)',
        data: [4000, 5000, 6000, 8000, 9000, 10000, 12000, 14000, 16000, 17000, 18000, 20000],
      },
    ],
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  return (
    <Box>
      <PageHeader title="Dashboard" />
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Total Customers</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>{customerStats.total}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PeopleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Total Investments</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>{investmentStats.totalInvestments}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <MoneyIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Active Investments</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>{investmentStats.activeInvestments}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">New Customers (This Month)</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>{customerStats.newThisMonth}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <AccountIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Monthly Investment Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300 }}>
              <Bar
                data={monthlySummaryData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Investment Distribution</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Doughnut
                data={investmentDistributionData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  cutout: '70%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Customer Registrations</Typography>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ width: '100%' }}>
              {recentCustomers.length > 0 ? (
                recentCustomers.map((customer, index) => (
                  <Box key={customer._id || index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${customer.firstName} ${customer.lastName}`}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {customer.email}
                            </Typography>
                            {` — Registered on ${moment(customer.createdAt).format('DD MMM YYYY')}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentCustomers.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                  No recent customer registrations found.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 