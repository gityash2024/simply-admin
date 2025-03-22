import React, { useState } from 'react';
import { 
  Avatar, 
  Badge, 
  Box, 
  CircularProgress,
  Divider, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Popover, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatDistanceToNow } from 'date-fns';

// Notification type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface NotificationPopoverProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
}

export default function NotificationPopover({ 
  notifications = [], 
  onMarkAllAsRead,
  onViewAll
}: NotificationPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClearAll = () => {
    onMarkAllAsRead();
  };
  
  const handleViewAll = () => {
    onViewAll();
    handleClose();
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <InfoIcon fontSize="small" />;
      case 'success':
        return <CheckCircleIcon fontSize="small" />;
      case 'warning':
        return <WarningIcon fontSize="small" />;
      case 'error':
        return <ErrorIcon fontSize="small" />;
      default:
        return <InfoIcon fontSize="small" />;
    }
  };
  
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          mr: 1,
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
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
        sx={{
          mt: 1,
          '& .MuiPopover-paper': {
            width: isMobile ? '100%' : 320,
            maxWidth: isMobile ? '100%' : 320,
            maxHeight: isMobile ? 'calc(100% - 64px)' : 'unset',
            ...(isMobile ? { left: '0 !important', right: '0 !important' } : {}),
            borderRadius: isMobile ? 0 : 1,
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
            Notifications
          </Typography>
          {notifications.length > 0 && (
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ 
                cursor: 'pointer',
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }}
              onClick={handleClearAll}
            >
              Clear All
            </Typography>
          )}
        </Box>
        <Divider />
        <List 
          sx={{ 
            p: 0,
            maxHeight: isMobile ? 'calc(100vh - 170px)' : 400,
            overflowY: 'auto'
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress size={24} />
            </Box>
          ) : notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ 
                    px: 2, 
                    py: 1.5,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: getNotificationColor(notification.type), 
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: notification.read ? 400 : 600,
                          fontSize: isMobile ? '0.8rem' : '0.875rem'
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ 
                            display: 'block',
                            fontSize: isMobile ? '0.75rem' : '0.8125rem'
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ 
                            fontSize: isMobile ? '0.65rem' : '0.75rem' 
                          }}
                        >
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
        {notifications.length > 0 && (
          <>
            <Divider />
            <Box 
              sx={{ 
                p: 1, 
                display: 'flex', 
                justifyContent: 'center' 
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ 
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  p: 1
                }}
                onClick={handleViewAll}
              >
                View All Notifications
              </Typography>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
} 