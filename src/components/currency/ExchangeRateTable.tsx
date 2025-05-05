import { useState } from 'react';
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
  TextField,
  InputAdornment,
  CircularProgress,
  Chip
} from '@mui/material';
import { Search, Globe } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  rate: number;
}

interface ExchangeRateTableProps {
  currencies: Currency[];
  loading: boolean;
  error: string | null;
}

const ExchangeRateTable = ({ currencies, loading, error }: ExchangeRateTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filter currencies based on search term
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Globe size={20} />
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Exchange Rates
        </Typography>
        <Chip 
          label={currencies.length > 0 ? currencies[0].code : 'USD'} 
          size="small" 
          color="primary" 
          sx={{ ml: 1 }} 
        />
      </Box>

      <TextField
        fullWidth
        placeholder="Search currency..."
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.selected' }}>
              <TableCell>Code</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Exchange Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((currency) => (
                <TableRow key={currency.code} hover>
                  <TableCell component="th" scope="row">
                    <strong>{currency.code}</strong>
                  </TableCell>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell align="right">{currency.rate.toFixed(4)}</TableCell>
                </TableRow>
              ))}

            {filteredCurrencies.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  {searchTerm ? 'No currencies match your search.' : 'No exchange rate data available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredCurrencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ExchangeRateTable;