import { createContext, useState, useMemo, ReactNode } from 'react';
import { createTheme, Theme, PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  theme: Theme;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  theme: createTheme(),
  toggleColorMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2', // Blue
          },
          secondary: {
            main: '#00bcd4', // Cyan
          },
          error: {
            main: '#f44336', // Red
          },
          warning: {
            main: '#ff9800', // Orange
          },
          info: {
            main: '#2196f3', // Light Blue
          },
          success: {
            main: '#4caf50', // Green
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 500 },
          h2: { fontWeight: 500 },
          h3: { fontWeight: 500 },
          h4: { fontWeight: 400 },
          h5: { fontWeight: 400 },
          h6: { fontWeight: 400 },
          subtitle1: { fontWeight: 400 },
          subtitle2: { fontWeight: 500 },
          body1: { fontWeight: 400 },
          body2: { fontWeight: 400 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'light' 
                  ? '0px 4px 20px rgba(0, 0, 0, 0.05)' 
                  : '0px 4px 20px rgba(0, 0, 0, 0.15)',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleColorMode: colorMode.toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};