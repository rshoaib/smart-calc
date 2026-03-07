import { ShieldAlert, Heart } from 'lucide-react';

interface DisclaimerProps {
  type: 'finance' | 'health' | 'general';
}

export function Disclaimer({ type }: DisclaimerProps) {
  const isFinance = type === 'finance';
  return (
    <div className={`mb-6 p-3 rounded-lg border text-xs flex items-start gap-2 ${
      isFinance
        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
        : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400'
    }`}>
      {isFinance ? <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <Heart className="w-4 h-4 flex-shrink-0 mt-0.5" />}
      <p>
        {isFinance
          ? 'This calculator is for informational purposes only and does not constitute financial advice. Results are estimates based on inputs you provide. Consult a qualified financial advisor before making financial decisions.'
          : 'This calculator is for informational purposes only and does not constitute medical advice. Results are estimates based on general formulas. Consult a qualified healthcare professional before making health decisions.'}
      </p>
    </div>
  );
}
