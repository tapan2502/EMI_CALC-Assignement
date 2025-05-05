# Loan Calculator with Currency Conversion

A modern, feature-rich loan calculator application built with React, Material UI, and real-time currency conversion capabilities. Calculate loan EMIs, view amortization schedules, and convert amounts between different currencies using live exchange rates.

![Loan Calculator Screenshot](https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🚀 Features

- **Loan EMI Calculation**
  - Calculate monthly EMI using standard financial formulas
  - Adjustable loan amount, interest rate, and term
  - Interactive sliders for easy input adjustment
  - Real-time calculation updates

- **Amortization Schedule**
  - Detailed monthly payment breakdown
  - Principal and interest split for each payment
  - Remaining balance tracking
  - Paginated view with customizable rows per page

- **Currency Conversion**
  - Real-time exchange rates from ExchangeRate API
  - Support for 160+ currencies
  - Live conversion of EMI and total payments
  - Interactive currency swap functionality

- **Exchange Rate Table**
  - Comprehensive list of available currencies
  - Search and filter capabilities
  - Paginated view for better performance
  - Regular rate updates

- **User Interface**
  - Modern Material UI design
  - Dark/Light mode toggle
  - Responsive layout for all screen sizes
  - Smooth animations and transitions
  - Error handling with fallback UI
  - Loading states and progress indicators

## 🛠️ Technologies Used

- React 18
- Material UI 5
- Vite
- TypeScript
- Axios
- Chart.js
- Lucide Icons
- ExchangeRate API

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/loan-calculator-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd loan-calculator-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your ExchangeRate API key:
   ```env
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

- `VITE_EXCHANGE_RATE_API_KEY`: Your ExchangeRate API key

### API Integration

The application uses the ExchangeRate API for currency conversion. You'll need to:

1. Sign up at [ExchangeRate-API](https://www.exchangerate-api.com)
2. Get your API key from the dashboard
3. Add the key to your `.env` file

## 📱 Usage

1. Enter loan details:
   - Principal amount
   - Interest rate
   - Loan term

2. View calculated results:
   - Monthly EMI
   - Total interest
   - Total payment

3. Check amortization schedule:
   - Monthly payment breakdown
   - Principal and interest components
   - Remaining balance

4. Convert currencies:
   - Select source and target currencies
   - View converted EMI and total amounts
   - Check current exchange rates

## 🎨 Customization

### Theme

The application supports both light and dark modes. The theme can be customized in `src/contexts/ThemeContext.tsx`.

### Styling

- Material UI components can be customized using the theme provider
- Additional styles can be added in `src/index.css`
- Component-specific styles are included in their respective files

## 🔍 Error Handling

The application includes:
- Input validation
- API error handling
- Fallback UI components
- Error boundary for crash recovery
- Network error detection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for various screen sizes
- Collapsible navigation on mobile
- Optimized layouts for different devices

## 🚀 Performance

- Optimized bundle size
- Lazy loading of components
- Memoized calculations
- Efficient state management
- Paginated data display

