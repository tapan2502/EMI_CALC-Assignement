import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Circle as ErrorCircle } from 'lucide-react';

const NotFoundPage = () => {
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
        <ErrorCircle size={80} color="#f44336" />
        
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 700, color: 'text.secondary', mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '60%', mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the home page.
        </Typography>
        
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
    </Container>
  );
};

export default NotFoundPage;