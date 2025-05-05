import { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Chip,
  Divider,
  InputAdornment,
  Fade
} from '@mui/material';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { Banknote, RefreshCcw } from 'lucide-react';

interface LoanData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

interface CurrencyConverterProps {
  loanData: LoanData;
}

const CurrencyConverter = ({ loanData }: CurrencyConverterProps) => {
  const { currencies, convertAmount, loading } = useContext(CurrencyContext);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedEmi, setConvertedEmi] = useState<number>(0);
  const [convertedTotal, setConvertedTotal] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Popular currencies to show at the top of the dropdown
  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  // Format currency values based on selected currency
  const formatCurrency = (value: number, currencyCode: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Sort currencies with popular ones at the top
  const sortedCurrencies = [...currencies].sort((a, b) => {
    const aIsPopular = popularCurrencies.includes(a.code);
    const bIsPopular = popularCurrencies.includes(b.code);
    
    if (aIsPopular && !bIsPopular) return -1;
    if (!aIsPopular && bIsPopular) return 1;
    return a.code.localeCompare(b.code);
  });

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCurrency(event.target.value);
  };

  const swapCurrencies = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
      setIsRefreshing(false);
    }, 300);
  };

  // Update converted values when currencies or loan data changes
  useEffect(() => {
    if (loanData.emi && !loading && currencies.length > 0) {
      setConvertedEmi(convertAmount(loanData.emi, fromCurrency, toCurrency));
      setConvertedTotal(convertAmount(loanData.totalPayment, fromCurrency, toCurrency));
    }
  }, [loanData, fromCurrency, toCurrency, currencies, loading, convertAmount]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Banknote size={24} />
        <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
          Currency Conversion
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="From Currency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            disabled={loading || currencies.length === 0}
            size="small"
          >
            {sortedCurrencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
          <Fade in={!isRefreshing} timeout={300}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                cursor: 'pointer',
                p: 1,
                borderRadius: '50%',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
              onClick={swapCurrencies}
            >
              <RefreshCcw size={24} />
            </Box>
          </Fade>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="To Currency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
            disabled={loading || currencies.length === 0}
            size="small"
          >
            {sortedCurrencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Divider>
          <Chip label="Converted Values" color="primary" />
        </Divider>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Monthly Payment
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body1">
                {formatCurrency(loanData.emi || 0, fromCurrency)}
              </Typography>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(convertedEmi, toCurrency)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total Payment
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body1">
                {formatCurrency(loanData.totalPayment || 0, fromCurrency)}
              </Typography>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(convertedTotal, toCurrency)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Exchange Rate"
          value={`1 ${fromCurrency} = ${convertAmount(1, fromCurrency, toCurrency).toFixed(4)} ${toCurrency}`}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <RefreshCcw size={16} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          disabled={loading || currencies.length === 0}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Exchange rates provided by ExchangeRate-API. Updated in real-time.
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrencyConverter;