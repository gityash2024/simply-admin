import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon, Warning as WarningIcon } from '@mui/icons-material';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: 'warning' | 'error' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  severity = 'warning'
}) => {
  const colors = {
    warning: {
      bg: '#fff7e6',
      border: '#ffbd59',
      color: '#ff9800'
    },
    error: {
      bg: '#fef2f2',
      border: '#f87171',
      color: '#ef4444'
    },
    info: {
      bg: '#f0f7ff',
      border: '#90caf9',
      color: '#2196f3'
    }
  };

  const getIcon = () => {
    switch(severity) {
      case 'error':
        return <WarningIcon sx={{ color: colors.error.color, fontSize: 40 }} />;
      case 'info':
        return <WarningIcon sx={{ color: colors.info.color, fontSize: 40 }} />;
      default:
        return <WarningIcon sx={{ color: colors.warning.color, fontSize: 40 }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onCancel}
          size="small"
          sx={{
            color: 'text.secondary',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            bgcolor: colors[severity].bg,
            borderRadius: 1,
            mb: 2
          }}
        >
          {getIcon()}
          <DialogContentText color="textPrimary" sx={{ m: 0 }}>
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="inherit"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={severity === 'error' ? 'error' : severity === 'info' ? 'primary' : 'warning'}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal; 