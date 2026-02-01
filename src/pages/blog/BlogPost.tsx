import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, Zap } from 'lucide-react';
import { blogPosts } from '../../data/blog';
// import { useTranslation } from 'react-i18next';

export default function BlogPost() {
  const { slug } = useParams();
  // const { t } = useTranslation();
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple Markdown-ish to JSX parser for MVP
  // Replaces ## with h2, - with li, ** with strong
  // Ideally use 'react-markdown' library, but avoiding extra deps for now as per "Technology Stack" simplicity.
  // Actually, standard practice for "rich aesthetic" requests should probably include a parser, 
  // but let's do a clean visual render manually for these specific posts.
  
  return (
    <>
      <Helmet>
        <title>{post.title} - SmartCalc Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
             <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full font-medium">
                {post.category}
             </span>
             <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
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
                to={post.relatedToolLink}
                className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors shrink-0"
            >
                Open Calculator
            </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* 
               We will render the content by splitting on newlines and checking for markdown-like syntax.
               This is a lightweight "renderer" to avoid 'npm install react-markdown'.
            */}
            {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('- ')) {
                    // This is naive; it doesn't group ULs. But visually it works for simple lists.
                    return (
                        <div key={index} className="flex gap-2 ml-4">
                           <span className="text-indigo-600 font-bold">•</span>
                           <span>{parseBold(line.replace('- ', ''))}</span>
                        </div>
                    );
                }
                if (line.match(/^\d+\. /)) {
                     // Numbered list items
                     return (
                        <div key={index} className="flex gap-2 ml-4">
                           <span className="text-indigo-600 font-bold">{line.split(' ')[0]}</span>
                           <span>{parseBold(line.replace(/^\d+\. /, ''))}</span>
                        </div>
                     );
                }
                if (line.trim() === '') {
                    return <div key={index} className="h-4"></div>;
                }
                return <p key={index} className="leading-7">{parseBold(line)}</p>;
            })}
        </article>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Read Next</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(next => (
                    <Link key={next.id} to={`/blog/${next.slug}`} className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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

// Helper to bold text wrapped in **
function parseBold(text: string) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}
