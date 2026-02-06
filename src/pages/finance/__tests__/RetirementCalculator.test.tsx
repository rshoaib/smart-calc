import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RetirementCalculator from '../RetirementCalculator';

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
  ReferenceLine: () => null,
  Legend: () => null,
}));

// Mock Store
const mockUpdateProfile = vi.fn();
vi.mock('../../store/userStore', () => ({
  useUserStore: () => ({
    age: 30,
    retirementAge: 65,
    currentSavings: 10000,
    monthlyContribution: 500,
    updateProfile: mockUpdateProfile,
  }),
}));

describe('RetirementCalculator', () => {
  beforeEach(() => {
    mockUpdateProfile.mockClear();
  });

  it('renders correctly', () => {
    render(<RetirementCalculator />);
    expect(screen.getByText('home.tools.retirement.name')).toBeInTheDocument();
  });

  it('calculates projection', () => {
    render(<RetirementCalculator />);
    expect(screen.getByText(/total_savings/)).toBeInTheDocument();
    // Check for a currency value presence
    expect(screen.getByText(/\$\d{1,3}(,\d{3})*/)).toBeInTheDocument();
  });

  it('calls store update on save', () => {
    render(<RetirementCalculator />);
    const saveButton = screen.getByText('Save to Smart Profile');
    fireEvent.click(saveButton);
    expect(mockUpdateProfile).toHaveBeenCalled();
  });
});
