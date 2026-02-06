import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmergencyFundCalculator from '../EmergencyFundCalculator';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => key,
  }),
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  PieChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Pie: () => null,
  Cell: () => null,
  Tooltip: () => null,
}));

describe('EmergencyFundCalculator', () => {
  it('renders correctly', () => {
    render(<EmergencyFundCalculator />);
    expect(screen.getByText('home.tools.emergency.name')).toBeInTheDocument();
  });

  it('calculates target fund correctly', () => {
    render(<EmergencyFundCalculator />);
    // Default: Essential 2000, Optional 500 = 2500 monthly
    // Risk Medium = 6 months -> 15000 Target
    
    expect(screen.getByText('emergency.target_fund')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('$15,000'))).toBeInTheDocument();
  });

  it('updates risk level', () => {
    render(<EmergencyFundCalculator />);
    const lowRiskBtn = screen.getByText('emergency.risk.low');
    fireEvent.click(lowRiskBtn);
    
    // Risk Low = 3 months -> 7500 Target
    expect(screen.getByText((content) => content.includes('$7,500'))).toBeInTheDocument();
  });
});
