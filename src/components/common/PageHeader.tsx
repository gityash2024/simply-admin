import { Box, Typography, Breadcrumbs, Link, Paper, IconButton, Tooltip } from '@mui/material';
import { Home as HomeIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  action?: React.ReactNode;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  showBackButton = false,
  action
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        backgroundColor: 'transparent',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {showBackButton && (
          <Tooltip title="Go back">
            <IconButton 
              onClick={() => navigate(-1)} 
              sx={{ mr: 1 }}
              size="small"
            >
              <BackIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link 
            component={RouterLink} 
            to="/" 
            color="inherit" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return isLast ? (
              <Typography color="text.primary" key={index}>
                {crumb.title}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={crumb.path || '#'}
                color="inherit"
                key={index}
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {crumb.title}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Box>
          <Typography variant="h5" component="h1" fontWeight="bold">
            {title}
          </Typography>
          
          {subtitle && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {action && (
          <Box>
            {action}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PageHeader; 