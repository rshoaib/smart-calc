import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FireCalculator from '../FireCalculator';

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
  ReferenceLine: () => null,
}));

describe('FireCalculator', () => {
  it('renders correctly', () => {
    render(<FireCalculator />);
    expect(screen.getByText('home.tools.fire.name')).toBeInTheDocument();
  });

  it('calculates FIRE number correctly', () => {
    render(<FireCalculator />);
    
    // Default Spending: 45000, Withdrawal: 4.0%
    // Target = 45000 / 0.04 = 1,125,000
    expect(screen.getByText('$1,125,000')).toBeInTheDocument();
  });

  it('updates calculation when inputs change', () => {
    render(<FireCalculator />);
    
    // Change Spending to 50000
    const spendingInput = screen.getByLabelText('forms.labels.annual_spending');
    fireEvent.change(spendingInput, { target: { value: '40000' } });
    
    // New Target = 40000 / 0.04 = 1,000,000
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
  });
});
