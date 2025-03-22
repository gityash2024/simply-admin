import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  PieChart as PieChartIcon,
  TableChart as TableChartIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ReportsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportPeriod, setReportPeriod] = useState('month');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReportPeriod(event.target.value as string);
  };

  return (
    <Box>
      <PageHeader
        title="Reports & Analytics"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Reports' }
        ]}
      />

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="reports tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Investment Summary" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Growth Analysis" icon={<TrendingUpIcon />} iconPosition="start" />
            <Tab label="Customer Distribution" icon={<PieChartIcon />} iconPosition="start" />
            <Tab label="Detailed Reports" icon={<TableChartIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Filter Controls */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: '#f9f9f9' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="report-period-label">Time Period</InputLabel>
                <Select
                  labelId="report-period-label"
                  value={reportPeriod}
                  label="Time Period"
                  onChange={handlePeriodChange as any}
                >
                  <MenuItem value="day">Daily</MenuItem>
                  <MenuItem value="week">Weekly</MenuItem>
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="quarter">Quarterly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="From Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="To Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="contained" startIcon={<DateRangeIcon />} fullWidth>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Investment Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Overview of all investments across different periods and types.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    bgcolor: '#f5f9ff',
                    borderLeft: '4px solid #2196f3'
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Total Investments
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      ₹ 12,548,750
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +12.5% from previous period
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    bgcolor: '#f9f5ff',
                    borderLeft: '4px solid #9c27b0'
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      SIP Investments
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      ₹ 6,324,890
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +8.2% from previous period
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    bgcolor: '#f5fff9',
                    borderLeft: '4px solid #4caf50'
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Lumpsum Investments
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      ₹ 6,223,860
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +15.8% from previous period
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    bgcolor: '#fffdf5',
                    borderLeft: '4px solid #ff9800'
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Active Investors
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      843
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +5.2% from previous period
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Investment Trends
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Chart will be displayed here showing investment trends over time
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Investment Distribution
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Pie chart will be displayed here showing distribution by type
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Growth Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Track the growth of investments and customer base over time.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Investment Growth Rate
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Line chart will be displayed here showing growth rate over time
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  SIP vs Lumpsum Growth Comparison
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Bar chart comparing growth rates
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Customer Acquisition Rate
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Line chart showing customer acquisition over time
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Customer Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Analyze customer demographics and investment patterns.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Customers by Age Group
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Pie chart showing customer age distribution
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Customers by Location
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Map or chart showing geographical distribution
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Investment Amount Distribution
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Histogram showing investment amount ranges
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Investment Type Preference
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Bar chart showing SIP vs. Lumpsum preference
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Reports
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Generate and download detailed reports for various metrics.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Investment Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Detailed breakdown of all investments including SIPs and lumpsum investments.
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer Activity Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Customer engagement metrics, login activity, and transaction history.
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Financial Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Financial performance including revenue, transaction volume, and growth metrics.
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Reports
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Table showing recently generated reports with download options
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ReportsPage;