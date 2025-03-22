import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (scheduleData: any) => void;
}

const ScheduleModal = ({ open, onClose, onSubmit }: ScheduleModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    notifyBefore: '15',
    recurring: false,
    recurrencePattern: 'daily'
  });
  
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    date: false,
    time: false
  });
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for the field being updated
    if (field in errors) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };
  
  const handleSubmit = () => {
    // Validate form
    const newErrors = {
      title: !formData.title,
      description: !formData.description,
      date: !formData.date,
      time: !formData.time
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean)) {
      return; // Stop if there are errors
    }
    
    // Combine date and time for a full datetime
    const fullDateTime = new Date(`${formData.date}T${formData.time}`);
    
    const finalScheduleData = {
      ...formData,
      fullDateTime
    };
    
    // Submit data
    if (onSubmit) {
      onSubmit(finalScheduleData);
    }
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          mt: { xs: 7, sm: 0 }, // Add top margin on mobile to avoid overlapping with AppBar
          height: isMobile ? 'calc(100% - 56px)' : 'auto', // Adjust height to account for AppBar
          maxHeight: isMobile ? 'calc(100% - 56px)' : '90vh',
          borderRadius: isMobile ? 0 : 1
        }
      }}
    >
      <DialogTitle>Schedule Event</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Event Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            helperText={errors.title ? 'Title is required' : ''}
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
            helperText={errors.description ? 'Description is required' : ''}
          />
          
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              error={errors.date}
              helperText={errors.date ? 'Date is required' : ''}
            />
            
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              error={errors.time}
              helperText={errors.time ? 'Time is required' : ''}
            />
          </Box>
          
          <FormControl fullWidth>
            <InputLabel>Notify Before</InputLabel>
            <Select
              value={formData.notifyBefore}
              label="Notify Before"
              onChange={(e) => handleChange('notifyBefore', e.target.value)}
            >
              <MenuItem value="5">5 minutes</MenuItem>
              <MenuItem value="15">15 minutes</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="60">1 hour</MenuItem>
              <MenuItem value="1440">1 day</MenuItem>
            </Select>
          </FormControl>
          
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.recurring}
                  onChange={(e) => handleChange('recurring', e.target.checked)}
                />
              }
              label="Recurring Event"
            />
            
            {formData.recurring && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Recurrence Pattern</InputLabel>
                <Select
                  value={formData.recurrencePattern}
                  label="Recurrence Pattern"
                  onChange={(e) => handleChange('recurrencePattern', e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal; 