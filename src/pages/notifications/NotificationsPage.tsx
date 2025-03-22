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
import PageHeader from '../../components/common/PageHeader';
import { Notification } from '../../components/layout/NotificationPopover';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Investment Completed',
    message: 'SIP investment of ₹10,000 for Priya Patel has been successfully processed',
    time: '10 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'New Customer Registered',
    message: 'Amit Singh has registered as a new customer',
    time: '1 hour ago',
    read: true
  },
  {
    id: '3',
    type: 'warning',
    title: 'Payment Due',
    message: 'Upcoming SIP payment for Rahul Sharma is due in 2 days',
    time: '3 hours ago',
    read: false
  },
  {
    id: '4',
    type: 'error',
    title: 'Transaction Failed',
    message: 'Lumpsum investment processing failed for Neha Gupta due to insufficient funds',
    time: '5 hours ago',
    read: true
  },
  {
    id: '5',
    type: 'success',
    title: 'Return Processed',
    message: 'Investment return of ₹15,000 has been credited to Vikram Mehta',
    time: '1 day ago',
    read: true
  },
  {
    id: '6',
    type: 'info',
    title: 'Document Updated',
    message: 'Rahul Sharma has updated their KYC documents',
    time: '2 days ago',
    read: true
  },
  {
    id: '7',
    type: 'warning',
    title: 'Portfolio Alert',
    message: 'Market volatility affecting 3 of your customer portfolios',
    time: '2 days ago',
    read: false
  },
  {
    id: '8',
    type: 'info',
    title: 'System Update',
    message: 'The platform will undergo maintenance on Sunday, 5 PM IST',
    time: '3 days ago',
    read: true
  },
  {
    id: '9',
    type: 'success',
    title: 'Goal Achieved',
    message: 'Customer Amit Singh has reached their investment goal of ₹5,00,000',
    time: '4 days ago',
    read: true
  },
  {
    id: '10',
    type: 'error',
    title: 'Account Locked',
    message: 'Multiple failed login attempts detected for user account admin@example.com',
    time: '5 days ago',
    read: false
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
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
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

      <Paper elevation={2} sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label="notification tabs"
            sx={{ px: 2 }}
          >
            <Tab label={`All (${notifications.length})`} id="notification-tab-0" aria-controls="notification-tabpanel-0" />
            <Tab 
              label={`Unread (${notifications.filter(n => !n.read).length})`} 
              id="notification-tab-1" 
              aria-controls="notification-tabpanel-1" 
            />
            <Tab 
              label={`Read (${notifications.filter(n => n.read).length})`} 
              id="notification-tab-2" 
              aria-controls="notification-tabpanel-2" 
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button 
              size="small" 
              onClick={handleSelectAll}
              sx={{ mr: 1 }}
            >
              {filteredNotifications.length === selectedNotifications.length ? 'Deselect All' : 'Select All'}
            </Button>
            <Typography variant="body2" color="text.secondary" component="span">
              {selectedNotifications.length} selected
            </Typography>
          </Box>
          <Box>
            {selectedNotifications.length > 0 && (
              <>
                <Button 
                  size="small" 
                  color="primary"
                  startIcon={<MarkReadIcon />}
                  onClick={() => handleMarkAsRead()}
                  sx={{ mr: 1 }}
                  disabled={selectedNotifications.every(id => 
                    notifications.find(n => n.id === id)?.read
                  )}
                >
                  Mark as Read
                </Button>
                <Button 
                  size="small" 
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteNotifications()}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>

        <Divider />

        <TabPanel value={tabValue} index={0}>
          <NotificationList 
            notifications={filteredNotifications} 
            selectedNotifications={selectedNotifications}
            onSelect={handleSelectNotification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotifications}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <NotificationList 
            notifications={filteredNotifications} 
            selectedNotifications={selectedNotifications}
            onSelect={handleSelectNotification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotifications}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <NotificationList 
            notifications={filteredNotifications} 
            selectedNotifications={selectedNotifications}
            onSelect={handleSelectNotification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotifications}
          />
        </TabPanel>

        {filteredNotifications.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications found</Typography>
          </Box>
        )}
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
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
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