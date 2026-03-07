'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, RotateCcw, Zap, Target, AlertCircle } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Technology is reshaping how we work, learn, and communicate every day. Embrace change and keep growing.",
  "In a world driven by innovation, staying curious is the greatest advantage you can have. Practice makes progress, not perfection. Keep pushing forward.",
  "Financial literacy empowers you to make smarter decisions about money the same way physical fitness empowers your body. Both require daily effort and discipline.",
  "Good software is like a good joke. It needs no explanation and brings a smile. Write code that humans can read, not just machines.",
  "The best time to plant a tree was twenty years ago. The second best time is now. Start building habits today that your future self will thank you for.",
];

export default function TypingSpeedTest() {
  const { t } = useTranslation();

  const [sampleText, setSampleText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Pick random text
  const pickText = useCallback(() => {
    const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(text);
    setUserInput('');
    setStatus('idle');
    setElapsedMs(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    pickText();
  }, [pickText]);

  const handleInputChange = (value: string) => {
    if (status === 'done') return;

    if (status === 'idle') {
      setStatus('running');
      const now = Date.now();
      setStartTime(now);
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - now);
      }, 100);
    }

    setUserInput(value);

    // Check completion
    if (value.length >= sampleText.length) {
      setStatus('done');
      setElapsedMs(Date.now() - startTime);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    pickText();
    inputRef.current?.focus();
  };

  // Stats
  const elapsedSec = elapsedMs / 1000;
  const elapsedMin = elapsedSec / 60;

  const wordsTyped = userInput.trim().split(/\s+/).filter(Boolean).length;
  const rawWpm = elapsedMin > 0 ? wordsTyped / elapsedMin : 0;

  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === sampleText[i]) correctChars++;
  }
  const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
  const netWpm = rawWpm * (accuracy / 100);
  const errors = userInput.length - correctChars;

  // Character coloring for typing display
  const renderSampleText = () => {
    return sampleText.split('').map((char, i) => {
      let className = 'text-gray-400 dark:text-gray-500'; // untyped
      if (i < userInput.length) {
        if (userInput[i] === char) {
          className = 'text-emerald-500 dark:text-emerald-400'; // correct
        } else {
          className = 'text-red-500 bg-red-100 dark:bg-red-900/30 rounded'; // incorrect
        }
      } else if (i === userInput.length) {
        className = 'text-gray-900 dark:text-white bg-cyan-100 dark:bg-cyan-900/40 rounded animate-pulse'; // cursor
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  const getWpmLabel = (wpm: number) => {
    if (wpm >= 80) return t('typing.speed_pro', '🏆 Professional');
    if (wpm >= 60) return t('typing.speed_fast', '🚀 Above Average');
    if (wpm >= 40) return t('typing.speed_avg', '✅ Average');
    if (wpm >= 20) return t('typing.speed_learning', '📖 Learning');
    return t('typing.speed_beginner', '🌱 Beginner');
  };

  const faqs = [
    { question: 'What is a good typing speed?', answer: 'The average typing speed is 40-45 WPM for adults. 60+ WPM is above average, 80+ WPM is considered professional-level, and 100+ WPM puts you in the top 5% of typists. Professional transcriptionists typically maintain 75-90 WPM with 98%+ accuracy. Court reporters using stenograph machines reach 200-300 WPM.' },
    { question: 'How is WPM calculated?', answer: 'WPM (Words Per Minute) uses a standardized "word" of 5 characters (including spaces). Gross WPM = (total characters typed / 5) / time in minutes. Net WPM accounts for errors: Net WPM = Gross WPM − (uncorrected errors / time in minutes). Most typing tests report Net WPM because it balances speed with accuracy.' },
    { question: 'How can I improve my typing speed?', answer: 'Practice touch typing: keep fingers on the home row (ASDF JKL;), memorize which finger hits each key, and never look at the keyboard. Focus on accuracy first — speed follows naturally. Practice 15-30 minutes daily with deliberate exercises. Most people gain 10-20 WPM within 2-4 weeks of consistent practice. Use programs like Keybr, TypeRacer, or MonkeyType.' },
    { question: 'Does keyboard type matter for typing speed?', answer: 'Yes, significantly. Mechanical keyboards with lighter switches (e.g., Cherry MX Red, 45g actuation) allow faster typing than heavy membrane keyboards. Key travel distance, actuation point, and tactile feedback all affect speed and comfort. Low-profile and split ergonomic keyboards can reduce fatigue during long typing sessions. However, the biggest factor is always technique, not equipment.' },
    { question: 'Why is typing speed important for my career?', answer: 'Faster typing directly increases productivity for knowledge workers. At 40 WPM vs 80 WPM, you spend half the time on emails, reports, and documentation. For programmers, fast typing means faster iteration and less friction between thinking and code. Studies estimate that improving typing speed by 20 WPM saves the average office worker 35+ hours per year.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Keyboard className="w-8 h-8 text-pink-500" />
          {t('typing.title', 'Typing Speed Test')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('typing.subtitle', 'Start typing to begin. Your WPM and accuracy are tracked in real time.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Sample Text Display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="font-mono text-lg leading-relaxed tracking-wide select-none mb-6 min-h-[80px]">
              {renderSampleText()}
            </div>

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={status === 'done'}
              placeholder={status === 'idle' ? t('typing.placeholder', 'Start typing here...') : ''}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl font-mono text-base focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-60"
              rows={3}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                {t('typing.new_test', 'New Test')}
              </button>

              {status !== 'idle' && (
                <span className="text-sm text-gray-500 font-mono tabular-nums">
                  {elapsedSec.toFixed(1)}s
                </span>
              )}
            </div>
          </div>

          {/* Done Banner */}
          {status === 'done' && (
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white text-center">
              <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">
                {t('typing.complete', 'Test Complete!')}
              </div>
              <div className="text-6xl font-bold mb-1">{Math.round(netWpm)} WPM</div>
              <div className="text-pink-100 text-sm">{getWpmLabel(netWpm)}</div>
            </div>
          )}

          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Sidebar: Live Stats */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                {t('typing.live_stats', 'Live Stats')}
              </h3>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Zap className="w-4 h-4 text-yellow-500" /> WPM
                </span>
                <span className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                  {Math.round(netWpm)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Target className="w-4 h-4 text-emerald-500" /> {t('typing.accuracy', 'Accuracy')}
                </span>
                <span className={`font-bold text-xl ${accuracy >= 95 ? 'text-emerald-500' : accuracy >= 80 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {accuracy.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <AlertCircle className="w-4 h-4 text-red-400" /> {t('typing.errors', 'Errors')}
                </span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{errors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('typing.raw_wpm', 'Raw WPM')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{Math.round(rawWpm)}</span>
              </div>

              {/* Progress */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{t('typing.progress', 'Progress')}</span>
                  <span>{Math.min(Math.round((userInput.length / sampleText.length) * 100), 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 transition-all duration-300"
                    style={{ width: `${Math.min((userInput.length / sampleText.length) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-2xl border border-pink-100 dark:border-pink-800">
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                {t('typing.benchmarks', '⌨️ Speed Benchmarks')}
              </h3>
              <ul className="space-y-1 text-sm text-pink-800 dark:text-pink-200">
                <li>🌱 Beginner: &lt;20 WPM</li>
                <li>📖 Learning: 20–40 WPM</li>
                <li>✅ Average: 40–60 WPM</li>
                <li>🚀 Above Avg: 60–80 WPM</li>
                <li>🏆 Pro: 80+ WPM</li>
              </ul>
            </div>

            <AdSlot className="h-[250px] w-full" label="Result Sidebar Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
