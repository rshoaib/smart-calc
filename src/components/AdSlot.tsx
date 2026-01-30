import { twMerge } from 'tailwind-merge';

interface AdSlotProps {
  className?: string;
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  label?: string;
}

// Toggle this to true when you are ready to show ads
const SHOW_ADS = false;

export function AdSlot({ className, slotId, label = 'Ad Space' }: AdSlotProps) {
  if (!SHOW_ADS) return null;

  return (
    <div
      className={twMerge(
        'flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden',
        className
      )}
    >
      <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">
        {label}
        {slotId && <span className="block text-[10px] opacity-70">ID: {slotId}</span>}
      </div>
    </div>
  );
}
