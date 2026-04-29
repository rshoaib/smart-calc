import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Zap, Share2 } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blogService';
import { ShareButtons } from '@/components/ShareButtons';
import { MarkdownContent } from '@/components/MarkdownContent';
import { buildBlogHeroSvg, type BlogCategory } from '@/lib/blogHeroSvg';
import type { Metadata } from 'next';

// Match the index page: re-read markdown at most once per minute so newly
// added posts become reachable by URL without a full rebuild.
export const revalidate = 60;


// ---------- SEO: per-article metadata ----------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  // OG/Twitter cards need an absolute URL, not inline SVG. Serve the same
  // deterministic SVG over HTTP at /blog/<slug>/hero.svg (route handler co-located).
  const heroUrl = `https://dailysmartcalc.com/blog/${post.slug}/hero.svg`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://dailysmartcalc.com/blog/${post.slug}`,
      images: [{ url: heroUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [heroUrl],
    },
  };
}

// ---------- Page (Server Component) ----------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!post) notFound();

  // Build related posts list
  const others = allPosts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const different = others.filter((p) => p.category !== post.category);
  const relatedPosts = [...sameCategory, ...different].slice(0, 3);

  const heroSvg = buildBlogHeroSvg({
    slug: post.slug,
    category: post.category as BlogCategory,
    title: post.title,
  });

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: 'DailySmartCalc',
            },
            publisher: {
              '@type': 'Organization',
              name: 'DailySmartCalc',
              logo: {
                '@type': 'ImageObject',
                url: 'https://dailysmartcalc.com/favicon.svg',
              },
            },
            mainEntityOfPage: `https://dailysmartcalc.com/blog/${post.slug}`,
            image: `https://dailysmartcalc.com/blog/${post.slug}/hero.svg`,
          }),
        }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.displayDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div
          className="w-full h-auto aspect-[1200/630] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
          dangerouslySetInnerHTML={{ __html: heroSvg }}
        />

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              Try it yourself
            </h3>
            <p className="text-indigo-100 text-sm">
              Run your own numbers using the {post.relatedToolName}.
            </p>
          </div>
          <Link
            href={post.relatedToolLink}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors shrink-0"
          >
            Open Calculator
          </Link>
        </div>

        {/* Share Buttons (client component) */}
        <div className="flex items-center gap-3 py-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Share2 className="w-4 h-4" /> Share:
          </span>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </article>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Read Next</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((next) => (
              <Link key={next.id} href={`/blog/${next.slug}`} className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="text-xs text-gray-500 mb-1">{next.category}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{next.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}