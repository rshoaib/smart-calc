import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import MortgageCalculator from './pages/finance/MortgageCalculator';
import InvestmentCalculator from './pages/finance/InvestmentCalculator';
import BMICalculator from './pages/health/BMICalculator';
import CalorieCalculator from './pages/health/CalorieCalculator';
import Privacy from './pages/Privacy';

// Placeholders handled by real components now

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="finance/mortgage" element={<MortgageCalculator />} />
            <Route path="finance/investment" element={<InvestmentCalculator />} />
            <Route path="health/bmi" element={<BMICalculator />} />
            <Route path="health/calories" element={<CalorieCalculator />} />
            <Route path="privacy" element={<Privacy />} />
            {/* Redirects to keep structure clean */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
