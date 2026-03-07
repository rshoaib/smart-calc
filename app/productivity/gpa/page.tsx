'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const GRADES = Object.keys(GRADE_POINTS);

let nextId = 4;

export default function GPACalculator() {
  const { t } = useTranslation();

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Course 1', grade: 'A', credits: 3 },
    { id: 2, name: 'Course 2', grade: 'B+', credits: 4 },
    { id: 3, name: 'Course 3', grade: 'A-', credits: 3 },
  ]);

  const addCourse = useCallback(() => {
    setCourses((prev) => [
      ...prev,
      { id: nextId++, name: `Course ${prev.length + 1}`, grade: 'A', credits: 3 },
    ]);
  }, []);

  const removeCourse = useCallback((id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCourse = useCallback((id: number, field: keyof Course, value: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  // Calculate GPA
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = courses.reduce(
    (sum, c) => sum + (GRADE_POINTS[c.grade] ?? 0) * c.credits,
    0
  );
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-emerald-500';
    if (gpa >= 3.0) return 'text-blue-500';
    if (gpa >= 2.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGpaLabel = (gpa: number) => {
    if (gpa >= 3.9) return t('gpa.honor_summa', 'Summa Cum Laude');
    if (gpa >= 3.7) return t('gpa.honor_magna', 'Magna Cum Laude');
    if (gpa >= 3.5) return t('gpa.honor_cum', 'Cum Laude');
    if (gpa >= 3.0) return t('gpa.honor_deans', "Dean's List");
    if (gpa >= 2.0) return t('gpa.honor_good', 'Good Standing');
    return t('gpa.honor_probation', 'Academic Probation');
  };

  const faqs = [
    { question: 'How is GPA calculated?', answer: 'GPA is calculated by multiplying each course\'s grade point value by its credit hours to get quality points, summing all quality points, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course earns 12 quality points. If you also have a B (3.0) in a 4-credit course (12 points), your GPA = (12+12)/(3+4) = 3.43.' },
    { question: 'What GPA do you need for honors?', answer: 'Cum Laude typically requires 3.5+, Magna Cum Laude 3.7+, and Summa Cum Laude 3.9+. Dean\'s List usually requires 3.0-3.5+ for a single semester. Requirements vary by institution — some use top-percentile cutoffs rather than fixed GPA thresholds. Check your school\'s specific requirements.' },
    { question: 'Does retaking a class affect GPA?', answer: 'Most schools replace the old grade with the new one when calculating GPA (grade replacement/forgiveness policy). Some schools average both attempts or keep the higher grade. The original grade may still appear on your transcript. Always check your institution\'s specific policy before retaking a course.' },
    { question: 'What is the difference between weighted and unweighted GPA?', answer: 'Unweighted GPA uses the standard 4.0 scale for all classes. Weighted GPA adds extra points for honors, AP, or IB courses (e.g., an A in AP = 5.0 instead of 4.0), meaning weighted GPAs can exceed 4.0. Colleges typically recalculate GPAs using their own methodology, so both scales matter.' },
    { question: 'How can I raise my GPA?', answer: 'Focus on courses where you can realistically improve grades. Higher-credit courses have more impact on your GPA — an A in a 4-credit course moves your GPA more than an A in a 1-credit course. Consider retaking low-grade courses if your school offers grade replacement. Also, utilize professor office hours, tutoring, and study groups consistently.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <GraduationCap className="w-8 h-8 text-indigo-500" />
          {t('gpa.title', 'GPA Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('gpa.subtitle', 'Add your courses and instantly calculate your cumulative GPA.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Header Row */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 mb-3 px-1">
              <span className="col-span-4 text-xs font-semibold text-gray-500 uppercase">
                {t('gpa.course_name', 'Course')}
              </span>
              <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase">
                {t('gpa.grade', 'Grade')}
              </span>
              <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase">
                {t('gpa.credits', 'Credits')}
              </span>
              <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase">
                {t('gpa.points', 'Points')}
              </span>
            </div>

            {/* Course Rows */}
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700"
                >
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="sm:col-span-4 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Course name"
                  />
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="sm:col-span-3 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', Math.max(0, Number(e.target.value)))}
                    min={0}
                    max={12}
                    className="sm:col-span-3 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <div className="sm:col-span-2 flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                      {((GRADE_POINTS[course.grade] ?? 0) * course.credits).toFixed(1)}
                    </span>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      aria-label="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCourse}
              className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('gpa.add_course', 'Add Course')}
            </button>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl shadow-lg p-6 text-white text-center">
              <h3 className="text-lg font-medium opacity-90 mb-3">
                {t('gpa.cumulative', 'Cumulative GPA')}
              </h3>
              <div className={`text-7xl font-bold mb-2 ${getGpaColor(gpa).replace('text-', 'text-white/')}`}>
                {gpa.toFixed(2)}
              </div>
              <div className="text-indigo-100 text-sm font-semibold">
                {getGpaLabel(gpa)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                {t('gpa.summary', 'Summary')}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('gpa.total_credits', 'Total Credits')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{totalCredits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('gpa.total_points', 'Total Points')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{totalPoints.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('gpa.num_courses', 'Courses')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{courses.length}</span>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl border border-purple-100 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                {t('gpa.scale_title', '📊 4.0 GPA Scale')}
              </h3>
              <div className="grid grid-cols-2 gap-1 text-xs text-purple-800 dark:text-purple-200">
                <span>A / A+ = 4.0</span>
                <span>A- = 3.7</span>
                <span>B+ = 3.3</span>
                <span>B = 3.0</span>
                <span>B- = 2.7</span>
                <span>C+ = 2.3</span>
                <span>C = 2.0</span>
                <span>D = 1.0</span>
              </div>
            </div>

            <AdSlot className="h-[250px] w-full" label="Result Sidebar Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
