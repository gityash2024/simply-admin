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
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from '@mui/material';
import {
  Email as EmailIcon,
  Sms as SmsIcon,
  Notifications as NotificationsIcon,
  Campaign as CampaignIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  History as HistoryIcon
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

const CommunicationsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [recipientType, setRecipientType] = useState('all');

  // Mock data for communication stats
  const stats = [
    { title: 'Emails Sent', value: 1248, icon: <EmailIcon color="primary" /> },
    { title: 'SMS Delivered', value: 756, icon: <SmsIcon color="secondary" /> },
    { title: 'Notifications', value: 2134, icon: <NotificationsIcon color="success" /> },
    { title: 'Active Campaigns', value: 8, icon: <CampaignIcon color="warning" /> }
  ];

  // Mock data for communication templates
  const templates = [
    { id: 'welcome', name: 'Welcome Email', type: 'email', lastUsed: '2023-06-15' },
    { id: 'kyc-reminder', name: 'KYC Reminder', type: 'email', lastUsed: '2023-06-10' },
    { id: 'investment-confirmation', name: 'Investment Confirmation', type: 'email', lastUsed: '2023-06-08' },
    { id: 'dividend-announcement', name: 'Dividend Announcement', type: 'email', lastUsed: '2023-06-01' },
    { id: 'otp', name: 'OTP Verification', type: 'sms', lastUsed: '2023-06-12' },
    { id: 'withdrawal-confirmation', name: 'Withdrawal Confirmation', type: 'sms', lastUsed: '2023-06-05' }
  ];

  // Mock data for scheduled communications
  const scheduledCommunications = [
    { id: 1, title: 'Monthly Newsletter', type: 'email', scheduledFor: '2023-07-01', status: 'scheduled' },
    { id: 2, title: 'NAV Update', type: 'notification', scheduledFor: '2023-06-30', status: 'scheduled' },
    { id: 3, title: 'Service Maintenance Notice', type: 'sms', scheduledFor: '2023-07-05', status: 'draft' }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTemplate(event.target.value);
  };

  const handleRecipientTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientType(event.target.value);
  };

  const getStatusChipColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'primary';
      case 'sent': return 'success';
      case 'draft': return 'default';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'email': return <EmailIcon fontSize="small" />;
      case 'sms': return <SmsIcon fontSize="small" />;
      case 'notification': return <NotificationsIcon fontSize="small" />;
      default: return <EmailIcon fontSize="small" />;
    }
  };

  return (
    <Box>
      <PageHeader
        title="Communications"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Communications' }
        ]}
      />

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  '&:hover': { 
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h4" gutterBottom>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="communication tabs">
            <Tab label="Send Communication" icon={<EmailIcon />} iconPosition="start" />
            <Tab label="Templates" icon={<FilterIcon />} iconPosition="start" />
            <Tab label="Scheduled" icon={<ScheduleIcon />} iconPosition="start" />
            <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Compose Message
              </Typography>
              
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="comm-type-label">Communication Type</InputLabel>
                      <Select
                        labelId="comm-type-label"
                        value="email"
                        label="Communication Type"
                      >
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="sms">SMS</MenuItem>
                        <MenuItem value="notification">In-App Notification</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="template-label">Template</InputLabel>
                      <Select
                        labelId="template-label"
                        value={selectedTemplate}
                        onChange={handleTemplateChange as any}
                        label="Template"
                      >
                        <MenuItem value="">
                          <em>None (Compose new)</em>
                        </MenuItem>
                        {templates
                          .filter(t => t.type === 'email')
                          .map(template => (
                            <MenuItem key={template.id} value={template.id}>
                              {template.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth
                      label="Subject"
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth
                      label="Message Content"
                      variant="outlined"
                      multiline
                      rows={8}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button variant="outlined">Save as Draft</Button>
                      <Button variant="outlined">Schedule</Button>
                      <Button variant="contained">Send Now</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Recipients
              </Typography>
              
              <Paper elevation={1} sx={{ p: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="recipient-type-label">Recipient Type</InputLabel>
                  <Select
                    labelId="recipient-type-label"
                    value={recipientType}
                    onChange={handleRecipientTypeChange as any}
                    label="Recipient Type"
                  >
                    <MenuItem value="all">All Customers</MenuItem>
                    <MenuItem value="active">Active Customers</MenuItem>
                    <MenuItem value="inactive">Inactive Customers</MenuItem>
                    <MenuItem value="specific">Specific Customers</MenuItem>
                    <MenuItem value="filter">Apply Filters</MenuItem>
                  </Select>
                </FormControl>
                
                {recipientType === 'specific' && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="specific-customers-label">Select Customers</InputLabel>
                    <Select
                      labelId="specific-customers-label"
                      multiple
                      input={<OutlinedInput label="Select Customers" />}
                    >
                      <MenuItem value="1">John Smith</MenuItem>
                      <MenuItem value="2">Sarah Johnson</MenuItem>
                      <MenuItem value="3">Robert Brown</MenuItem>
                      <MenuItem value="4">Emily Davis</MenuItem>
                    </Select>
                  </FormControl>
                )}
                
                {recipientType === 'filter' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Investment Type</InputLabel>
                        <Select label="Investment Type">
                          <MenuItem value="sip">SIP Investors</MenuItem>
                          <MenuItem value="lumpsum">Lumpsum Investors</MenuItem>
                          <MenuItem value="both">Both</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Registration Date</InputLabel>
                        <Select label="Registration Date">
                          <MenuItem value="last7">Last 7 days</MenuItem>
                          <MenuItem value="last30">Last 30 days</MenuItem>
                          <MenuItem value="last90">Last 90 days</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel>KYC Status</InputLabel>
                        <Select label="KYC Status">
                          <MenuItem value="verified">Verified</MenuItem>
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="failed">Failed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Recipient Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Total Recipients:</Typography>
                    <Typography variant="body2" fontWeight="bold">245</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Estimated Delivery:</Typography>
                    <Typography variant="body2" fontWeight="bold">~2 minutes</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Communication Templates</Typography>
              <Button 
                variant="contained" 
                startIcon={<EmailIcon />}
              >
                Create New Template
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Manage your communication templates for emails, SMS, and notifications.
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {templates.map((template) => (
              <Grid item xs={12} md={4} key={template.id}>
                <Card>
                  <CardHeader
                    avatar={
                      template.type === 'email' ? 
                        <EmailIcon color="primary" /> : 
                        <SmsIcon color="secondary" />
                    }
                    title={template.name}
                    subheader={`${template.type.charAt(0).toUpperCase() + template.type.slice(1)} Template`}
                    action={
                      <Chip 
                        label={`Last used: ${template.lastUsed}`} 
                        size="small" 
                        variant="outlined"
                      />
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                      <Button size="small" color="primary">
                        Use
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Scheduled Communications</Typography>
              <Button 
                variant="contained" 
                startIcon={<ScheduleIcon />}
              >
                Schedule New
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              View and manage your scheduled communications.
            </Typography>
          </Box>
          
          <List>
            {scheduledCommunications.map((comm) => (
              <Paper key={comm.id} elevation={1} sx={{ mb: 2 }}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <Button size="small" sx={{ mr: 1 }}>Edit</Button>
                      <Button size="small" color="error">Cancel</Button>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    {getTypeIcon(comm.type)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={comm.title}
                    secondary={
                      <Box component="span">
                        <Typography component="span" variant="body2">
                          Scheduled for: {comm.scheduledFor}
                        </Typography>
                        <Chip 
                          size="small" 
                          label={comm.status} 
                          color={getStatusChipColor(comm.status) as any}
                          sx={{ ml: 2, textTransform: 'capitalize' }} 
                        />
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
            
            {scheduledCommunications.length === 0 && (
              <Typography>No scheduled communications found.</Typography>
            )}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Communication History</Typography>
            <Typography variant="body2" color="text.secondary">
              View past communications and their performance metrics.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Type"
                  value="all"
                  size="small"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="notification">Notification</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value="all"
                  size="small"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </TextField>
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
            </Grid>
          </Box>
          
          <Box sx={{ overflowX: 'auto' }}>
            <Typography color="text.secondary" sx={{ py: 10, textAlign: 'center' }}>
              Communication history will be displayed here.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CommunicationsPage; 