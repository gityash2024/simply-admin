import { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  FormGroup,
  Card,
  CardContent,
  CardHeader,
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import InfoIcon from '@mui/icons-material/Info';

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [userProfile, setUserProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@simplyinvest.com',
    phone: '+91 9876543210'
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error('New password and confirm password do not match');
      return;
    }

    // In a real app, we would call an API here
    toast.success('Password updated successfully');
    setPassword({
      current: '',
      new: '',
      confirm: ''
    });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would call an API here
    toast.success('Notification settings updated successfully');
  };

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile({
      ...userProfile,
      [field]: value
    });
  };

  const handleSecurityChange = (field: string, value: boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value
    });
  };

  const handleSettingChange = (field: string, value: boolean) => {
    // Here you would update your settings state
    // For now we'll just show a success message
    toast.success(`${field} setting updated`);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden'
    }}>
      <PageHeader
        title="Settings"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Settings' }
        ]}
      />

      <Paper elevation={2} sx={{ mb: 3, width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
          >
            <Tab 
              icon={<SettingsIcon />} 
              iconPosition="start" 
              label="General" 
            />
            <Tab 
              icon={<AccountCircleIcon />} 
              iconPosition="start" 
              label="Account" 
            />
            <Tab 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              label="Security" 
            />
            <Tab 
              icon={<NotificationsIcon />} 
              iconPosition="start" 
              label="Notifications" 
            />
          </Tabs>
        </Box>
      </Paper>

      <Box sx={{ 
        flexGrow: 1, 
        width: '100%', 
        overflow: 'auto',
        height: 'calc(100vh - 250px)', 
        minHeight: '500px'
      }}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Application Settings
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={true} 
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      />
                    }
                    label="Dark Mode"
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={true} 
                        onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                      />
                    }
                    label="Compact View"
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={false} 
                        onChange={(e) => handleSettingChange('enableAnimations', e.target.checked)}
                      />
                    }
                    label="Enable Animations"
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={() => toast.success('Settings saved successfully')}
                  >
                    Save Settings
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  System Information
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Version:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        1.0.0
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Last Updated:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        22/03/2025
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Environment:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        Development
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                  <InfoIcon sx={{ color: 'info.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    System is up to date
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, width: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Profile Information
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={userProfile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={userProfile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={userProfile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={() => toast.success('Profile updated successfully')}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Admin Information
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Role:</strong> Administrator
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Joined On:</strong> January 1, 2023
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Last Login:</strong> 22/03/2025 16:25:34
                  </Typography>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Your account has full administrator privileges
                  </Alert>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, width: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Change Password
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      value={password.current}
                      onChange={handlePasswordChange}
                      name="current"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={password.new}
                      onChange={handlePasswordChange}
                      name="new"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      name="confirm"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handlePasswordSubmit}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, width: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Two-Factor Authentication
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={true} 
                        onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }}
                    disabled={!securitySettings.twoFactorEnabled}
                  >
                    Configure Two-Factor Authentication
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          
          <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Notification Preferences
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notifications.email} 
                      onChange={handleNotificationChange}
                      name="email"
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notifications.push} 
                      onChange={handleNotificationChange}
                      name="push"
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notifications.sms} 
                      onChange={handleNotificationChange}
                      name="sms"
                    />
                  }
                  label="SMS Notifications"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notifications.marketing} 
                      onChange={handleNotificationChange}
                      name="marketing"
                    />
                  }
                  label="Marketing Notifications"
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  onClick={handleNotificationSubmit}
                >
                  Save Preferences
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SettingsPage; 