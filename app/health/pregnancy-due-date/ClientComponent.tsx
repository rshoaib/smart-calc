'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Calendar, Baby, Activity, Info, ChevronRight, Clock } from 'lucide-react';

type CalculationMethod = 'lmp' | 'ultrasound' | 'conception';

interface Milestone {
  name: string;
  date: Date;
  description: string;
  isPast: boolean;
  isImportant?: boolean;
}

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('lmp');
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(8); // For ultrasound method
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);   // For ultrasound method

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [conceptionDate, setConceptionDate] = useState<Date | null>(null);
  const [currentWeeks, setCurrentWeeks] = useState<number>(0);
  const [currentDays, setCurrentDays] = useState<number>(0);
  const [trimester, setTrimester] = useState<number>(1);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const calculateDueDate = () => {
      if (!baseDate) return;
      
      const parsedBaseDate = new Date(baseDate);
      // Check for invalid date
      if (isNaN(parsedBaseDate.getTime())) return;

      let calculatedDueDate = new Date(parsedBaseDate);
      let calculatedConception = new Date(parsedBaseDate);

      if (method === 'lmp') {
        // Naegele's rule: LMP + 280 days (adjusted for cycle length)
        // Standard is 280 days for a 28 day cycle.
        const daysToAdd = 280 + (cycleLength - 28);
        calculatedDueDate.setDate(parsedBaseDate.getDate() + daysToAdd);
        calculatedConception.setDate(parsedBaseDate.getDate() + 14 + (cycleLength - 28)); // Roughly 14 days after LMP for 28 day cycle
      } else if (method === 'conception') {
        // Conception date + 266 days (38 weeks)
        calculatedDueDate.setDate(parsedBaseDate.getDate() + 266);
        calculatedConception = new Date(parsedBaseDate);
      } else if (method === 'ultrasound') {
        // Subtract ultrasound age from today to get 'conception age 0' (LMP), then add 280
        const totalDaysPregnant = (ultrasoundWeeks * 7) + ultrasoundDays;
        
        const estimatedLMP = new Date(parsedBaseDate);
        estimatedLMP.setDate(parsedBaseDate.getDate() - totalDaysPregnant);
        
        calculatedDueDate = new Date(estimatedLMP);
        calculatedDueDate.setDate(estimatedLMP.getDate() + 280);
        
        calculatedConception = new Date(estimatedLMP);
        calculatedConception.setDate(estimatedLMP.getDate() + 14);
      }

      setDueDate(calculatedDueDate);
      setConceptionDate(calculatedConception);

      // Current Progress calculation
      const today = new Date();
      // To calculate gestational age, we measure from their estimated LMP (DueDate - 280)
      const estimatedLMPDate = new Date(calculatedDueDate);
      estimatedLMPDate.setDate(calculatedDueDate.getDate() - 280);

      const diffTime = today.getTime() - estimatedLMPDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let weeks = Math.floor(diffDays / 7);
      let days = diffDays % 7;

      // Handle future pregnancies or past childbirths gracefully
      if (weeks < 0) { weeks = 0; days = 0; }
      if (weeks > 42) { weeks = 42; days = 0; } // Cap at 42 weeks

      setCurrentWeeks(weeks);
      setCurrentDays(days);

      // Trimester calculation
      let currentTri = 1;
      if (weeks >= 14 && weeks < 28) currentTri = 2;
      else if (weeks >= 28) currentTri = 3;
      setTrimester(currentTri);

      // Generate Milestones based on estimated LMP point zero
      const generateMilestones = (startLmp: Date) => {
          const addDays = (d: Date, numDays: number) => {
              const newD = new Date(d);
              newD.setDate(d.getDate() + numDays);
              return newD;
          };

          const checkPast = (d: Date) => d.getTime() < today.getTime();

          return [
              {
                  name: "Estimated Conception",
                  date: addDays(startLmp, 14),
                  description: "When the egg was fertilized.",
                  isPast: checkPast(addDays(startLmp, 14)),
              },
              {
                  name: "First Trimester Ends (Week 14)",
                  date: addDays(startLmp, 14 * 7),
                  description: "Risk of miscarriage drops significantly; morning sickness may fade.",
                  isPast: checkPast(addDays(startLmp, 14 * 7)),
                  isImportant: true
              },
              {
                  name: "Anatomy Scan Window (Weeks 18-22)",
                  date: addDays(startLmp, 18 * 7),
                  description: "Detailed ultrasound to check baby's development & gender.",
                  isPast: checkPast(addDays(startLmp, 18 * 7)),
              },
              {
                  name: "Viability (Week 24)",
                  date: addDays(startLmp, 24 * 7),
                  description: "The earliest point a baby can potentially survive outside the womb with intensive medical care.",
                  isPast: checkPast(addDays(startLmp, 24 * 7)),
              },
              {
                  name: "Second Trimester Ends (Week 28)",
                  date: addDays(startLmp, 28 * 7),
                  description: "Entering the final stretch. Glucose screening test usually happens around here.",
                  isPast: checkPast(addDays(startLmp, 28 * 7)),
                  isImportant: true
              },
              {
                  name: "Early Term (Week 37)",
                  date: addDays(startLmp, 37 * 7),
                  description: "Baby is considered early term. Lungs hold their own.",
                  isPast: checkPast(addDays(startLmp, 37 * 7)),
              },
              {
                  name: "Full Term / Estimated Due Date (Week 40)",
                  date: addDays(startLmp, 40 * 7),
                  description: "The big day! Note: only ~5% of babies are born exactly on their due date.",
                  isPast: checkPast(addDays(startLmp, 40 * 7)),
                  isImportant: true
              }
          ];
      };

      setMilestones(generateMilestones(estimatedLMPDate));

    };

    calculateDueDate();
  }, [method, baseDate, cycleLength, ultrasoundWeeks, ultrasoundDays]);

  const faqs = [
    {
      question: "How accurate is a due date calculator?",
      answer: "A due date calculator provides an 'estimated date of delivery' (EDD). Only about 4% to 5% of babies are born precisely on their due date. It is perfectly normal for a pregnancy to last anywhere from 37 weeks (early term) to 42 weeks (post-term)."
    },
    {
      question: "Why use the First Day of my Last Period (LMP)?",
      answer: "Medical professionals use LMP because tracking the exact date of conception is extremely difficult for most women. Gestational age actually counts from the first day of your last period, meaning you are technically considered 'two weeks pregnant' on the day you conceive."
    },
    {
      question: "What if my periods are irregular?",
      answer: "If your cycle is much longer or shorter than the standard 28 days, Naegele's rule (LMP + 280 days) becomes incredibly inaccurate. Our calculator lets you adjust your average cycle length to compensate. However, an early ultrasound is considered the most accurate method for dating irregular pregnancies."
    },
    {
      question: "When are the three trimesters?",
      answer: "The First Trimester runs from Week 1 to the end of Week 13. The Second Trimester runs from Week 14 to the end of Week 27. The Third Trimester runs from Week 28 until birth (usually Week 40). Our milestone timeline chart visually breaks these down for you."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="health" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Baby className="w-8 h-8 text-pink-500" />
          Pregnancy Due Date Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your Estimated Due Date (EDD), current gestational age, and view your complete pregnancy milestone timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Calculation Method</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Calculate By:</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={method}
                    onChange={(e) => {
                        setMethod(e.target.value as CalculationMethod);
                        setBaseDate(new Date().toISOString().split('T')[0]); // Reset date slightly
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value="lmp">First Day of Last Period (LMP)</option>
                    <option value="conception">Known Date of Conception</option>
                    <option value="ultrasound">Ultrasound Scan Date</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Inputs based on Method */}
              {method === 'lmp' && (
                  <>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Day of Last Period</label>
                        <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            value={baseDate}
                            onChange={(e) => setBaseDate(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                            Average Cycle Length (Days)
                            <div className="group relative">
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                                <div className="absolute right-0 w-48 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg invisible group-hover:visible z-10">
                                    Normal cycles range from 21 to 35 days. The standard calculation assumes exactly 28 days.
                                </div>
                            </div>
                        </label>
                        <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            min="20"
                            max="45"
                            value={cycleLength}
                            onChange={(e) => setCycleLength(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                        </div>
                    </div>
                  </>
              )}

              {method === 'conception' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Exact Date of Conception</label>
                    <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Useful if you tracked ovulation perfectly or used IVF transfer dates.</p>
                </div>
              )}

              {method === 'ultrasound' && (
                  <>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Ultrasound</label>
                        <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            value={baseDate}
                            onChange={(e) => setBaseDate(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Weeks along</label>
                            <input
                                type="number"
                                min="4"
                                max="40"
                                value={ultrasoundWeeks}
                                onChange={(e) => setUltrasoundWeeks(Number(e.target.value))}
                                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Days along</label>
                            <input
                                type="number"
                                min="0"
                                max="6"
                                value={ultrasoundDays}
                                onChange={(e) => setUltrasoundDays(Number(e.target.value))}
                                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Check the fetal measurement on your scan report (e.g. 8w4d).</p>
                  </>
              )}
            </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-8">
            {/* Summary Hero Card */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-pink-100 dark:border-pink-800 text-center shadow-sm">
                <h3 className="text-sm font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-widest mb-2">Estimated Due Date</h3>
                <p className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                  {dueDate ? dueDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '---'}
                </p>
                
                <div className="grid grid-cols-2 gap-4 divide-x divide-pink-200 dark:divide-pink-800">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Progress</span>
                        <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                            {currentWeeks} <span className="text-sm font-normal text-gray-500">weeks</span>, {currentDays} <span className="text-sm font-normal text-gray-500">days</span>
                        </span>
                    </div>
                    <div className="flex flex-col pl-4">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trimester</span>
                        <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                            {trimester}
                            <span className="text-sm font-normal text-gray-500">
                                {trimester === 1 ? 'st' : trimester === 2 ? 'nd' : 'rd'} Trimester
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Timeline UI */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="w-5 h-5 text-pink-500" />
                Pregnancy Milestones
              </h3>
              
              <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
                  {milestones.map((m, idx) => (
                      <div key={idx} className="relative pl-6">
                         {/* Timeline Dot */}
                        <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${m.isPast ? 'bg-pink-300 dark:bg-pink-700' : (m.isImportant ? 'bg-pink-500 scale-125' : 'bg-gray-300 dark:bg-gray-600')}`}></div>
                        
                        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 ${m.isPast ? 'opacity-60' : ''}`}>
                            <h4 className={`font-semibold ${m.isImportant && !m.isPast ? 'text-pink-600 dark:text-pink-400' : 'text-gray-900 dark:text-gray-200'}`}>
                                {m.name}
                            </h4>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {m.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <p className={`text-sm text-gray-600 dark:text-gray-400 ${m.isPast ? 'opacity-60' : ''}`}>
                            {m.description}
                        </p>
                      </div>
                  ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-800 flex items-start gap-4">
              <Info className="w-6 h-6 shrink-0 mt-0.5" />
              <p>
                <strong>Remember:</strong> Only around 5% of babies are born precisely on their due date. This timeline is a statistical estimate to help you prepare. Your healthcare provider will track your actual progress during prenatal visits.
              </p>
            </div>
        </div>
      </div>
      
      {/* Educational Content Section */}
      <article className="mt-16 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Calculator Determines Your Due Date</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our free due date calculator uses <strong>Naegele's rule</strong>, the exact same mathematical formula utilized by obstetricians and midwives globally. It calculates your Estimated Date of Delivery (EDD) by taking the first day of your last menstrual period (LMP), adding seven days, and then adding nine months (or roughly 280 days total).
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Unlike generic calculators that assume every woman has a perfect 28-day cycle, our tool allows you to input your <strong>average cycle length</strong>. Since ovulation typically occurs 14 days before the end of a cycle, adjusting this input ensures a much more scientifically accurate estimate for women with shorter or longer biological cycles.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Alternate Methods: Conception and Ultrasound</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sometimes, you know more data than just your LMP.
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
            <li><strong>Conception Date:</strong> If you strictly tracked ovulation via temperature or hormone strips, or if you conceived via In Vitro Fertilization (IVF), you enter the exact day of conception. The calculator simply adds 266 days (38 weeks) from that moment.</li>
            <li><strong>Ultrasound Date:</strong> Early dating ultrasounds (usually between 7 and 12 weeks) are the most empirically accurate way to determine an EDD because fetal growth in the first trimester is extremely consistent. You can enter the exact measurement the technician gave you on the day of the scan.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-pink-500" />
                        {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
            ))}
          </div>
      </article>
    </div>
  );
}
