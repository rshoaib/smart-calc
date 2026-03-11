// 2025 IRS Federal Income Tax Brackets (Taxes Filed in April 2026)

export type FilingStatus = 'single' | 'married_jointly';

export interface TaxBracket {
  rate: number;
  min: number;
  max: number | null;
}

export const STANDARD_DEDUCTION = {
  single: 15750,
  married_jointly: 31500,
};

export const SINGLE_BRACKETS_2025: TaxBracket[] = [
  { rate: 0.10, min: 0, max: 11925 },
  { rate: 0.12, min: 11926, max: 48475 },
  { rate: 0.22, min: 48476, max: 103350 },
  { rate: 0.24, min: 103351, max: 197300 },
  { rate: 0.32, min: 197301, max: 250525 },
  { rate: 0.35, min: 250526, max: 626350 },
  { rate: 0.37, min: 626351, max: null },
];

export const MARRIED_JOINTLY_BRACKETS_2025: TaxBracket[] = [
  { rate: 0.10, min: 0, max: 23850 },
  { rate: 0.12, min: 23851, max: 96950 },
  { rate: 0.22, min: 96951, max: 206700 },
  { rate: 0.24, min: 206701, max: 394600 },
  { rate: 0.32, min: 394601, max: 501050 },
  { rate: 0.35, min: 501051, max: 751600 },
  { rate: 0.37, min: 751601, max: null },
];

export interface TaxCalculationResult {
  grossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  totalTaxOwed: number;
  marginalRate: number;
  effectiveRate: number;
  netIncome: number;
  bracketsUsed: { rate: number; amountTaxable: number; taxOwed: number }[];
}

export function calculateFederalTaxes(grossIncome: number, status: FilingStatus): TaxCalculationResult {
  const deduction = STANDARD_DEDUCTION[status];
  const taxableIncome = Math.max(0, grossIncome - deduction);
  
  if (taxableIncome === 0) {
    return {
      grossIncome,
      standardDeduction: deduction,
      taxableIncome: 0,
      totalTaxOwed: 0,
      marginalRate: 0,
      effectiveRate: 0,
      netIncome: grossIncome,
      bracketsUsed: [],
    };
  }

  const brackets = status === 'single' ? SINGLE_BRACKETS_2025 : MARRIED_JOINTLY_BRACKETS_2025;
  let totalTax = 0;
  let currentTaxable = taxableIncome;
  let marginalRate = 0;
  const bracketsUsed: { rate: number; amountTaxable: number; taxOwed: number }[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const bracketSize = bracket.max ? (bracket.max - bracket.min + 1) : Infinity;
    
    // Determine how much of the income falls into this specific bracket
    const amountInThisBracket = Math.min(currentTaxable, bracketSize);

    if (amountInThisBracket > 0) {
      const taxForThisBracket = amountInThisBracket * bracket.rate;
      totalTax += taxForThisBracket;
      marginalRate = bracket.rate;
      
      bracketsUsed.push({
        rate: bracket.rate,
        amountTaxable: amountInThisBracket,
        taxOwed: taxForThisBracket,
      });

      currentTaxable -= amountInThisBracket;
    }

    if (currentTaxable <= 0) break;
  }

  return {
    grossIncome,
    standardDeduction: deduction,
    taxableIncome,
    totalTaxOwed: totalTax,
    marginalRate,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) : 0,
    netIncome: grossIncome - totalTax,
    bracketsUsed,
  };
}
