import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  Button
} from '@mui/material';
import {
  ContactMail as ContactIcon,
  Verified as VerifiedIcon,
  Assignment as TaskIcon,
  LocalShipping as DeliveryIcon,
  Group as GroupIcon,
  SupportAgent as SupportIcon
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';

const CustomerManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for customer management tasks
  const pendingTasks = [
    { id: 1, title: 'KYC verification pending', customer: 'John Smith', priority: 'high' },
    { id: 2, title: 'Address verification', customer: 'Sarah Johnson', priority: 'medium' },
    { id: 3, title: 'Document approval', customer: 'Robert Brown', priority: 'low' },
    { id: 4, title: 'Tax status update', customer: 'Emily Davis', priority: 'medium' }
  ];

  // Stats data
  const stats = [
    { title: 'Total Customers', value: 1248, icon: <GroupIcon color="primary" /> },
    { title: 'Pending KYC', value: 42, icon: <VerifiedIcon color="warning" /> },
    { title: 'Support Tickets', value: 17, icon: <SupportIcon color="error" /> },
    { title: 'Recent Registrations', value: 86, icon: <ContactIcon color="success" /> }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <PageHeader
        title="Customer Management"
        breadcrumbs={[
          { title: 'Dashboard', path: '/dashboard' },
          { title: 'Customer Management' }
        ]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Pending Tasks" 
              action={
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => console.log('View all tasks')}
                >
                  View All
                </Button>
              }
            />
            <Divider />
            <List>
              {pendingTasks.map((task) => (
                <ListItem key={task.id} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={task.title} 
                    secondary={`Customer: ${task.customer}`} 
                  />
                  <Chip 
                    label={task.priority} 
                    size="small" 
                    color={getPriorityColor(task.priority) as any}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </ListItem>
              ))}
              {pendingTasks.length === 0 && (
                <ListItem>
                  <ListItemText primary="No pending tasks" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ height: '100%' }}>
            <CardHeader 
              title="Customer Onboarding" 
              action={
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => console.log('View details')}
                >
                  Configure
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Onboarding Workflow Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: '70%', bgcolor: 'background.paper', mr: 1, borderRadius: 1 }}>
                  <Box
                    sx={{
                      width: '65%',
                      bgcolor: 'success.light',
                      height: 10,
                      borderRadius: 1
                    }}
                  />
                </Box>
                <Typography variant="body2">65% Complete</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Onboarding Steps
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <ContactIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Basic Information" secondary="Completed" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="KYC Verification" secondary="Completed" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DeliveryIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Document Delivery" secondary="In Progress" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TaskIcon color="disabled" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account Activation" secondary="Pending" />
                </ListItem>
              </List>
              
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={2}>
          <CardHeader title="Customer Management Tools" />
          <Divider />
          <CardContent>
            <Typography paragraph>
              The Customer Management module provides tools to manage the complete customer lifecycle,
              including onboarding, verification, and ongoing support. You can use these tools to:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>KYC Verification</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Validate customer identity documents and complete verification process.
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>Manage KYC</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>Tax Status Management</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update and verify customer tax status and exemption certificates.
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>Manage Tax Status</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>Document Management</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Handle customer documents, approvals and document delivery.
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>Manage Documents</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerManagementPage; 