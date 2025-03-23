import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const LoginPage = () => {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
      // Navigation is handled in the useEffect above which will trigger when isAuthenticated changes
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: isMobile ? 3 : 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          width: '100%',
          maxWidth: '360px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: isMobile ? 40 : 48, height: isMobile ? 40 : 48 }}>
          <LockOutlinedIcon fontSize={isMobile ? "medium" : "large"} />
        </Avatar>
        <Typography component="h1" variant={isMobile ? "h5" : "h4"} sx={{ mb: 3, textAlign: 'center' }}>
          Sign in to Simply Invest
        </Typography>
        
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size={isMobile ? "small" : "medium"}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize={isMobile ? "small" : "medium"} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            size={isMobile ? "small" : "medium"}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    size={isMobile ? "small" : "medium"}
                  >
                    {showPassword ? <VisibilityOff fontSize={isMobile ? "small" : "medium"} /> : <Visibility fontSize={isMobile ? "small" : "medium"} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" size={isMobile ? "small" : "medium"} />}
            label={<Typography variant={isMobile ? "body2" : "body1"}>Remember me</Typography>}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={isMobile ? 20 : 24} /> : 'Sign In'}
          </Button>
        </Box>
      </Paper>
      <Typography
        variant={isMobile ? "caption" : "body2"}
        color="text.secondary"
        align="center"
        sx={{ 
          position: 'absolute',
          bottom: 16,
          width: '100%'
        }}
      >
        {'© '}
        <Link color="inherit" href="#">
          Simply Invest
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default LoginPage; 
               