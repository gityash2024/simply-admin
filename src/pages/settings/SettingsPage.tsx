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
  Security as SecurityIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
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

  return (
    <Box>
      <PageHeader
        title="Settings"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Settings' }
        ]}
      />

      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<SettingsIcon />} label="General" {...a11yProps(0)} />
            <Tab icon={<PersonIcon />} label="Account" {...a11yProps(1)} />
            <Tab icon={<SecurityIcon />} label="Security" {...a11yProps(2)} />
            <Tab icon={<NotificationsIcon />} label="Notifications" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* General Settings */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Application Settings" />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={true} name="darkMode" color="primary" />}
                      label="Dark Mode"
                    />
                    <FormControlLabel
                      control={<Switch checked={true} name="compactView" color="primary" />}
                      label="Compact View"
                    />
                    <FormControlLabel
                      control={<Switch checked={false} name="animations" color="primary" />}
                      label="Enable Animations"
                    />
                  </FormGroup>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={() => toast.success('Settings saved successfully')}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="System Information" />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    <strong>Version:</strong> 1.0.0
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Environment:</strong> Development
                  </Typography>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    System is up to date
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Account Settings */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Profile Information" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        defaultValue="Admin"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        defaultValue="User"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        defaultValue="admin@simplyinvest.com"
                        margin="normal"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        defaultValue="+91 9876543210"
                        margin="normal"
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
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Admin Information" />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    <strong>Role:</strong> Administrator
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Joined On:</strong> January 1, 2023
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Last Login:</strong> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                  </Typography>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Your account has full administrator privileges
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Settings */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Change Password" />
                <CardContent>
                  <form onSubmit={handlePasswordSubmit}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      variant="outlined"
                      margin="normal"
                      type="password"
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      margin="normal"
                      type="password"
                      name="new"
                      value={password.new}
                      onChange={handlePasswordChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      variant="outlined"
                      margin="normal"
                      type="password"
                      name="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Box sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardHeader title="Security Options" />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={true} name="twoFactor" color="primary" />}
                      label="Two-Factor Authentication"
                    />
                    <FormControlLabel
                      control={<Switch checked={true} name="loginNotification" color="primary" />}
                      label="Login Notifications"
                    />
                    <FormControlLabel
                      control={<Switch checked={false} name="passwordReset" color="primary" />}
                      label="Force Password Reset Every 90 Days"
                    />
                  </FormGroup>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={() => toast.success('Security settings updated successfully')}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Card elevation={1}>
            <CardHeader title="Notification Preferences" />
            <CardContent>
              <form onSubmit={handleNotificationSubmit}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.email}
                        onChange={handleNotificationChange}
                        name="email"
                        color="primary"
                      />
                    }
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.push}
                        onChange={handleNotificationChange}
                        name="push"
                        color="primary"
                      />
                    }
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.sms}
                        onChange={handleNotificationChange}
                        name="sms"
                        color="primary"
                      />
                    }
                    label="SMS Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.marketing}
                        onChange={handleNotificationChange}
                        name="marketing"
                        color="primary"
                      />
                    }
                    label="Marketing Notifications"
                  />
                </FormGroup>
                <Box sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default SettingsPage; 