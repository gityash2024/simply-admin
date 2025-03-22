import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Investment } from '../../types';

interface InvestmentFormDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  investment?: Investment | null;
  loading?: boolean;
  investmentType: 'SIP' | 'LUMPSUM';
  title?: string;
  customers: { id: string; name: string }[];
}

const InvestmentFormDrawer: React.FC<InvestmentFormDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  investment,
  loading = false,
  investmentType,
  title,
  customers
}) => {
  const isEditing = !!investment;
  
  const initialValues = {
    customerId: investment?.customerId || '',
    amount: investment?.amount || '',
    startDate: investment ? new Date(investment.startDate).toISOString().split('T')[0] : '',
    endDate: investment?.endDate ? new Date(investment.endDate).toISOString().split('T')[0] : '',
    frequency: investment?.frequency || 'Monthly',
    duration: investment?.duration || '',
    status: investment?.status || 'Active'
  };
  
  // Validation schema
  const validationSchema = Yup.object().shape({
    customerId: Yup.string().required('Customer is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be a positive number'),
    startDate: Yup.date().required('Start date is required'),
    ...(investmentType === 'SIP' 
      ? {
          frequency: Yup.string().required('Frequency is required'),
          duration: Yup.number()
            .required('Duration is required')
            .positive('Duration must be a positive number')
            .integer('Duration must be a whole number')
        } 
      : {}),
    status: Yup.string().required('Status is required')
  });
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        investmentType: investmentType,
        ...(investment ? { _id: investment._id } : {})
      });
    },
    enableReinitialize: true
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { 
          width: { xs: '100%', sm: 500 },
          overflow: 'auto'
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {title || `${isEditing ? 'Edit' : 'Add'} ${investmentType === 'SIP' ? 'SIP' : 'Lumpsum'} Investment`}
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={formik.touched.customerId && Boolean(formik.errors.customerId)}>
              <InputLabel id="customer-label">Customer</InputLabel>
              <Select
                labelId="customer-label"
                id="customerId"
                name="customerId"
                value={formik.values.customerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Customer"
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.customerId && formik.errors.customerId && (
                <FormHelperText>{formik.errors.customerId as string}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="startDate"
              name="startDate"
              label={investmentType === 'SIP' ? "Start Date" : "Investment Date"}
              type="date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          {investmentType === 'SIP' && (
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.frequency && Boolean(formik.errors.frequency)}>
                  <InputLabel id="frequency-label">Frequency</InputLabel>
                  <Select
                    labelId="frequency-label"
                    id="frequency"
                    name="frequency"
                    value={formik.values.frequency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Frequency"
                  >
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Yearly">Yearly</MenuItem>
                  </Select>
                  {formik.touched.frequency && formik.errors.frequency && (
                    <FormHelperText>{formik.errors.frequency as string}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="duration"
                  name="duration"
                  label="Duration (Months)"
                  type="number"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.duration && Boolean(formik.errors.duration)}
                  helperText={formik.touched.duration && formik.errors.duration}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="endDate"
                  name="endDate"
                  label="End Date (Optional)"
                  type="date"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
          
          <Grid item xs={12}>
            <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <FormHelperText>{formik.errors.status as string}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isEditing ? 'Update' : 'Create'
            )}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default InvestmentFormDrawer; 