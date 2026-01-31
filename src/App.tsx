import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Initialize GA
ReactGA.initialize('G-TJXN6009WN');

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}

function GlobalLanguageSync() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
}
import MortgageCalculator from './pages/finance/MortgageCalculator';
import InvestmentCalculator from './pages/finance/InvestmentCalculator';
import AutoLoanCalculator from './pages/finance/AutoLoanCalculator';
import RetirementCalculator from './pages/finance/RetirementCalculator';
import DebtPayoffPlanner from './pages/finance/DebtPayoffPlanner';
import BMICalculator from './pages/health/BMICalculator';
import CalorieCalculator from './pages/health/CalorieCalculator';
import MacroCalculator from './pages/health/MacroCalculator';
import TimeToMillionaireCalculator from './pages/finance/TimeToMillionaireCalculator';
import Privacy from './pages/Privacy';

// Placeholders handled by real components now

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <GlobalLanguageSync />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="finance/mortgage" element={<MortgageCalculator />} />
            <Route path="finance/investment" element={<InvestmentCalculator />} />
            <Route path="finance/loan" element={<AutoLoanCalculator />} />
            <Route path="finance/retirement" element={<RetirementCalculator />} />
            <Route path="finance/debt-payoff" element={<DebtPayoffPlanner />} />
            <Route path="finance/time-to-millionaire" element={<TimeToMillionaireCalculator />} />
            <Route path="health/bmi" element={<BMICalculator />} />
            <Route path="health/calories" element={<CalorieCalculator />} />
            <Route path="health/macro-split" element={<MacroCalculator />} />
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
