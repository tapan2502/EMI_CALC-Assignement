import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Currency {
  code: string;
  name: string;
  rate: number;
}

interface CurrencyContextType {
  currencies: Currency[];
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  loading: boolean;
  error: string | null;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currencies: [],
  baseCurrency: 'USD',
  setBaseCurrency: () => {},
  loading: false,
  error: null,
  convertAmount: () => 0,
});

interface CurrencyProviderProps {
  children: ReactNode;
}

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
        );
        
        if (response.data.result === 'success') {
          const rates = response.data.conversion_rates;
          const currencyList: Currency[] = Object.keys(rates).map((code) => ({
            code,
            name: getCurrencyName(code),
            rate: rates[code],
          }));
          
          setCurrencies(currencyList);
          setError(null);
        } else {
          setError('Failed to fetch exchange rates');
        }
      } catch (err) {
        setError('Error fetching exchange rates. Please try again later.');
        console.error('Exchange rate API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (!currencies.length) return 0;
    
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    
    if (fromCurrency === baseCurrency) {
      return amount * toRate;
    } else if (toCurrency === baseCurrency) {
      return amount / fromRate;
    } else {
      // Convert through base currency
      const amountInBaseCurrency = amount / fromRate;
      return amountInBaseCurrency * toRate;
    }
  };

  // Helper function to get currency names
  const getCurrencyName = (code: string): string => {
    const currencyNames: Record<string, string> = {
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      INR: 'Indian Rupee',
      // Add more currency names as needed
    };
    
    return currencyNames[code] || code;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currencies, 
        baseCurrency, 
        setBaseCurrency, 
        loading, 
        error, 
        convertAmount 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};