'use client';

import { DollarSign, Activity, TrendingUp, HandCoins, Heart, ShieldCheck, Utensils, Home as HomeIcon, ShieldAlert, Dumbbell, Zap, Timer, ArrowLeftRight, Users, Percent, GraduationCap, Keyboard, Receipt, Shield, Eye, Sparkles, ChevronDown, Calculator, Clock, BookOpen, Car, Baby } from 'lucide-react';
import { ToolCard } from '@/components/ToolCard';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const homeFaqs = [
  {
    question: 'Are all SmartCalc tools really free?',
    answer: 'Yes — every calculator on SmartCalc is 100% free to use with no signup, no hidden trial, and no paywall. We sustain the site through non-intrusive display advertising so you never have to pay a cent.'
  },
  {
    question: 'Is my data safe when I use these calculators?',
    answer: 'Absolutely. All calculations run entirely in your browser using client-side JavaScript. Your financial figures, health metrics, and personal inputs are never sent to our servers. When you close the tab, the data is gone — we have zero access to it.'
  },
  {
    question: 'How accurate are SmartCalc\'s results?',
    answer: 'Our calculators use industry-standard formulas (e.g., amortization for mortgages, Mifflin-St Jeor for calories, Epley for 1RM). We display our formulas, assumptions, and data sources on each tool page. However, results are estimates — always consult a licensed professional before making major financial or health decisions.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. SmartCalc is completely stateless — there are no accounts, no logins, and no personal data stored on our end. Just open a calculator, enter your numbers, and get instant results.'
  },
  {
    question: 'What categories of calculators does SmartCalc offer?',
    answer: 'We offer 20+ tools across three categories: Finance (mortgage, investment, retirement, debt payoff, FIRE, rent vs buy, emergency fund, ROI, freelance rate, savings goal), Health (BMI, calorie, macro split, heart rate zones, sleep cycle, one-rep max), and Productivity (pomodoro timer, salary converter, meeting cost, percentage, GPA, typing speed, tip calculator, word counter, age calculator, date difference, unit converter).'
  },
  {
    question: 'Can I use SmartCalc on my phone?',
    answer: 'Yes. SmartCalc is fully responsive and works on any device — phone, tablet, laptop, or desktop. The interface automatically adapts to your screen size. You can even add it to your home screen for instant access.'
  }
];

