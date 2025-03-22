import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  IconButton,
  Divider,
  Paper,
  Button,
  Tooltip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Info,
  Warning,
  Error,
  Circle as CircleIcon
} from '@mui/icons-material';
import { green, blue, orange, red, grey } from '@mui/material/colors';

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'default';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPopoverProps {
  notifications: Notification[];
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
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
      return <Error sx={{ color: red[500] }} />;
    default:
      return <CircleIcon sx={{ color: grey[500] }} />;
  }
};

const getBackgroundColorForType = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return green[50];
    case 'info':
      return blue[50];
    case 'warning':
      return orange[50];
    case 'error':
      return red[50];
    default:
      return 'transparent';
  }
};

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  notifications,
  onMarkAllAsRead,
  onViewAll
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          size="large"
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 360,
            maxHeight: 480,
            overflowY: 'auto'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button 
              size="small" 
              color="primary" 
              onClick={() => {
                if (onMarkAllAsRead) onMarkAllAsRead();
                // Don't close the popover here to show the updated state
              }}
            >
              Mark all as read
            </Button>
          )}
        </Box>
        
        <Divider />
        
        {notifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="textSecondary">No notifications</Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications.map((notification) => (
                <ListItem 
                  key={notification.id}
                  alignItems="flex-start"
                  sx={{
                    py: 1.5,
                    backgroundColor: notification.read ? 'transparent' : getBackgroundColorForType(notification.type),
                    '&:hover': {
                      backgroundColor: notification.read ? 'rgba(0, 0, 0, 0.04)' : getBackgroundColorForType(notification.type),
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'background.paper' }}>
                      {getIconForType(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" component="div">
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          component="span"
                          sx={{ display: 'block', mb: 0.5 }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                        >
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                  {!notification.read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        alignSelf: 'center',
                        mr: 1
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
            
            <Divider />
            
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Button 
                fullWidth 
                onClick={() => {
                  if (onViewAll) onViewAll();
                  handleClose();
                }}
              >
                View All Notifications
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationPopover; 