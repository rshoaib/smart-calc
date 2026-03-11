'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Timer, Play, Pause, RefreshCw, Settings, CheckCircle } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function PomodoroTimer() {
  const { t } = useTranslation();

  // Settings
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(4);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break' | 'longBreak'>('focus');
  const [cycles, setCycles] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Reset timer when settings change or mode changes
    if (!isActive) {
        if (mode === 'focus') setTimeLeft(focusTime * 60);
        if (mode === 'break') setTimeLeft(breakTime * 60);
        if (mode === 'longBreak') setTimeLeft(longBreakTime * 60);
    }
  }, [focusTime, breakTime, longBreakTime, mode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Timer finished
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    playNotificationSound();
    
    if (mode === 'focus') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % cyclesBeforeLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(longBreakTime * 60);
      } else {
        setMode('break');
        setTimeLeft(breakTime * 60);
      }
    } else {
      // Break over, back to focus
      setMode('focus');
      setTimeLeft(focusTime * 60);
    }
  };

  const playNotificationSound = () => {
    // Simple beep using AudioContext or Audio element if file exists
    // Using a system beep is tricky in browser. 
    // We'll try to play a data URI beep or just rely on title blink
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 500);
    } catch (e) {
        console.error("Audio play failed", e);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(focusTime * 60);
    else if (mode === 'break') setTimeLeft(breakTime * 60);
    else setTimeLeft(longBreakTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalSeconds = mode === 'focus' ? focusTime * 60 : (mode === 'break' ? breakTime * 60 : longBreakTime * 60);
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const faqs = [
    { question: 'What is the Pomodoro Technique?', answer: 'The Pomodoro Technique is a time management method invented by Francesco Cirillo in the late 1980s. You work in 25-minute focused sessions ("pomodoros," named after his tomato-shaped kitchen timer) followed by 5-minute breaks. After 4 pomodoros, take a longer 15-30 minute break. The method trains your brain to focus intensely in short bursts and rest deliberately.' },
    { question: 'Why does the Pomodoro Technique work?', answer: 'It works by leveraging several cognitive principles: it creates urgency (a ticking timer), reduces the psychological barrier to starting (committing to "just 25 minutes"), prevents burnout with regular breaks, and fights Parkinson\'s Law (work expands to fill available time). Research shows the brain focuses optimally in 20-50 minute intervals before needing rest.' },
    { question: 'Can I change the timer duration?', answer: 'Yes! While the traditional Pomodoro is 25 minutes, many people customize it. Popular variations include 50/10 (used by many professionals), 90/20 (matching ultradian rhythms), or 15/3 for highly fragmented work. Experiment to find your optimal ratio. The key principle is consistent focused work periods followed by deliberate rest, regardless of the exact duration.' },
    { question: 'What should I do during Pomodoro breaks?', answer: 'Step away from your screen. Effective break activities include stretching, walking, deep breathing, getting a drink, or looking out a window (the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds). Avoid checking social media or email — these are cognitively demanding and do not let your brain rest. Long breaks can include a short walk or a snack.' },
    { question: 'Is the Pomodoro Technique good for all types of work?', answer: 'It works best for tasks requiring sustained concentration: writing, coding, studying, data analysis. It is less suited for collaborative work with frequent interruptions or creative brainstorming sessions that need flow states. For creative work, try longer intervals (50-90 minutes). For administrative tasks, shorter intervals (15 minutes) may be more effective.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Timer className={`w-8 h-8 ${mode === 'focus' ? 'text-red-500' : 'text-green-500'}`} />
          {t('pomodoro.title', 'Pomodoro Timer')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mode === 'focus' ? t('pomodoro.focus_msg', 'Time to focus!') : t('pomodoro.break_msg', 'Time for a break!')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center relative overflow-hidden">
             {/* Progress Bar Background */}
             <div className="absolute top-0 left-0 h-2 bg-gray-100 dark:bg-gray-700 w-full">
                <div 
                    className={`h-full transition-all duration-1000 ${mode === 'focus' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${getProgress()}%` }}
                ></div>
             </div>

            <div className="mb-8 mt-4">
                <div className={`text-9xl font-bold font-mono tracking-tighter tabular-nums ${
                    mode === 'focus' ? 'text-gray-900 dark:text-white' : 'text-green-600 dark:text-green-400'
                }`}>
                {formatTime(timeLeft)}
                </div>
                <div className="mt-2 text-sm uppercase tracking-widest font-semibold text-gray-500">
                    {mode === 'focus' ? 'Focus Session' : (mode === 'break' ? 'Short Break' : 'Long Break')}
                </div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={toggleTimer}
                    className={`px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform active:scale-95 ${
                        isActive 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200' 
                        : (mode === 'focus' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600')
                    }`}
                >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    {isActive ? t('common.pause', 'Pause') : t('common.start', 'Start')}
                </button>
                <button
                    onClick={resetTimer}
                    className="px-6 py-4 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                    <RefreshCw className="w-6 h-6" />
                </button>
            </div>

            <div className="flex justify-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4" />
                <span>Completed Cycles: <strong>{cycles}</strong></span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-900 dark:text-white">
                <Settings className="w-5 h-5 text-gray-500" />
                {t('pomodoro.settings', 'Timer Settings')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Focus Time (min)</label>
                    <input 
                        type="number" 
                        value={focusTime}
                        onChange={(e) => setFocusTime(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Break (min)</label>
                    <input 
                        type="number" 
                        value={breakTime}
                        onChange={(e) => setBreakTime(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Long Break (min)</label>
                    <input 
                        type="number" 
                        value={longBreakTime}
                        onChange={(e) => setLongBreakTime(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sessions before Long Break</label>
                    <input 
                        type="number" 
                        value={cyclesBeforeLongBreak}
                        onChange={(e) => setCyclesBeforeLongBreak(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                </div>
            </div>
          </div>

          <AdSlot className="h-24 w-full" label="Pomodoro Bottom Ad" />
        </div>

        <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How it works</h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200 list-disc list-inside">
                        <li>Decide on the task to be done.</li>
                        <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
                        <li>Work on the task.</li>
                        <li>End work when the timer rings and take a short break (5 minutes).</li>
                        <li>Every 4 pomodoros, take a longer break (15-30 minutes).</li>
                    </ul>
                </div>
                <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
             </div>
        </div>
      </div>
    </div>
  );
}
