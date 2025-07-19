import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Drawer, useTheme, useMediaQuery, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PrivacyModal() {
  const [open, setOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Check current analytics preference
    const consent = localStorage.getItem('cookie-consent');
    // Default to enabled if no explicit choice has been made
    setAnalyticsEnabled(consent === 'declined' ? false : true);

    // Listen for privacy modal open events
    const handleOpenModal = () => setOpen(true);
    window.addEventListener('openPrivacyModal', handleOpenModal);

    return () => {
      window.removeEventListener('openPrivacyModal', handleOpenModal);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setAnalyticsEnabled(true);
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setAnalyticsEnabled(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const privacyContent = (
    <>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          This website uses Google Analytics to understand how visitors interact with my site. 
          This helps me improve your experience.
        </Typography>
      
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
          <strong>What I collect:</strong>
          <br />• Page views and navigation patterns
          <br />• Device and browser information
          <br />• General location (country/city level)
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
          <strong>What I don't collect:</strong>
          <br />• Personal information (name, email, etc.)
          <br />• Precise location data
          <br />• Any data that identifies you personally
        </Typography>

      {analyticsEnabled !== null && (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 1,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <strong>Current Setting:</strong> Analytics {analyticsEnabled ? 'Enabled' : 'Disabled'}
          </Typography>
        </Box>
      )}
    </>
  );

  const actionButtons = (
    <Box sx={{ 
      display: 'flex', 
      gap: 2,
      flexDirection: isMobile ? 'column' : 'row',
      width: isMobile ? '100%' : 'auto'
    }}>
      <Button 
        onClick={handleDecline}
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          flex: isMobile ? 1 : 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        Disable Analytics
      </Button>
      <Button 
        onClick={handleAccept}
        variant="contained"
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#000',
          flex: isMobile ? 1 : 'none',
          '&:hover': {
            backgroundColor: 'white',
          }
        }}
      >
        Enable Analytics
      </Button>
    </Box>
  );

  // Mobile: Bottom Drawer
  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: 'none',
            maxHeight: '80vh',
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <Box sx={{ p: 3, pb: 4 }}>
          {/* Header with close button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6" sx={{ 
              color: 'white', 
              fontSize: '1.25rem',
              fontWeight: 500
            }}>
              Privacy & Analytics
            </Typography>
            <IconButton 
              onClick={handleClose}
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drag indicator */}
          <Box sx={{
            width: 40,
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
            mx: 'auto',
            mb: 3
          }} />

          {/* Content */}
          {privacyContent}
          
          {/* Actions */}
          <Box sx={{ mt: 3 }}>
            {actionButtons}
          </Box>
        </Box>
      </Drawer>
    );
  }

  // Desktop: Modal Dialog
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        color: 'white', 
        fontSize: '1.25rem',
        fontWeight: 500,
        pb: 1
      }}>
        Privacy & Analytics
      </DialogTitle>
      
      <DialogContent sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        {privacyContent}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        {actionButtons}
      </DialogActions>
    </Dialog>
  );
} 