'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Disclaimer } from '@/components/Disclaimer';
import { Moon, Sun, Clock } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

interface SleepCycle {
  cycles: number;
  time: Date;
  duration: string;
  feeling: string;
  color: string;
}

export default function SleepCalculator() {
  const { t } = useTranslation();
  
  const [targetTime, setTargetTime] = useState<string>('07:00');
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake'); // 'wake' = I want to wake up at..., 'sleep' = I am going to bed at...
  const [results, setResults] = useState<SleepCycle[]>([]);

  const calculateCycles = () => {
    const cycleLength = 90; // minutes
    const fallingAsleepTime = 14; // average minutes for human to fall asleep
    
    // Parse input time
    const [hours, mins] = targetTime.split(':').map(Number);
    const baseTime = new Date();
    baseTime.setHours(hours);
    baseTime.setMinutes(mins);
    baseTime.setSeconds(0);
    
    // If calculating "When to wake up" (Sleep at...), we add cycles
    // If calculating "When to sleep" (Wake up at...), we subtract cycles
    
    const calculatedCycles: SleepCycle[] = [];
    
    // Calculate 3 to 6 cycles (4.5h to 9h)
    for (let c = 6; c >= 3; c--) {
        const cycleDate = new Date(baseTime);
        let totalMinutes = (c * cycleLength);
        
        if (mode === 'wake') {
            // "I want to wake up at X", so we subtract sleep time from X
            // We also need to account for falling asleep time? Usually user wants "When do I get IN bed"
            // So BedTime + 14min = SleepTime. SleepTime + Cycles = WakeTime.
            // WakeTime - Cycles = SleepTime. SleepTime - 14min = BedTime.
            totalMinutes += fallingAsleepTime;
            cycleDate.setMinutes(cycleDate.getMinutes() - totalMinutes);
        } else {
             // "I am going to bed at X", so we add sleep time to X
             // BedTime + 14min = SleepTime. SleepTime + Cycles = WakeTime.
             totalMinutes += fallingAsleepTime;
             cycleDate.setMinutes(cycleDate.getMinutes() + totalMinutes);
        }

        // Adjust for next day if needed (mostly visual, Date object handles it)
        // If 'wake' mode and result is previous day, or 'sleep' mode and result is next day.
        
        let feeling = t('sleep.feeling_groggy');
        let color = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
        
        if (c >= 5) {
            feeling = t('sleep.feeling_great');
            color = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
        } else if (c === 4) {
             feeling = t('sleep.feeling_good');
             color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
        } else if (c === 3) {
             feeling = t('sleep.feeling_ok');
             color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
        }

        calculatedCycles.push({
            cycles: c,
            time: cycleDate,
            duration: `${c * 1.5}h`,
            feeling,
            color
        });
    }

    setResults(calculatedCycles);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const faqs = [
    { question: 'How long is one sleep cycle?', answer: 'A complete sleep cycle lasts about 90 minutes and includes four stages: N1 (light sleep, 5%), N2 (true sleep, 45%), N3 (deep/slow-wave sleep, 25%), and REM (dreaming, 25%). Most adults need 5-6 complete cycles (7.5-9 hours) per night. Early-night cycles have more deep sleep, while later cycles have more REM.' },
    { question: 'What is the best time to go to sleep?', answer: 'The best bedtime depends on when you need to wake up. Count backward in 90-minute cycles from your wake time and add 14 minutes to fall asleep. For example, to wake at 7:00 AM: 5 cycles = 7.5 hours of sleep → fall asleep at 11:30 PM → get in bed at 11:16 PM. This calculator does this math for you.' },
    { question: 'Why do I wake up tired after 8 hours of sleep?', answer: 'You are likely waking in the middle of a deep sleep (N3) cycle, which causes sleep inertia — that groggy, disoriented feeling. Eight hours is 5.33 cycles, meaning your alarm hits mid-cycle. Try 7.5 hours (5 full cycles) or 9 hours (6 cycles) instead. The difference of 30 minutes can dramatically change how you feel.' },
    { question: 'How much sleep do I need by age?', answer: 'Newborns need 14-17 hours, toddlers 11-14, school children 9-11, teenagers 8-10, adults 7-9, and seniors 7-8 hours. These are total recommendations. Quality matters as much as quantity — uninterrupted sleep with proper deep sleep and REM phases is more restorative than fragmented sleep of the same duration.' },
    { question: 'Are naps good for you?', answer: 'Short naps of 20-30 minutes (a "power nap") can boost alertness and performance without causing sleep inertia. Naps of 90 minutes (one full cycle) are also effective because you wake from REM. Avoid 45-60 minute naps — you will wake from deep sleep and feel worse. Napping after 3 PM can interfere with nighttime sleep quality.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="health" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Moon className="w-8 h-8 text-indigo-500" />
          {t('sleep.title', 'Sleep Cycle Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('sleep.subtitle', 'Wake up feeling refreshed by syncing with your natural sleep cycles.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="w-5 h-5 text-indigo-500" />
              {t('forms.sections.inputs', 'Your Details')}
            </h2>

            <div className="space-y-6">
                <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => { setMode('wake'); setResults([]); }}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                            mode === 'wake' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        {t('sleep.i_want_to_wake', 'I want to wake at...')}
                    </button>
                    <button 
                        onClick={() => { setMode('sleep'); setResults([]); }}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                            mode === 'sleep' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        {t('sleep.i_am_sleeping', 'I am sleeping at...')}
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {mode === 'wake' ? t('sleep.wake_time', 'Wake Up Time') : t('sleep.bed_time', 'Bed Time')}
                    </label>
                    <input 
                        type="time" 
                        value={targetTime}
                        onChange={(e) => setTargetTime(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-lg font-mono focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                </div>

                <button
                    onClick={calculateCycles}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                    {t('common.calculate', 'Calculate Times')}
                </button>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
                {t('sleep.disclaimer', 'Note: The average human takes 14 minutes to fall asleep. This is included in the calculations.')}
            </div>
          </div>
          
          <AdSlot className="h-[300px] w-full" label="Sleep Ad" />
        </div>

        <div className="lg:col-span-2 space-y-6">
            {results.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                        {mode === 'wake' ? t('sleep.best_bedtimes', 'Best Times to Sleep') : t('sleep.best_waketimes', 'Best Times to Wake Up')}
                    </h2>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                        {results.map((cycle, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border border-transparent ${cycle.color} transition-transform hover:scale-[1.02]`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-3xl font-bold">{formatTime(cycle.time)}</span>
                                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 bg-white/50 rounded-lg">
                                        {cycle.cycles} Cycles
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium opacity-90">
                                    <span>{cycle.duration} sleep</span>
                                    <span>{cycle.feeling}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 text-center border-2 border-dashed border-indigo-200 dark:border-indigo-800 h-64 flex flex-col items-center justify-center">
                    <Moon className="w-12 h-12 text-indigo-300 mb-4" />
                    <p className="text-indigo-800 dark:text-indigo-200 font-medium">
                        {t('sleep.promt', 'Enter a time to see your optimal sleep schedule.')}
                    </p>
                </div>
            )}
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-orange-500" />
                    {t('sleep.why_matters', 'Why Sleep Cycles Matter')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Sleep consists of 90-minute cycles where brain activity fluctuates between deep sleep (NREM) and dreaming (REM). Waking up in the middle of a deep sleep cycle leads to grogginess (sleep inertia). Waking up at the end of a cycle ensures you feel refreshed and alert.
                </p>
            </div>
            
            <AdSlot className="h-24 w-full" label="Bottom Banner" />
        </div>
      </div>
    </div>
  );
}
