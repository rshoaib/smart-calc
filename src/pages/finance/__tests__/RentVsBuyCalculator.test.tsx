import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RentVsBuyCalculator from '../RentVsBuyCalculator';

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
  LineChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe('RentVsBuyCalculator', () => {
  it('renders correctly', () => {
    render(<RentVsBuyCalculator />);
    expect(screen.getByText('home.tools.rent_vs_buy.name')).toBeInTheDocument();
  });

  it('updates inputs and results', async () => {
    render(<RentVsBuyCalculator />);
    
    // Default: Home 400k, Rent 2000.
    // Check if breakeven point is displayed (initially likely buying is cheaper eventually)
    expect(screen.getByText('results.break_even_point')).toBeInTheDocument();
    
    // Test: Extremely high rent -> Buying should be cheaper VERY fast
    const rentInput = screen.getByLabelText('forms.labels.rent_monthly');
    fireEvent.change(rentInput, { target: { value: '10000' } });
    
    // Test: Extremely cheap rent -> Rent output should be favored
    fireEvent.change(rentInput, { target: { value: '1000' } }); // Use reasonable but low rent
    
    // We expect "Rent is cheaper for forever" or a very long time
    await waitFor(() => {
        expect(screen.getByText('results.renting_cheaper')).toBeInTheDocument();
    });
  });
});
