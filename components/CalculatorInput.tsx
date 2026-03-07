'use client';

import React from 'react';

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  step?: string | number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}

export function CalculatorInput({
  label,
  value,
  onChange,
  icon: Icon,
  step = '1',
  min,
  max,
  prefix,
  suffix,
  helpText,
}: CalculatorInputProps) {
  // Determine if icon is a renderable component (function or ForwardRef) vs already-rendered JSX
  let iconElement: React.ReactNode = null;
  if (Icon) {
    if (React.isValidElement(Icon)) {
      iconElement = Icon;
    } else if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon.$$typeof)) {
      iconElement = React.createElement(Icon, { className: 'w-4 h-4' });
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {iconElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
            {iconElement}
          </div>
        )}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={String(step)}
          min={min}
          max={max}
          className={`w-full ${iconElement || prefix ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
