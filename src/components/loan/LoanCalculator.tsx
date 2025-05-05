import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Slider,
  Grid,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

interface LoanData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

interface LoanCalculatorProps {
  onCalculate: (data: LoanData) => void;
}

const LoanCalculator = ({ onCalculate }: LoanCalculatorProps) => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateEMI = () => {
    setIsCalculating(true);
    
    // Using setTimeout to show the loading state (for better UX)
    setTimeout(() => {
      try {
        // Convert annual interest rate to monthly rate (and from percentage to decimal)
        const monthlyRate = interestRate / 12 / 100;
        
        // Convert loan term from years to months
        const totalMonths = loanTerm * 12;
        
        // Apply EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                        (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        const totalPaymentValue = emiValue * totalMonths;
        const totalInterestValue = totalPaymentValue - principal;
        
        setEmi(emiValue);
        setTotalPayment(totalPaymentValue);
        setTotalInterest(totalInterestValue);
        
        // Send data to parent component
        onCalculate({
          principal,
          interestRate,
          loanTerm,
          emi: emiValue,
          totalPayment: totalPaymentValue,
          totalInterest: totalInterestValue,
        });
      } catch (error) {
        console.error('Error calculating EMI:', error);
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  // Calculate on initial load
  useEffect(() => {
    calculateEMI();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Calculator size={24} />
        <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
          Loan Calculator
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Loan Amount
          </Typography>
          <TextField
            fullWidth
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={18} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
          <Slider
            value={principal}
            onChange={(_, value) => setPrincipal(value as number)}
            min={1000}
            max={1000000}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCurrency(value)}
            sx={{ mt: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            Interest Rate (% per year)
          </Typography>
          <TextField
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Percent size={18} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
          <Slider
            value={interestRate}
            onChange={(_, value) => setInterestRate(value as number)}
            min={1}
            max={20}
            step={0.1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            sx={{ mt: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            Loan Term (years)
          </Typography>
          <TextField
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={18} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
          <Slider
            value={loanTerm}
            onChange={(_, value) => setLoanTerm(value as number)}
            min={1}
            max={30}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} ${value === 1 ? 'year' : 'years'}`}
            sx={{ mt: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateEMI}
            disabled={isCalculating}
            sx={{ 
              mt: 1, 
              py: 1.5,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover::after': {
                left: '100%',
              }
            }}
          >
            {isCalculating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Calculate EMI'
            )}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Divider>
          <Chip label="Results" color="primary" />
        </Divider>
      </Box>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ color: 'primary.main', fontWeight: 500 }}>
            {formatCurrency(emi)}
            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
              per month
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: 2, 
            borderRadius: 1, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            height: '100%'
          }}>
            <Typography variant="body2" color="text.secondary">
              Total Interest Payable
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {formatCurrency(totalInterest)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: 2, 
            borderRadius: 1, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            height: '100%'
          }}>
            <Typography variant="body2" color="text.secondary">
              Total Payment
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {formatCurrency(totalPayment)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanCalculator;