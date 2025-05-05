import { useState, useContext } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  Box
} from '@mui/material';
import LoanCalculator from '../components/loan/LoanCalculator';
import AmortizationSchedule from '../components/loan/AmortizationSchedule';
import CurrencyConverter from '../components/currency/CurrencyConverter';
import ExchangeRateTable from '../components/currency/ExchangeRateTable';
import { CurrencyContext } from '../contexts/CurrencyContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`loan-tabpanel-${index}`}
      aria-labelledby={`loan-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface LoanData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

const HomePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loanData, setLoanData] = useState<LoanData>({
    principal: 0,
    interestRate: 0,
    loanTerm: 0,
    emi: 0,
    totalPayment: 0,
    totalInterest: 0
  });
  const { currencies, loading, error } = useContext(CurrencyContext);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLoanCalculation = (data: LoanData) => {
    setLoanData(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Loan EMI Calculator with Currency Conversion
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Calculate your loan EMI, view amortization schedule, and see real-time currency conversions.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }
            }}
          >
            <LoanCalculator onCalculate={handleLoanCalculation} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              mb: 4,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CurrencyConverter loanData={loanData} />
          </Paper>

          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              mt: 4
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="loan information tabs"
              variant="fullWidth"
            >
              <Tab label="Amortization Schedule" />
              <Tab label="Exchange Rates" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <AmortizationSchedule loanData={loanData} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ExchangeRateTable 
                currencies={currencies} 
                loading={loading} 
                error={error} 
              />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;