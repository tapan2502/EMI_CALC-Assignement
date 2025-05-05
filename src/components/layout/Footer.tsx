import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, bgcolor: 'background.paper' }}>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Loan Calculator App
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Powered by{' '}
          <Link
            color="inherit"
            href="https://v6.exchangerate-api.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ExchangeRate API
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;