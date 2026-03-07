import Link from 'next/link';
import React from 'react';

export interface ToolCardProps {
  title?: string;
  name?: string;
  description: string;
  to?: string;
  path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color?: string;
  bg?: string;
}

export function ToolCard({ title, name, description, to, path, icon: Icon, color, bg }: ToolCardProps) {
  const displayTitle = title || name || '';
  const href = to || path || '/';

  // Render icon: detect if it's a renderable component (function or ForwardRef object) vs already-rendered JSX
  let iconElement: React.ReactNode = null;
  if (React.isValidElement(Icon)) {
    // Already a JSX element like <DollarSign />
    iconElement = Icon;
  } else if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null && Icon.$$typeof)) {
    // A component reference (function component or ForwardRef)
    iconElement = React.createElement(Icon, { className: 'w-6 h-6' });
  }

  return (
    <Link
      href={href}
      className="group block bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className={`${color || 'text-primary-500'} ${bg || ''} p-2 rounded-xl group-hover:scale-110 transition-transform`}>
          {iconElement}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {displayTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
