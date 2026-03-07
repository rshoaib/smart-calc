'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blogService';
import type { BlogPost } from '@/data/blog';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
              >
                <div className="flex gap-4 mb-3">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col">
                {post.image && (
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-44">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
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
        )}
      </div>
    </>
  );
}
