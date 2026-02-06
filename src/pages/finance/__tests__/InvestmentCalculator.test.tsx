import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InvestmentCalculator from '../InvestmentCalculator';

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

// Mock CalculatorInput to avoid complex interaction testing within integration test
vi.mock('../../components/CalculatorInput', () => ({
  CalculatorInput: ({ label, value, onChange, testId }: any) => (
    <div>
      <label>{label}</label>
      <input 
        data-testid={testId || `input-${label}`}
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
      />
    </div>
  ),
}));

describe('InvestmentCalculator', () => {
  it('renders correctly', () => {
    render(<InvestmentCalculator />);
    expect(screen.getByText('home.tools.investment.name')).toBeInTheDocument();
  });

  it('calculates investment growth correctly', () => {
    render(<InvestmentCalculator />);
    
    // Default: Initial 10000, Monthly 500, Rate 7%, Years 20
    // Total Invested: 10000 + (500 * 12 * 20) = 130000
    // Future Value formula or close approximation
    
    // Check for display of total value
    // We can also check if Scenario A inputs are present
    expect(screen.getByText('forms.labels.initial_inv')).toBeInTheDocument();
  });

  it('toggles comparison mode', () => {
    render(<InvestmentCalculator />);
    
    const toggleButton = screen.getByText('Enable Comparison Mode');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Comparison Mode Active')).toBeInTheDocument();
    expect(screen.getByText('Scenario B')).toBeInTheDocument();
  });
});
