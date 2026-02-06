import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MortgageCalculator from '../MortgageCalculator';

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

describe('MortgageCalculator', () => {
  it('renders correctly', () => {
    render(<MortgageCalculator />);
    expect(screen.getByText('home.tools.mortgage.name')).toBeInTheDocument();
  });

  it('calculates monthly payment correctly', () => {
    render(<MortgageCalculator />);
    
    // Default: Home 300k, Down 60k, Rate 6.5%, 30 years
    // Principal: 240,000
    // Monthly Payment check
    
    // We expect a specific value format (e.g. $1,517)
    // Finding by text content can be tricky with formatting, so looking for partial match or specific container
    expect(screen.getByText((content) => content.includes('$1,517'))).toBeInTheDocument();
  });

  it('updates calculations on input change', () => {
    render(<MortgageCalculator />);
    
    // Change home price
    const input = screen.getAllByRole('spinbutton')[0]; // First input likely home price
    fireEvent.change(input, { target: { value: '400000' } });
    
    // Verify payment changes
    // Principal 340,000 -> Payment roughly $2,149
     expect(screen.getByText((content) => content.includes('$2,149'))).toBeInTheDocument();
  });
});
