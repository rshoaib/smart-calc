import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimeToMillionaireCalculator from '../TimeToMillionaireCalculator';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ComposedChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Line: () => null,
  Area: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe('TimeToMillionaireCalculator', () => {
  it('renders correctly', () => {
    render(<TimeToMillionaireCalculator />);
    expect(screen.getByText('home.tools.millionaire.name')).toBeInTheDocument();
  });

  it('calculates the correct time to millionaire', () => {
    render(<TimeToMillionaireCalculator />);

    // Default values: Balance $25,000, Monthly $1,000, Return 8%
    // Verify default result is present (needs precise check or calculation)
    // Let's change inputs to something simple.
    // 0 balance, 0 monthly -> Infinite
    
    const balanceInput = screen.getByLabelText('forms.labels.current_balance');
    fireEvent.change(balanceInput, { target: { value: '0' } });
    
    const contributionInput = screen.getByLabelText('forms.labels.monthly_contrib');
    fireEvent.change(contributionInput, { target: { value: '0' } });

    expect(screen.getByText('It will take over 100 years. Try increasing your contributions.')).toBeInTheDocument();

    // Now set realistic values
    // Balance 500k, Monthly 5k, Return 0% -> Need 500k more -> 100 months (8.3 years)
    fireEvent.change(balanceInput, { target: { value: '500000' } });
    fireEvent.change(contributionInput, { target: { value: '5000' } });
    const returnInput = screen.getByLabelText('forms.labels.annual_interest');
    fireEvent.change(returnInput, { target: { value: '0' } });

    // 8 years and 4 months
    expect(screen.getByText('8')).toBeInTheDocument(); 
    expect(screen.getByText('results.years')).toBeInTheDocument();
  });
});
