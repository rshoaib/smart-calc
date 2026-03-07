'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, DollarSign, Clock, Play, Pause, RefreshCw, AlertTriangle } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function MeetingCostCalculator() {
  const { t } = useTranslation();

  // Inputs
  const [attendees, setAttendees] = useState(5);
  const [avgHourlyCost, setAvgHourlyCost] = useState(50);
  const [durationMinutes, setDurationMinutes] = useState(60);

  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Static results
  const costPerMinute = (attendees * avgHourlyCost) / 60;
  const totalStaticCost = costPerMinute * durationMinutes;
  const costPerSecond = costPerMinute / 60;
  const liveCost = costPerSecond * elapsedSeconds;

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const faqs = [
    { question: 'How much does a meeting actually cost?', answer: 'The direct cost equals (number of attendees × average hourly cost) × meeting duration in hours. A 1-hour meeting with 10 people at $50/hr costs $500. But the true cost is higher — include context-switching time (15-23 minutes to regain deep focus after a meeting) and opportunity cost of productive work not done. Harvard estimates unnecessary meetings cost U.S. companies $37 billion annually.' },
    { question: 'What is fully-loaded employee cost?', answer: 'Fully-loaded cost includes base salary + benefits (health insurance, 401k match), payroll taxes (FICA, unemployment), overhead (office space, equipment, software licenses), and training. It is typically 1.25× to 1.4× the base salary. A $60K/year employee may actually cost the company $75K-$84K, or $36-$40/hour.' },
    { question: 'How can I reduce meeting costs?', answer: 'Use the "Two Pizza Rule" (if you need more than two pizzas to feed the group, there are too many people). Shorten meetings to 25 or 50 minutes instead of 30/60. Require an agenda or the meeting is cancelled. Use async communication (Slack, Loom, docs) instead. Start with the question "could this be an email?" Studies show 71% of meetings are considered unproductive.' },
    { question: 'What is the opportunity cost of meetings?', answer: 'Every hour in a meeting is an hour not spent on deep work, client delivery, or creative problem-solving. Research shows knowledge workers lose an average of 31 hours per month in unproductive meetings. For a software engineer earning $120K/year, that is roughly $2,200/month in lost productivity — before counting the ripple effect on project timelines.' },
    { question: 'How do I calculate if a meeting was worth it?', answer: 'After the meeting, ask: did it produce a clear decision, action item, or information that could not have been shared asynchronously? Divide the total meeting cost (attendees × hourly cost × duration) by the value of the outcome. If a $500 meeting saved a $5,000 mistake, the ROI is 10×. If it produced nothing actionable, the ROI is zero.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-orange-500" />
          {t('meeting_cost.title', 'Meeting Cost Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('meeting_cost.subtitle', 'Discover the true cost of your meetings — in real time.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Inputs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <DollarSign className="w-5 h-5 text-orange-500" />
              {t('meeting_cost.details', 'Meeting Details')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <CalculatorInput
                label={t('meeting_cost.attendees', 'Attendees')}
                value={attendees}
                onChange={setAttendees}
                min={1}
                max={500}
                icon={Users}
                helpText={t('meeting_cost.attendees_help', 'Total number of people in the meeting.')}
              />
              <CalculatorInput
                label={t('meeting_cost.avg_cost', 'Avg. Hourly Cost ($)')}
                value={avgHourlyCost}
                onChange={setAvgHourlyCost}
                min={1}
                max={10000}
                step={5}
                icon={DollarSign}
                helpText={t('meeting_cost.avg_cost_help', 'Average fully-loaded cost per person per hour.')}
              />
              <CalculatorInput
                label={t('meeting_cost.duration', 'Duration (min)')}
                value={durationMinutes}
                onChange={setDurationMinutes}
                min={1}
                max={480}
                step={5}
                icon={Clock}
                helpText={t('meeting_cost.duration_help', 'Planned meeting length in minutes.')}
              />
            </div>
          </div>

          {/* Live Timer */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center relative overflow-hidden">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 h-2 bg-gray-100 dark:bg-gray-700 w-full">
              <div
                className="h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${Math.min((elapsedSeconds / (durationMinutes * 60)) * 100, 100)}%` }}
              />
            </div>

            <div className="mb-4 mt-2">
              <div className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-2">
                {t('meeting_cost.live_cost', 'Live Meeting Cost')}
              </div>
              <div className={`text-7xl md:text-8xl font-bold font-mono tracking-tighter tabular-nums transition-colors ${
                liveCost > totalStaticCost ? 'text-red-500' : 'text-gray-900 dark:text-white'
              }`}>
                {fmt(liveCost)}
              </div>
              <div className="mt-3 text-2xl font-mono tabular-nums text-gray-500">
                {formatTime(elapsedSeconds)}
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform active:scale-95"
                >
                  <Play className="w-6 h-6" />
                  {t('common.start', 'Start')}
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 transition-all shadow-md"
                >
                  <Pause className="w-6 h-6" />
                  {t('common.pause', 'Pause')}
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-6 py-4 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>

            {liveCost > totalStaticCost && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-semibold animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                {t('meeting_cost.over_budget', 'Meeting has exceeded its planned cost!')}
              </div>
            )}
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                {t('meeting_cost.static_cost', 'Planned Cost')}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('meeting_cost.total_cost', 'Total Meeting Cost')}</span>
                <span className="font-bold text-xl text-gray-900 dark:text-gray-100">{fmt(totalStaticCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('meeting_cost.per_minute', 'Cost / Minute')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{fmt(costPerMinute)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('meeting_cost.per_person', 'Cost / Person')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {fmt(attendees > 0 ? totalStaticCost / attendees : 0)}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                {t('meeting_cost.could_be_email', '📧 Could This Be an Email?')}
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {t(
                  'meeting_cost.email_tip',
                  'Studies show that 71% of meetings are considered unproductive. A quick email or async message could save your team thousands per week.'
                )}
              </p>
            </div>

            <AdSlot className="h-[250px] w-full" label="Result Sidebar Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
