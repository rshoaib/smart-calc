'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Zap, Share2, Link2, Check } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blogService';
import type { BlogPost as BlogPostType } from '@/data/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | undefined | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    Promise.all([getPostBySlug(slug as string), getAllPosts()])
      .then(([found, all]) => {
        setPost(found);
        const others = all.filter((p) => p.slug !== slug);
        const sameCategory = others.filter((p) => p.category === found?.category);
        const different = others.filter((p) => p.category !== found?.category);
        setRelatedPosts([...sameCategory, ...different].slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div className="space-y-4 mt-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    redirect("/blog");
  }

  return (
    <>
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

        {/* Share Buttons */}
        <div className="flex items-center gap-3 py-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Share2 className="w-4 h-4" /> Share:
          </span>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
            {(() => {
                const lines = post.content.split('\n');
                const elements: React.ReactNode[] = [];
                let i = 0;
                while (i < lines.length) {
                    const line = lines[i];
                    if (line.trim().startsWith('|')) {
                        const tableLines: string[] = [];
                        while (i < lines.length && lines[i].trim().startsWith('|')) {
                            tableLines.push(lines[i]);
                            i++;
                        }
                        const parseRow = (row: string) => row.split('|').filter(c => c.trim() !== '').map(c => c.trim());
                        const headers = parseRow(tableLines[0]);
                        const dataRows = tableLines.slice(2).map(parseRow);
                        elements.push(
                            <div key={i} className="overflow-x-auto my-6">
                                <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-indigo-50 dark:bg-indigo-900/30">
                                            {headers.map((h, hi) => (
                                                <th key={hi} className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">{parseContent(h)}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRows.map((row, ri) => (
                                            <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                                                {row.map((cell, ci) => (
                                                    <td key={ci} className="px-4 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">{parseContent(cell)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                        continue;
                    }
                    if (line.startsWith('### ')) {
                        elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100">{line.replace('### ', '')}</h3>);
                    } else if (line.startsWith('## ')) {
                        elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{line.replace('## ', '')}</h2>);
                    } else if (line.startsWith('> ')) {
                        elements.push(
                            <blockquote key={i} className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800/50 py-2 pr-2 rounded-r">
                                {parseContent(line.replace('> ', ''))}
                            </blockquote>
                        );
                    } else if (line.startsWith('- ')) {
                        elements.push(
                            <div key={i} className="flex gap-2 ml-4 mb-2">
                               <span className="text-indigo-600 font-bold">•</span>
                               <span>{parseContent(line.replace('- ', ''))}</span>
                            </div>
                        );
                    } else if (line.trim().match(/^\d+\. /)) {
                        elements.push(
                            <div key={i} className="flex gap-2 ml-4 mb-2">
                               <span className="text-indigo-600 font-bold">{line.split(' ')[0]}</span>
                               <span>{parseContent(line.replace(/^\d+\. /, ''))}</span>
                            </div>
                        );
                    } else if (line.trim() === '') {
                        elements.push(<div key={i} className="h-4"></div>);
                    } else {
                        elements.push(<p key={i} className="leading-7 mb-4 text-gray-700 dark:text-gray-300">{parseContent(line)}</p>);
                    }
                    i++;
                }
                return elements;
            })()}
        </article>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Read Next</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(next => (
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

function parseContent(text: string) {
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts = text.split(linkRegex);
  if (parts.length === 1) return parseBold(text);

  const elements: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
      if (parts[i]) {
          elements.push(<span key={`text-${i}`}>{parseBold(parts[i])}</span>);
      }
      if (i + 1 < parts.length) {
          const linkText = parts[i + 1];
          const linkUrl = parts[i + 2];
          elements.push(
              <Link key={`link-${i}`} href={linkUrl} className="text-indigo-600 font-bold hover:underline">
                  {parseBold(linkText)}
              </Link>
          );
      }
  }
  return elements;
}

function parseBold(text: string): React.ReactNode {
    const boldParts = text.split(/(\*\*.*?\*\*)/);
    return boldParts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        const italicParts = part.split(/(\*[^*]+?\*)/);
        if (italicParts.length === 1) return part;
        return italicParts.map((seg, j) => {
            if (seg.startsWith('*') && seg.endsWith('*') && seg.length > 2) {
                return <em key={`${i}-${j}`} className="italic">{seg.slice(1, -1)}</em>;
            }
            return seg;
        });
    });
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://dailysmartcalc.com/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const btnBase = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors";

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-black text-white hover:bg-gray-800`}
      >
        𝕏 Post
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-blue-700 text-white hover:bg-blue-800`}
      >
        LinkedIn
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-green-600 text-white hover:bg-green-700`}
      >
        WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className={`${btnBase} ${copied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
      >
        {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Link2 className="w-3.5 h-3.5" /> Copy Link</>}
      </button>
    </div>
  );
}
