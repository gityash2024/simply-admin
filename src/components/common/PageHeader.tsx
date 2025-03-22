import { Box, Typography, Breadcrumbs, Link, Paper, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 3, 
        backgroundColor: 'transparent',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 1,
        flexWrap: 'wrap',
        pt: { xs: 1, sm: 0 }
      }}>
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
        
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ 
            mb: 1,
            flexWrap: 'wrap',
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'wrap',
            },
            '& .MuiBreadcrumbs-li': {
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }
          }}
          maxItems={isMobile ? 2 : 4}
        >
          <Link 
            component={RouterLink} 
            to="/" 
            color="inherit" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return isLast ? (
              <Typography 
                color="text.primary" 
                key={index}
                sx={{ 
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  wordBreak: 'break-word',
                }}
              >
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
                  '&:hover': { textDecoration: 'underline' },
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  wordBreak: 'break-word',
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
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: isMobile && action ? 'column' : 'row', sm: 'row' },
        gap: { xs: 1, sm: 2 }
      }}>
        <Box sx={{ 
          maxWidth: action && isMobile ? '100%' : action ? '70%' : '100%',
          pr: 1
        }}>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            component="h1" 
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography
              variant={isMobile ? "body2" : "subtitle1"}
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {action && (
          <Box sx={{ 
            ml: { xs: 0, sm: 'auto' }, 
            mt: { xs: isMobile ? 1 : 0, sm: 0 },
            width: isMobile ? '100%' : 'auto'
          }}>
            {action}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PageHeader; 