import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CalorieCalculator from '../CalorieCalculator';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('CalorieCalculator', () => {
  it('renders correctly', () => {
    render(<CalorieCalculator />);
    expect(screen.getByText('home.tools.calorie.name')).toBeInTheDocument();
  });

  it('calculates calories', () => {
    render(<CalorieCalculator />);
    
    // Inputs (Defaults: Male, 30, 175cm, 75kg, 1.2)
    // Click calculate
    const calcBtn = screen.getByText('common.calculate');
    fireEvent.click(calcBtn);
    
    expect(screen.getByText('results.maintain_weight')).toBeInTheDocument();
    // Check for result presence (number + unit)
    expect(screen.getByText(/kcal\/day/)).toBeInTheDocument();
  });

  it('updates inputs', () => {
    render(<CalorieCalculator />);
    const inputs = screen.getAllByRole('spinbutton');
    // Change age
    fireEvent.change(inputs[0], { target: { value: '35' } });
    expect(inputs[0]).toHaveValue(35);
  });
});