export function Home() {
  const { t } = useTranslation();

  const financeTools = [
    {
      name: t('home.tools.mortgage.name'),
      description: t('home.tools.mortgage.desc'),
      icon: DollarSign,
      path: '/finance/mortgage',
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: t('home.tools.investment.name'),
      description: t('home.tools.investment.desc'),
      icon: TrendingUp,
      path: '/finance/investment',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      name: t('home.tools.inflation.name', 'Inflation Calculator'),
      description: t('home.tools.inflation.desc', 'Calculate real dollar value over time using official CPI.'),
      icon: TrendingUp,
      path: '/finance/inflation',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.auto_loan.name'),
      description: t('home.tools.auto_loan.desc'),
      icon: Car,
      path: '/finance/auto-loan',
      color: 'text-teal-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      name: t('home.tools.retirement.name'),
      description: t('home.tools.retirement.desc'),
      icon: TrendingUp, 
      path: '/finance/retirement',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.debt_payoff.name'),
      description: t('home.tools.debt_payoff.desc'),
      icon: ShieldCheck,
      path: '/finance/debt-payoff',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      name: t('home.tools.millionaire.name'),
      description: t('home.tools.millionaire.desc'),
      icon: TrendingUp,
      path: '/finance/time-to-millionaire',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      name: t('home.tools.rent_vs_buy.name'),
      description: t('home.tools.rent_vs_buy.desc'),
      icon: HomeIcon,
      path: '/finance/rent-vs-buy',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.emergency.name'),
      description: t('home.tools.emergency.desc'),
      icon: ShieldAlert,
      path: '/finance/emergency',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
  ];

  const healthTools = [
    {
      name: t('home.tools.bmi.name'),
      description: t('home.tools.bmi.desc'),
      icon: Activity,
      path: '/health/bmi',
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      name: t('home.tools.calorie.name'),
      description: t('home.tools.calorie.desc'),
      icon: Heart,
      path: '/health/calories',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      name: t('home.tools.macro_split.name'),
      description: t('home.tools.macro_split.desc'),
      icon: Utensils,
      path: '/health/macro-split',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      name: t('home.tools.orm.name'),
      description: t('home.tools.orm.desc'),
      icon: Dumbbell,
      path: '/health/1rm',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.pregnancy.name', 'Pregnancy Due Date'),
      description: t('home.tools.pregnancy.desc', 'Calculate your EDD and view your milestone timeline.'),
      icon: Baby,
      path: '/health/pregnancy-due-date',
      color: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/20',
    },
  ];

  const productivityTools = [
    {
      name: t('home.tools.pomodoro.name', 'Pomodoro Timer'),
      description: t('home.tools.pomodoro.desc', 'Boost focus with customizable work & break intervals.'),
      icon: Timer,
      path: '/productivity/pomodoro',
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      name: t('home.tools.salary_hourly.name', 'Salary ↔ Hourly'),
      description: t('home.tools.salary_hourly.desc', 'Convert between annual salary and hourly wage instantly.'),
      icon: ArrowLeftRight,
      path: '/productivity/salary-hourly',
      color: 'text-violet-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
    },
    {
      name: t('home.tools.meeting_cost.name', 'Meeting Cost'),
      description: t('home.tools.meeting_cost.desc', 'Track the real-time cost of your meetings.'),
      icon: Users,
      path: '/productivity/meeting-cost',
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      name: t('home.tools.percentage.name', 'Percentage Calculator'),
      description: t('home.tools.percentage.desc', 'Three ways to calculate percentages instantly.'),
      icon: Percent,
      path: '/productivity/percentage',
      color: 'text-cyan-500',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    {
      name: t('home.tools.gpa.name', 'GPA Calculator'),
      description: t('home.tools.gpa.desc', 'Calculate your cumulative GPA on a 4.0 scale.'),
      icon: GraduationCap,
      path: '/productivity/gpa',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.typing.name', 'Typing Speed Test'),
      description: t('home.tools.typing.desc', 'Measure your typing speed and accuracy in real time.'),
      icon: Keyboard,
      path: '/productivity/typing-speed',
      color: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/20',
    },
    {
      name: t('home.tools.tip.name', 'Tip Calculator'),
      description: t('home.tools.tip.desc', 'Calculate tips and split bills instantly.'),
      icon: Receipt,
      path: '/productivity/tip-calculator',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
  ];

  return (
    <>
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Free Online <span className="text-primary-600">Calculators</span> for Finance, Health & Productivity
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.hero_subtitle')}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            SmartCalc gives you instant access to professional-grade financial, health, and productivity tools — completely free, with no signup required. 
            Every calculation runs privately in your browser, so your personal data never leaves your device.
          </p>
        </div>

        {/* How It Works */}
        <section className="bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-primary-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">1</div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2"><Calculator className="w-4 h-4" /> Choose a Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse 20+ tools across Finance, Health, and Productivity. Each tool is designed for a specific decision — from planning a mortgage to optimizing your gym routine.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">2</div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2"><Keyboard className="w-4 h-4" /> Enter Your Numbers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plug in your real data — loan amounts, income, weight, age, or any relevant input. We pre-fill sensible defaults so you can see results instantly, then customize from there.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">3</div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Get Instant Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Results update in real time as you type. Every tool includes visual charts, educational context, and clear explanations of the formulas used — so you understand the "why" behind the numbers.</p>
            </div>
          </div>
        </section>

        {/* Why SmartCalc */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why 50,000+ People Trust SmartCalc</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-2">
              <Shield className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="font-semibold text-sm">100% Private</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">All calculations happen in your browser. Zero data is sent to any server — ever.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-2">
              <Eye className="w-8 h-8 text-blue-500 mx-auto" />
              <h3 className="font-semibold text-sm">No Signup Required</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">No account, no email, no paywall. Just open and calculate — it's that simple.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-2">
              <Clock className="w-8 h-8 text-orange-500 mx-auto" />
              <h3 className="font-semibold text-sm">Instant Results</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Results update in real time as you type. No waiting, no loading spinners, no reloads.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-indigo-500 mx-auto" />
              <h3 className="font-semibold text-sm">Educational Context</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Every tool explains the formula, shows assumptions, and includes FAQs so you learn as you go.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            {t('home.finance_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            {t('home.health_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-500" />
            {t('home.productivity_title', 'Productivity Tools')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productivityTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        <p className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
          All tools on SmartCalc are for educational and informational purposes only. Results are estimates and should not be considered professional advice. Always consult a qualified professional for important decisions.
        </p>
      </div>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

