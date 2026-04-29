import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blogService';
import { buildBlogHeroSvg, type BlogCategory } from '@/lib/blogHeroSvg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartCalc Blog - Personal Finance & Health Guides',
  description: 'Real stories and practical guides to help you master your money and health. Expert deep-dives on mortgages, investing, and wellness.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'SmartCalc Blog - Personal Finance & Health Guides',
    description: 'Real stories and practical guides to help you master your money and health.',
    url: 'https://dailysmartcalc.com/blog',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCalc Blog',
    description: 'Personal finance and health guides - written for normal humans.',
    images: ['/og-image.png'],
  },
};

// Re-read content/blog/*.md at most once per minute, so newly added markdown
// posts appear without requiring a full rebuild.
export const revalidate = 60;

export default async function BlogList() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            SmartCalc Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Real stories and practical guides to help you master your money and health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-44">
                <div
                  className="w-full h-full hover:scale-105 transition-transform duration-300"
                  dangerouslySetInnerHTML={{
                    __html: buildBlogHeroSvg({
                      slug: post.slug,
                      category: post.category as BlogCategory,
                      title: post.title,
                    }),
                  }}
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-1">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline mt-auto"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
