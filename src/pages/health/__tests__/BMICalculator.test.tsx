import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BMICalculator from '../BMICalculator';

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
  PieChart: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Pie: () => null,
  Cell: () => null,
  Tooltip: () => null,
}));

describe('BMICalculator', () => {
  it('renders correctly', () => {
    render(<BMICalculator />);
    expect(screen.getByText('home.tools.bmi.name')).toBeInTheDocument();
  });

  it('calculates BMI correctly (Metric)', () => {
    render(<BMICalculator />);
    
    // Select Metric (default)
    const inputs = screen.getAllByRole('spinbutton');
    const heightInput = inputs[0]; // cm
    const weightInput = inputs[1]; // kg
    
    fireEvent.change(heightInput, { target: { value: '180' } });
    fireEvent.change(weightInput, { target: { value: '75' } });
    
    // Click Calculate
    const calcBtn = screen.getByText('common.calculate');
    fireEvent.click(calcBtn);
    
    // 75 / (1.8^2) = 23.1
    expect(screen.getByText('23.1')).toBeInTheDocument();
  });

  it('switches to Imperial units', () => {
    render(<BMICalculator />);
    
    const imperialBtn = screen.getByText((content) => content.includes('common.imperial'));
    fireEvent.click(imperialBtn);
    
    expect(screen.getByText('forms.labels.height_ft')).toBeInTheDocument();
  });
});
