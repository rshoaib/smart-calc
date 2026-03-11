'use client';

import { useState, useMemo } from 'react';
import { FileText, Copy, Trash2, ClipboardPaste } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

const WORDS_PER_MINUTE = 238;
const CHARACTERS_PER_MINUTE = 1000;

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.`;

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const charAll = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter((p) => p.trim().length > 0).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const readTimeSec = Math.ceil((words / WORDS_PER_MINUTE) * 60);
    const speakTimeSec = Math.ceil((charAll / CHARACTERS_PER_MINUTE) * 60);

    const formatTime = (totalSec: number) => {
      if (totalSec < 60) return `${totalSec}s`;
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    };

    return {
      charAll,
      charNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readTime: formatTime(readTimeSec),
      speakTime: formatTime(speakTimeSec),
    };
  }, [text]);

  const handleCopy = () => {
    if (text) navigator.clipboard.writeText(text);
  };

  const handlePaste = async () => {
    try {
      const pasted = await navigator.clipboard.readText();
      setText(pasted);
    } catch {
      // Permission denied or not supported
    }
  };

  const faqs = [
    {
      question: 'How is reading time calculated?',
      answer: `Reading time is estimated based on the average adult reading speed of ${WORDS_PER_MINUTE} words per minute (WPM), which is widely cited in research. Your actual speed may vary based on content complexity and familiarity.`,
    },
    {
      question: 'What counts as a word?',
      answer: 'A word is any sequence of non-whitespace characters separated by spaces, tabs, or newlines. For example, "hello-world" counts as one word, and hyphenated words are treated as a single word.',
    },
    {
      question: 'Is my text stored anywhere?',
      answer: 'No. All analysis is done entirely in your browser. Your text is never sent to any server and never stored. This tool is 100% private and offline-capable.',
    },
    {
      question: 'What is the Twitter/X character limit?',
      answer: 'Twitter/X allows up to 280 characters per post (for standard accounts). Use the "Characters (All)" counter to stay within the limit.',
    },
    {
      question: 'What is the LinkedIn post character limit?',
      answer: 'LinkedIn allows up to 3,000 characters for regular posts and up to 1,300 for connection invitations. Articles can be much longer (up to 125,000 characters).',
    },
    {
      question: 'How are paragraphs counted?',
      answer: 'A paragraph is counted as any block of text separated by one or more blank lines (newlines). A single unbroken block of text with no blank lines counts as one paragraph.',
    },
  ];

  const statCards = [
    { label: 'Words', value: stats.words.toLocaleString(), color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { label: 'Characters (All)', value: stats.charAll.toLocaleString(), color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Characters (No Spaces)', value: stats.charNoSpaces.toLocaleString(), color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { label: 'Sentences', value: stats.sentences.toLocaleString(), color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString(), color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Lines', value: stats.lines.toLocaleString(), color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <FileText className="w-8 h-8 text-violet-500" />
          Word &amp; Character Counter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Paste or type your text to instantly count words, characters, and estimate reading time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* Text Area */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="word-counter-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Text
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handlePaste}
                  title="Paste from clipboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  Paste
                </button>
                <button
                  onClick={handleCopy}
                  title="Copy text"
                  disabled={!text}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={() => setText('')}
                  title="Clear text"
                  disabled={!text}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              id="word-counter-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing, or paste your text here…"
              rows={12}
              className="w-full resize-y bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-200 text-sm leading-relaxed focus:ring-2 focus:ring-violet-500 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors"
            />
            <div className="mt-2 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
              <button
                onClick={() => setText(SAMPLE_TEXT)}
                className="hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                Try sample text →
              </button>
              <span>{stats.charAll.toLocaleString()} chars</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} rounded-2xl p-5 border border-transparent`}
              >
                <div className={`text-3xl font-bold font-mono tabular-nums ${card.color} mb-1`}>
                  {card.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Reading & Speaking Time */}
          <div className="bg-violet-600 dark:bg-violet-700 rounded-2xl shadow-lg p-8 text-white">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">📖 Read Time</div>
                <div className="text-4xl font-bold font-mono tabular-nums">{stats.readTime}</div>
                <div className="text-xs opacity-60 mt-1">at {WORDS_PER_MINUTE} WPM</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">🎙️ Speak Time</div>
                <div className="text-4xl font-bold font-mono tabular-nums">{stats.speakTime}</div>
                <div className="text-xs opacity-60 mt-1">at {CHARACTERS_PER_MINUTE} CPM</div>
              </div>
            </div>
          </div>

          {/* Platform Limits */}
          {stats.charAll > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📱 Platform Character Limits
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'Twitter / X Post', limit: 280, color: 'bg-sky-500' },
                  { name: 'LinkedIn Post', limit: 3000, color: 'bg-blue-600' },
                  { name: 'Instagram Caption', limit: 2200, color: 'bg-pink-500' },
                  { name: 'Facebook Post', limit: 63206, color: 'bg-blue-500' },
                  { name: 'SMS (single)', limit: 160, color: 'bg-green-500' },
                  { name: 'Meta Description (SEO)', limit: 160, color: 'bg-orange-500' },
                  { name: 'Page Title (SEO)', limit: 60, color: 'bg-amber-500' },
                ].map(({ name, limit, color }) => {
                  const pct = Math.min(100, (stats.charAll / limit) * 100);
                  const over = stats.charAll > limit;
                  return (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{name}</span>
                        <span className={`font-mono font-medium ${over ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {stats.charAll.toLocaleString()} / {limit.toLocaleString()}
                          {over && ' ⚠️'}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-violet-200 dark:border-violet-800">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-2xl border border-violet-100 dark:border-violet-800">
              <h3 className="font-semibold text-violet-900 dark:text-violet-100 mb-3">
                📏 Quick Reference
              </h3>
              <ul className="space-y-2 text-sm text-violet-800 dark:text-violet-200">
                <li><strong>Short article</strong> — ~500 words</li>
                <li><strong>Blog post</strong> — 1,000–2,500 words</li>
                <li><strong>Long-form SEO</strong> — 2,500+ words</li>
                <li><strong>Short story</strong> — 1k–7.5k words</li>
                <li><strong>Novella</strong> — 17.5k–40k words</li>
                <li><strong>Novel</strong> — 50k+ words</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                ✍️ Writing Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li>Aim for sentences under 20 words for readability.</li>
                <li>Short paragraphs (3–5 sentences) improve scannability.</li>
                <li>A 1,500-word article takes ~6 min to read.</li>
                <li>Keep meta descriptions under 160 characters.</li>
                <li>Keep page titles under 60 characters for SEO.</li>
              </ul>
            </div>
            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
