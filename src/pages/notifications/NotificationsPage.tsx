import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Button,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import {
  CheckCircle,
  Info,
  Warning,
  Error as ErrorIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { green, blue, orange, red, grey } from '@mui/material/colors';
import { format, formatDistanceToNow } from 'date-fns';
import PageHeader from '../../components/common/PageHeader';
import { Notification } from '../../components/common/NotificationPopover';

// Mock notifications data that matches the Notification interface
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Investment Completed',
    message: 'SIP investment of ₹10,000 for Priya Patel has been successfully processed',
    read: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minutes ago
  },
  {
    id: '2',
    type: 'info',
    title: 'New Customer Registered',
    message: 'Amit Singh has registered as a new customer',
    read: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() // 1 hour ago
  },
  {
    id: '3',
    type: 'warning',
    title: 'Payment Due',
    message: 'Upcoming SIP payment for Rahul Sharma is due in 2 days',
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
  },
  {
    id: '4',
    type: 'error',
    title: 'Transaction Failed',
    message: 'Lumpsum investment processing failed for Neha Gupta due to insufficient funds',
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: '5',
    type: 'success',
    title: 'Return Processed',
    message: 'Investment return of ₹15,000 has been credited to Vikram Mehta',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: '6',
    type: 'info',
    title: 'Document Updated',
    message: 'Rahul Sharma has updated their KYC documents',
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: '7',
    type: 'warning',
    title: 'Portfolio Alert',
    message: 'Market volatility affecting 3 of your customer portfolios',
    read: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: '8',
    type: 'info',
    title: 'System Update',
    message: 'The platform will undergo maintenance on Sunday, 5 PM IST',
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: '9',
    type: 'success',
    title: 'Goal Achieved',
    message: 'Customer Amit Singh has reached their investment goal of ₹5,00,000',
    read: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    id: '10',
    type: 'error',
    title: 'Account Locked',
    message: 'Multiple failed login attempts detected for user account admin@example.com',
    read: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
];

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
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const getIconForType = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle sx={{ color: green[500] }} />;
    case 'info':
      return <Info sx={{ color: blue[500] }} />;
    case 'warning':
      return <Warning sx={{ color: orange[500] }} />;
    case 'error':
      return <ErrorIcon sx={{ color: red[500] }} />;
    default:
      return <CircleIcon sx={{ color: grey[500] }} />;
  }
};

const getChipColorForType = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'success';
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [tabValue, setTabValue] = useState(0);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSelectedNotifications([]);
  };

  const handleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const handleSelectAll = () => {
    if (filteredNotifications.length === selectedNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleMarkAsRead = (ids: string[] = selectedNotifications) => {
    setNotifications(
      notifications.map(notification => 
        ids.includes(notification.id) 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  const handleDeleteNotifications = (ids: string[] = selectedNotifications) => {
    setNotifications(
      notifications.filter(notification => !ids.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const handleRefresh = () => {
    // In a real app, you would fetch the latest notifications here
    // For now, just reset to the mock data
    setNotifications(mockNotifications);
    setSelectedNotifications([]);
  };

  // Filter notifications based on current tab
  const filteredNotifications = notifications.filter(notification => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return !notification.read; // Unread
    if (tabValue === 2) return notification.read; // Read
    return true;
  });

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden'
    }}>
      <PageHeader
        title="Notifications"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Notifications' }
        ]}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        }
      />

      <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<MarkReadIcon />}
                disabled={selectedNotifications.length === 0}
                onClick={() => handleMarkAsRead()}
              >
                Mark as Read
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                disabled={selectedNotifications.length === 0}
                onClick={() => handleDeleteNotifications()}
              >
                Delete
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={handleSelectAll}
              >
                {filteredNotifications.length === selectedNotifications.length
                  ? 'Deselect All'
                  : 'Select All'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper 
        elevation={2} 
        sx={{ 
          width: '100%', 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="notification tabs"
            sx={{ px: 2 }}
          >
            <Tab label={`All (${notifications.length})`} id="notification-tab-0" />
            <Tab 
              label={`Unread (${notifications.filter(n => !n.read).length})`} 
              id="notification-tab-1" 
            />
            <Tab 
              label={`Read (${notifications.filter(n => n.read).length})`} 
              id="notification-tab-2" 
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ 
            height: 'calc(100vh - 350px)', 
            minHeight: '400px',
            overflow: 'auto' 
          }}>
            <NotificationList
              notifications={filteredNotifications}
              selectedNotifications={selectedNotifications}
              onSelect={handleSelectNotification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotifications}
            />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ 
            height: 'calc(100vh - 350px)', 
            minHeight: '400px',
            overflow: 'auto' 
          }}>
            <NotificationList
              notifications={filteredNotifications}
              selectedNotifications={selectedNotifications}
              onSelect={handleSelectNotification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotifications}
            />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ 
            height: 'calc(100vh - 350px)', 
            minHeight: '400px',
            overflow: 'auto' 
          }}>
            <NotificationList
              notifications={filteredNotifications}
              selectedNotifications={selectedNotifications}
              onSelect={handleSelectNotification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotifications}
            />
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  selectedNotifications: string[];
  onSelect: (id: string) => void;
  onMarkAsRead: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
}

const NotificationList = ({ 
  notifications, 
  selectedNotifications,
  onSelect,
  onMarkAsRead,
  onDelete
}: NotificationListProps) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications.map((notification) => (
        <Box key={notification.id}>
          <ListItem 
            alignItems="flex-start"
            secondaryAction={
              <Box>
                <Tooltip title="Mark as read">
                  <IconButton 
                    edge="end" 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={() => onMarkAsRead([notification.id])}
                    disabled={notification.read}
                  >
                    <MarkReadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    edge="end" 
                    size="small"
                    onClick={() => onDelete([notification.id])}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            sx={{ 
              py: 2,
              backgroundColor: selectedNotifications.includes(notification.id) 
                ? 'action.selected' 
                : notification.read 
                  ? 'transparent' 
                  : 'action.hover',
              '&:hover': {
                backgroundColor: selectedNotifications.includes(notification.id) 
                  ? 'action.selected' 
                  : 'action.hover',
                cursor: 'pointer'
              }
            }}
            onClick={() => onSelect(notification.id)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'background.paper' }}>
                {getIconForType(notification.type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="subtitle1" component="div" sx={{ mr: 1 }}>
                    {notification.title}
                  </Typography>
                  <Chip 
                    label={notification.type} 
                    color={getChipColorForType(notification.type) as any}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                  {!notification.read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        ml: 1
                      }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.primary">
                      {notification.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <Divider component="li" />
        </Box>
      ))}
    </List>
  );
};

export default NotificationsPage; 