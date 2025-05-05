import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  LinearProgress,
  Grid
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LoanData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

interface AmortizationScheduleProps {
  loanData: LoanData;
}

interface PaymentRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

const AmortizationSchedule = ({ loanData }: AmortizationScheduleProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12); // Show 1 year by default

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const amortizationSchedule = useMemo(() => {
    if (!loanData.principal || !loanData.emi) return [];

    const { principal, interestRate, loanTerm, emi } = loanData;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTerm * 12;
    
    const schedule: PaymentRow[] = [];
    let balance = principal;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = emi - interestForMonth;
      balance -= principalForMonth;
      
      schedule.push({
        month,
        payment: emi,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        remainingBalance: Math.max(0, balance)
      });
      
      if (balance <= 0) break;
    }
    
    return schedule;
  }, [loanData]);

  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanData.principal, loanData.totalInterest],
        backgroundColor: ['#1976d2', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
  };

  if (!loanData.principal || !loanData.emi) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Please calculate a loan to view the amortization schedule.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle1" gutterBottom align="center">
              Payment Breakdown
            </Typography>
            <Box sx={{ height: 200 }}>
              <Doughnut data={chartData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Loan Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Principal</Typography>
                <Typography variant="body1">{formatCurrency(loanData.principal)}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Interest Rate</Typography>
                <Typography variant="body1">{loanData.interestRate}%</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Monthly Payment</Typography>
                <Typography variant="body1">{formatCurrency(loanData.emi)}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                <Typography variant="body1">{formatCurrency(loanData.totalInterest)}</Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Loan Progress</Typography>
              <LinearProgress 
                variant="determinate" 
                value={0} 
                sx={{ height: 8, borderRadius: 5, mt: 1 }} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">0%</Typography>
                <Typography variant="caption" color="text.secondary">100%</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.selected' }}>
              <TableCell>Month</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Principal</TableCell>
              <TableCell align="right">Interest</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.month} hover>
                  <TableCell component="th" scope="row">
                    {row.month}
                  </TableCell>
                  <TableCell align="right">{formatCurrency(row.payment)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.principalPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interestPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.remainingBalance)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[12, 24, 36, 60]}
        component="div"
        count={amortizationSchedule.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Months per page:"
      />
    </Box>
  );
};

export default AmortizationSchedule;