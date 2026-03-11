'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Disclaimer } from '@/components/Disclaimer';
import { Heart, Activity, User } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';

interface HeartRateZone {
  zone: number;
  name: string;
  range: string;
  min: number;
  max: number;
  desc: string;
  color: string;
}

export default function HeartRateCalculator() {
  const { t } = useTranslation();

  // State
  const [age, setAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(0);
  const [maxHeartRate, setMaxHeartRate] = useState<number>(0);
  const [zones, setZones] = useState<HeartRateZone[]>([]);

  useEffect(() => {
    calculateHeartRate();
  }, [age, restingHeartRate]);

  const calculateHeartRate = () => {
    // 1. Calculate Max Heart Rate
    const maxHR = 220 - age;
    setMaxHeartRate(maxHR);

    // 2. Calculate Zones
    // If Resting HR > 0, use Karvonen Formula: 
    // TargetHR = ((MaxHR - RestingHR) * %Intensity) + RestingHR
    // Else use Simple Max HR %:
    // TargetHR = MaxHR * %Intensity
    
    // Using 0 as sentinel for "no resting heart rate provided" because 0 is impossible for a living human
    const rhr = restingHeartRate > 0 ? restingHeartRate : 0;
    const hrr = maxHR - rhr; // Heart Rate Reserve (equals MaxHR if rhr is 0)

    const calculateLimit = (percentage: number) => {
        if (restingHeartRate > 0) {
            return Math.round((hrr * percentage) + rhr);
        }
        return Math.round(maxHR * percentage);
    }

    const newZones: HeartRateZone[] = [
      {
        zone: 1,
        name: t('heart_rate.zone1', 'Very Light'),
        range: '50-60%',
        min: calculateLimit(0.50),
        max: calculateLimit(0.60),
        desc: t('heart_rate.zone1_desc', 'Warm up, recovery, improves overall health.'),
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      },
      {
        zone: 2,
        name: t('heart_rate.zone2', 'Light'),
        range: '60-70%',
        min: calculateLimit(0.60),
        max: calculateLimit(0.70),
        desc: t('heart_rate.zone2_desc', 'Fat burning, basic endurance, easy conversation.'),
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
      },
      {
        zone: 3,
        name: t('heart_rate.zone3', 'Moderate'),
        range: '70-80%',
        min: calculateLimit(0.70),
        max: calculateLimit(0.80),
        desc: t('heart_rate.zone3_desc', 'Aerobic fitness, improves cardiovascular system.'),
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
      },
      {
        zone: 4,
        name: t('heart_rate.zone4', 'Hard'),
        range: '80-90%',
        min: calculateLimit(0.80),
        max: calculateLimit(0.90),
        desc: t('heart_rate.zone4_desc', 'Anaerobic, increases maximum performance capacity.'),
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
      },
      {
        zone: 5,
        name: t('heart_rate.zone5', 'Maximum'),
        range: '90-100%',
        min: calculateLimit(0.90),
        max: calculateLimit(1.00),
        desc: t('heart_rate.zone5_desc', 'Peak effort, sprinting, short bursts only.'),
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
      }
    ];

    setZones(newZones);
  };

  const faqs = [
    { question: 'How do I calculate my max heart rate?', answer: 'The simplest formula is 220 minus your age. For example, a 30-year-old has an estimated max heart rate of 190 BPM. More accurate formulas include Tanaka (208 − 0.7 × age) and Gulati for women (206 − 0.88 × age). However, actual max HR varies by ±10-12 BPM between individuals. A lab stress test gives the most accurate number.' },
    { question: 'What is the Karvonen formula?', answer: 'The Karvonen formula uses your resting heart rate (Heart Rate Reserve) for more accurate training zones: Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR. It is more personalized than the simple percentage method because it accounts for your fitness level — a lower resting HR means a wider heart rate reserve and different training zones.' },
    { question: 'Which heart rate zone burns the most fat?', answer: 'Zone 2 (60-70% of max HR) is called the "fat burning zone" because the highest percentage of calories come from fat oxidation. However, higher intensity zones (Zone 3-4) burn more total calories per minute, which can lead to greater overall fat loss. For optimal results, mix Zone 2 endurance work with higher-intensity intervals.' },
    { question: 'What is a healthy resting heart rate?', answer: 'A normal resting heart rate for adults is 60-100 BPM. Well-trained athletes often have resting rates of 40-60 BPM. A lower resting heart rate generally indicates better cardiovascular fitness. To measure yours accurately, check your pulse first thing in the morning before getting out of bed, for 3 consecutive days, and average the results.' },
    { question: 'What is the aerobic threshold vs anaerobic threshold?', answer: 'The aerobic threshold (roughly Zone 2-3 boundary, ~70% max HR) is where your body switches from primarily burning fat to relying more on glycogen. The anaerobic threshold (Zone 4, ~80-85% max HR) is the maximum intensity your body can sustain aerobically — above this, lactate accumulates rapidly and you can only maintain effort for minutes, not hours.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="health" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Activity className="w-8 h-8 text-red-500" />
          {t('heart_rate.title', 'Target Heart Rate Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('heart_rate.subtitle', 'Optimize your workouts by training in the right heart rate zones.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="w-5 h-5 text-red-500" />
              {t('forms.sections.inputs', 'Your Details')}
            </h2>

            <div className="space-y-6">
              <CalculatorInput
                label={t('heart_rate.age', 'Age')}
                value={age}
                onChange={setAge}
                min={1}
                max={120}
                icon={User}
                helpText={t('heart_rate.age_help', 'Used to estimate Max Heart Rate (220 - Age).')}
              />

              <CalculatorInput
                label={t('heart_rate.resting_hr', 'Resting Heart Rate')}
                value={restingHeartRate}
                onChange={setRestingHeartRate}
                min={0}
                max={200}
                icon={Heart}
                helpText={t('heart_rate.resting_help', 'Optional. Leave 0 to use simple method. Measured when fully relaxed.')}
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                <p>
                    {restingHeartRate > 0 
                    ? t('heart_rate.using_karvonen', 'Using Karvonen Formula (more accurate).')
                    : t('heart_rate.using_simple', 'Using simple Max Heart Rate method. Enter Resting HR for better accuracy.')}
                </p>
            </div>
          </div>
          
          <AdSlot className="h-[300px] w-full" label="Health Sidebar Ad" />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t('heart_rate.zones_title', 'Your Training Zones')}
                    </h2>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase font-semibold">Max HR</div>
                        <div className="text-2xl font-bold text-red-500">{maxHeartRate} <span className="text-sm text-gray-400">BPM</span></div>
                    </div>
                </div>

                <div className="space-y-4">
                    {zones.map((zone) => (
                        <div key={zone.zone} className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                            <div className={`p-4 ${zone.color}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold uppercase tracking-wider text-xs px-2 py-1 bg-white/50 rounded">
                                        Zone {zone.zone}
                                    </span>
                                    <span className="font-bold text-lg">
                                        {zone.min} - {zone.max} <span className="text-xs opacity-70">BPM</span>
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">{zone.name}</h3>
                                    </div>
                                    <span className="text-sm font-medium opacity-80">{zone.range}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                                {zone.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <AdSlot className="h-24 w-full" label="Bottom Banner Ad" />
        </div>
      </div>
    </div>
  );
}
