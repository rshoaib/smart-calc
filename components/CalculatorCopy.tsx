import { getCopyForPath } from '@/lib/calculatorCopy';

/**
 * Server-rendered editorial content beneath each calculator. Google indexes
 * it; users get a quick formula recap and worked example without leaving the
 * page. Pages without a copy entry render nothing.
 */
export function CalculatorCopy({ path }: { path: string }) {
    const copy = getCopyForPath(path);
    if (!copy) return null;

    return (
        <section className="mt-12 max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p className="lead">{copy.intro}</p>

            <h2>{copy.formulaHeading}</h2>
            <p>{copy.formulaBody}</p>

            <h2>{copy.useHeading}</h2>
            <p>{copy.useBody}</p>

            <h2>{copy.exampleHeading}</h2>
            <p>{copy.exampleBody}</p>
        </section>
    );
}
