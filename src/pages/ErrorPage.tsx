import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <AlertTriangle size={80} color="#ff9800" />
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Something Went Wrong
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '60%', mb: 4 }}>
          We're sorry, but there was an error processing your request. 
          Please try again later or contact support if the problem persists.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => window.location.reload()}
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Refresh Page
          </Button>
          
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;