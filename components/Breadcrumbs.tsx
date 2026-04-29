import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    name: string;
    /** Pathname starting with `/`. Omit for the current page. */
    path?: string;
}

/**
 * Visible breadcrumb trail. Pair with `buildBreadcrumbJsonLd` to emit the
 * matching schema.org BreadcrumbList alongside the visible UI.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <ol className="flex flex-wrap items-center gap-1">
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <li key={`${item.name}-${idx}`} className="flex items-center gap-1">
                            {item.path && !isLast ? (
                                <Link
                                    href={item.path}
                                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="text-gray-700 dark:text-gray-300 font-medium" aria-current={isLast ? 'page' : undefined}>
                                    {item.name}
                                </span>
                            )}
                            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-400" aria-hidden />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
