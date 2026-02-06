import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OneRepMaxCalculator from '../OneRepMaxCalculator';

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
  BarChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Cell: () => null,
}));

describe('OneRepMaxCalculator', () => {
  it('renders correctly', () => {
    render(<OneRepMaxCalculator />);
    expect(screen.getByText('home.tools.orm.name')).toBeInTheDocument();
  });

  it('calculates 1RM correctly', () => {
    render(<OneRepMaxCalculator />);
    
    // Default: 100 lbs, 5 reps. Epley
    // 100 * (1 + 5/30) = 100 * 1.1666 = 117
    
    // Check for result "117"
    // Using findBy in case of component async/state delays although useEffect is sync-ish here, better safe
    expect(screen.getAllByText('117')[0]).toBeInTheDocument();
  });

  it('updates formula', () => {
    render(<OneRepMaxCalculator />);
    
    const formulaSelect = screen.getByRole('combobox');
    fireEvent.change(formulaSelect, { target: { value: 'brzycki' } });
    
    // 100 / (1.0278 - 0.0278 * 5) = 113
    expect(screen.getAllByText('113')[0]).toBeInTheDocument();
  });
});
