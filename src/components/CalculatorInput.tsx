import type { LucideIcon } from 'lucide-react';

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: LucideIcon;
  step?: string;
  className?: string;
  placeholder?: string;
}

export function CalculatorInput({ 
  label, 
  value, 
  onChange, 
  icon: Icon, 
  step,
  className = "",
  placeholder
}: CalculatorInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all`}
        />
      </div>
    </div>
  );
}
