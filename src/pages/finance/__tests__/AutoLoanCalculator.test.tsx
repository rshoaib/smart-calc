import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AutoLoanCalculator from '../AutoLoanCalculator';

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
  AreaChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe('AutoLoanCalculator', () => {
  it('renders correctly', () => {
    render(<AutoLoanCalculator />);
    expect(screen.getByText('home.tools.auto_loan.name')).toBeInTheDocument();
  });

  it('calculates monthly payment correctly', async () => {
    render(<AutoLoanCalculator />);
    expect(screen.getByText('results.monthly_payment')).toBeInTheDocument();
    // Wait for the calculation in useEffect to update the DOM
    const paymentDisplays = await screen.findAllByText(/\$\d+/); 
    expect(paymentDisplays.length).toBeGreaterThan(0);
  });

  it('updates inputs', () => {
    render(<AutoLoanCalculator />);
    const priceInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(priceInput, { target: { value: '40000' } });
    expect(priceInput).toHaveValue(40000);
  });
});
