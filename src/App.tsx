import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;