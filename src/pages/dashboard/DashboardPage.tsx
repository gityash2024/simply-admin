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
  Avatar,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarMonthIcon,
  Add as AddIcon
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
import ScheduleModal from '../../components/common/ScheduleModal';

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
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Mock data instead of API calls
        const mockCustomerStats = {
          success: true,
          data: {
            total: 843,
            active: 735,
            newThisMonth: 68
          }
        };
        
        const mockInvestmentStats = {
          success: true,
          data: {
            totalInvestments: 1245,
            totalSipAmount: 6324890,
            totalLumpsumAmount: 6223860,
            activeInvestments: 980
          }
        };
        
        const mockRecentCustomers = {
          success: true,
          data: [
            { _id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', joinedDate: '2023-05-15' },
            { _id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', joinedDate: '2023-05-18' },
            { _id: '3', name: 'Amit Singh', email: 'amit@example.com', phone: '9876543212', joinedDate: '2023-05-20' },
            { _id: '4', name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543213', joinedDate: '2023-05-22' },
            { _id: '5', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '9876543214', joinedDate: '2023-05-25' }
          ]
        };
        
        // Update state with mock data
        setCustomerStats(mockCustomerStats.data);
        setInvestmentStats(mockInvestmentStats.data);
        setRecentCustomers(mockRecentCustomers.data);
      } catch (error) {
        console.error('Error setting up dashboard data:', error);
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

  // For mock data purposes, we'll define chart options based on screen size
  const getChartOptions = () => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: !isMobile,
          position: 'top' as const,
          labels: {
            boxWidth: isMobile ? 10 : 20,
            font: {
              size: isMobile ? 10 : 12
            }
          }
        },
        tooltip: {
          bodyFont: {
            size: isMobile ? 10 : 12
          },
          titleFont: {
            size: isMobile ? 10 : 12
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: isMobile ? 8 : 11
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: isMobile ? 8 : 11
            }
          }
        }
      }
    };
  };

  const handleOpenScheduleModal = () => {
    setScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setScheduleModalOpen(false);
  };

  const handleScheduleSubmit = (scheduleData: any) => {
    console.log('Schedule submitted:', scheduleData);
    // Here you would typically save the schedule data to your backend
    handleCloseScheduleModal();
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  return (
    <Box sx={{ 
      flexGrow: 1,
      height: '100%',
      overflow: 'auto'
    }}>
      <PageHeader 
        title="Dashboard" 
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            onClick={handleOpenScheduleModal}
          >
            Schedule
          </Button>
        }
      />
      
      {/* Schedule Modal */}
      <ScheduleModal
        open={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onSubmit={handleScheduleSubmit}
      />
      
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Summary Cards */}
        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}>
                    Total Customers
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} sx={{ mt: 1 }}>
                    {customerStats.total}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <PeopleIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}>
                    Total Investments
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} sx={{ mt: 1 }}>
                    {investmentStats.totalInvestments}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <MoneyIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}>
                    Active Investments
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} sx={{ mt: 1 }}>
                    {investmentStats.activeInvestments}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <TrendingUpIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}>
                    New Customers
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} sx={{ mt: 1 }}>
                    {customerStats.newThisMonth}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                  <AccountIcon fontSize={isMobile ? "small" : "medium"} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: isMobile ? 1.5 : 2 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Monthly Investment Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: isMobile ? 250 : 300 }}>
              <Bar
                data={monthlySummaryData}
                options={getChartOptions()}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: isMobile ? 1.5 : 2 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Investment Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ 
              height: isMobile ? 200 : 300, 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Doughnut 
                data={investmentDistributionData} 
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: isMobile ? 10 : 20,
                        font: {
                          size: isMobile ? 10 : 12
                        }
                      }
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Recent Customers */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: isMobile ? 1.5 : 2 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
              Recent Customers
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {recentCustomers.map((customer) => (
                <ListItem 
                  key={customer._id} 
                  divider 
                  sx={{ 
                    px: isMobile ? 1 : 2, 
                    py: isMobile ? 1 : 1.5 
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light', width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}>
                      <PersonIcon fontSize={isMobile ? "small" : "medium"} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                        {customer.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2 } }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                          {customer.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                          Joined: {moment(customer.joinedDate).format('MMM DD, YYYY')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 