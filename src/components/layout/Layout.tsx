import { useState, ReactNode, useEffect } from 'react';
import React from 'react';
import { 
  Box, 
  CssBaseline, 
  Container, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  Divider, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  useTheme,
  styled,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Popover,
  Paper,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SavingsIcon from '@mui/icons-material/Savings';
import EmailIcon from '@mui/icons-material/Email';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmationModal from '../common/ConfirmationModal';
import NotificationPopover, { Notification } from './NotificationPopover';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  text: string;
  path: string;
  icon: ReactNode;
  subMenus?: { text: string; path: string }[];
}

interface SidebarItemProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const SidebarItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<SidebarItemProps>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  boxShadow: active ? `0 4px 8px rgba(0, 0, 0, 0.2)` : 'none',
  borderLeft: active ? `4px solid ${theme.palette.primary.main}` : 'none',
  borderRight: active ? `4px solid ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
  },
}));

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [subMenuOpen, setSubMenuOpen] = useState<Record<string, boolean>>({});
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);
  const openNotifications = Boolean(notificationAnchorEl);
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'New customer signed up',
      message: 'Rahul Sharma has registered as a new customer.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'System update',
      message: 'System will be updated to version 2.0 tonight at 2 AM.',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Failed payment attempt',
      message: 'Customer ID #1098 had a failed payment attempt.',
      time: '6 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Server error',
      message: 'The file upload server is not responding.',
      time: '1 day ago',
      read: true
    }
  ]);

  // Close drawer on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Adjust drawer width based on screen size
  const drawerWidth = isMobile ? 280 : 260;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSubMenu = (text: string) => {
    setSubMenuOpen(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutModalOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Customers', path: '/customers', icon: <PeopleIcon /> },
    { 
      text: 'Investments', 
      path: '/investments', 
      icon: <SavingsIcon />,
      subMenus: [
        { text: 'SIP', path: '/investments/sip' },
        { text: 'Lumpsum', path: '/investments/lumpsum' }
      ]
    },
    { text: 'Customer Management', path: '/customer-management', icon: <PeopleIcon /> },
    { text: 'Communications', path: '/communications', icon: <EmailIcon /> },
    { text: 'Reports', path: '/reports', icon: <BarChartIcon /> },
    { text: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };
  
  const handleViewAllNotifications = () => {
    handleNotificationClose();
    // Navigate to notifications page
    navigate('/notifications');
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && !isMobile && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(0, 1),
            minHeight: '64px',
            '@media (max-width: 600px)': {
              minHeight: '56px',
              padding: theme.spacing(0, 1),
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ 
                display: { xs: isMobile ? 'none' : 'block', sm: 'block' },
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Simply Invest Admin
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Notification icon */}
            <NotificationPopover 
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
              onViewAll={handleViewAllNotifications}
            />
            
            {/* User profile */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleUserMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={openUserMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.firstName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openUserMenu}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            
              <MenuItem onClick={() => navigate('/settings')}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? 280 : drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: 'block', sm: 'block' }
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={isMobile ? handleDrawerClose : undefined}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            Simply Invest
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              {item.subMenus ? (
                // Item with submenus
                <>
                  <SidebarItem
                    active={location.pathname.startsWith(item.path)}
                    onClick={() => toggleSubMenu(item.text)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {subMenuOpen[item.text] ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </SidebarItem>
                  
                  {subMenuOpen[item.text] && (
                    <Box sx={{ pl: 2, pr: 1 }}>
                      {item.subMenus.map((subItem) => (
                        <SidebarItem
                          key={subItem.text}
                          active={location.pathname === subItem.path}
                          onClick={() => navigate(subItem.path)}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                ml: 1,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </SidebarItem>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                // Regular item without submenus
                <SidebarItem
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </SidebarItem>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open && !isMobile}>
        <DrawerHeader />
        <Container 
          maxWidth="xl" 
          sx={{ 
            mt: 2, 
            px: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            maxWidth: '100% !important',
            overflowX: 'hidden'
          }}
        >
          {children}
        </Container>
      </Main>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        open={logoutModalOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout from the application?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutModalOpen(false)}
        severity="info"
      />
    </Box>
  );
};

export default Layout; 