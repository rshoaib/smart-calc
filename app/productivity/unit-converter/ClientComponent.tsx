'use client';

import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

type Category = 'length' | 'weight' | 'temperature' | 'speed' | 'volume' | 'area';

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const units: Record<Category, Record<string, UnitDef>> = {
  length: {
    m:    { label: 'Meters (m)',       toBase: v => v,          fromBase: v => v },
    km:   { label: 'Kilometers (km)',  toBase: v => v * 1000,   fromBase: v => v / 1000 },
    cm:   { label: 'Centimeters (cm)', toBase: v => v / 100,    fromBase: v => v * 100 },
    mm:   { label: 'Millimeters (mm)', toBase: v => v / 1000,   fromBase: v => v * 1000 },
    mi:   { label: 'Miles (mi)',       toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    ft:   { label: 'Feet (ft)',        toBase: v => v * 0.3048,   fromBase: v => v / 0.3048 },
    in:   { label: 'Inches (in)',      toBase: v => v * 0.0254,   fromBase: v => v / 0.0254 },
    yd:   { label: 'Yards (yd)',       toBase: v => v * 0.9144,   fromBase: v => v / 0.9144 },
  },
  weight: {
    kg:   { label: 'Kilograms (kg)',   toBase: v => v,          fromBase: v => v },
    g:    { label: 'Grams (g)',        toBase: v => v / 1000,   fromBase: v => v * 1000 },
    mg:   { label: 'Milligrams (mg)',  toBase: v => v / 1e6,    fromBase: v => v * 1e6 },
    lb:   { label: 'Pounds (lb)',      toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    oz:   { label: 'Ounces (oz)',      toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    st:   { label: 'Stone (st)',       toBase: v => v * 6.35029, fromBase: v => v / 6.35029 },
    t:    { label: 'Metric Tons (t)',  toBase: v => v * 1000,   fromBase: v => v / 1000 },
  },
  temperature: {
    c:  { label: 'Celsius (°C)',       toBase: v => v,                  fromBase: v => v },
    f:  { label: 'Fahrenheit (°F)',    toBase: v => (v - 32) * 5 / 9,  fromBase: v => v * 9 / 5 + 32 },
    k:  { label: 'Kelvin (K)',         toBase: v => v - 273.15,         fromBase: v => v + 273.15 },
  },
  speed: {
    mps:  { label: 'Meters/sec (m/s)',     toBase: v => v,            fromBase: v => v },
    kmh:  { label: 'Kilometers/hr (km/h)', toBase: v => v / 3.6,     fromBase: v => v * 3.6 },
    mph:  { label: 'Miles/hr (mph)',        toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
    knot: { label: 'Knots (kn)',            toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
    fps:  { label: 'Feet/sec (ft/s)',       toBase: v => v * 0.3048,  fromBase: v => v / 0.3048 },
  },
  volume: {
    l:     { label: 'Liters (L)',           toBase: v => v,            fromBase: v => v },
    ml:    { label: 'Milliliters (mL)',     toBase: v => v / 1000,    fromBase: v => v * 1000 },
    gal:   { label: 'US Gallons (gal)',     toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    qt:    { label: 'US Quarts (qt)',       toBase: v => v * 0.946353, fromBase: v => v / 0.946353 },
    cup:   { label: 'US Cups',              toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
    floz:  { label: 'US Fl Oz (fl oz)',     toBase: v => v * 0.0295735, fromBase: v => v / 0.0295735 },
    m3:    { label: 'Cubic Meters (m³)',    toBase: v => v * 1000,    fromBase: v => v / 1000 },
  },
  area: {
    m2:    { label: 'Square Meters (m²)',   toBase: v => v,            fromBase: v => v },
    km2:   { label: 'Square Km (km²)',      toBase: v => v * 1e6,     fromBase: v => v / 1e6 },
    ft2:   { label: 'Square Feet (ft²)',    toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    ac:    { label: 'Acres (ac)',           toBase: v => v * 4046.86,  fromBase: v => v / 4046.86 },
    ha:    { label: 'Hectares (ha)',        toBase: v => v * 10000,   fromBase: v => v / 10000 },
    mi2:   { label: 'Square Miles (mi²)',   toBase: v => v * 2.59e6,  fromBase: v => v / 2.59e6 },
  },
};

const categoryLabels: Record<Category, { label: string; icon: string }> = {
  length:      { label: 'Length', icon: '📏' },
  weight:      { label: 'Weight', icon: '⚖️' },
  temperature: { label: 'Temperature', icon: '🌡️' },
  speed:       { label: 'Speed', icon: '🏎️' },
  volume:      { label: 'Volume', icon: '🧪' },
  area:        { label: 'Area', icon: '📐' },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    // Reset units when category changes
    const unitKeys = Object.keys(units[category]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setFromValue(1);
  }, [category]);

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  const convert = () => {
    const catUnits = units[category];
    const base = catUnits[fromUnit].toBase(fromValue);
    const result = catUnits[toUnit].fromBase(base);
    setToValue(result);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const formatResult = (val: number): string => {
    if (Math.abs(val) < 0.0001 && val !== 0) return val.toExponential(4);
    if (Math.abs(val) >= 1e9) return val.toExponential(4);
    return val.toLocaleString('en-US', { maximumFractionDigits: 6 });
  };

  const catUnits = units[category];

  const faqs = [
    { question: 'How do I convert between metric and imperial units?', answer: 'This converter handles metric ↔ imperial automatically. Common conversions: 1 inch = 2.54 cm, 1 mile = 1.609 km, 1 pound = 0.4536 kg, 1 gallon = 3.785 liters. Simply select your units and the conversion happens instantly.' },
    { question: 'How do I convert Celsius to Fahrenheit?', answer: 'Multiply Celsius by 9/5 and add 32. Formula: °F = °C × 9/5 + 32. For example, 100°C = 212°F (boiling point of water). For a quick estimate, double the Celsius and add 30.' },
    { question: 'What is the difference between mass and weight?', answer: 'Mass (kilograms) is the amount of matter in an object and doesn\'t change with location. Weight (newtons) is the force of gravity on that mass and varies by location. In everyday usage, we use "weight" loosely to mean mass. This converter uses mass units.' },
    { question: 'How many feet are in a mile?', answer: '1 mile = 5,280 feet = 1,760 yards = 1,609.344 meters. The mile was originally defined as 1,000 Roman paces (mille passus), but was later standardized to its current length.' },
    { question: 'What are the most common unit conversions?', answer: 'The most searched conversions are: kg to lbs, Celsius to Fahrenheit, inches to cm, miles to km, liters to gallons, and feet to meters. All of these are available in this converter with instant, live results.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <ArrowLeftRight className="w-8 h-8 text-teal-500" />
          Unit Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between metric and imperial — length, weight, temperature, speed, volume, and area.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  category === cat
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {categoryLabels[cat].icon} {categoryLabels[cat].label}
              </button>
            ))}
          </div>

          {/* Converter Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(Number(e.target.value))}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-xl font-mono"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-48 px-3 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                >
                  {Object.entries(catUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swap}
                className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800/40 transition-colors"
                aria-label="Swap units"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
              <div className="flex gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-xl font-mono font-bold text-teal-600 dark:text-teal-400">
                  {formatResult(toValue)}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-48 px-3 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                >
                  {Object.entries(catUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Formula display */}
          <div className="bg-teal-600 dark:bg-teal-700 rounded-2xl shadow-lg p-6 text-center text-white">
            <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-2">Conversion</div>
            <div className="text-2xl md:text-3xl font-bold font-mono">
              {fromValue} {catUnits[fromUnit].label.split('(')[0].trim()} = {formatResult(toValue)} {catUnits[toUnit].label.split('(')[0].trim()}
            </div>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* SEO Content */}
          <div className="prose dark:prose-invert max-w-none">
            <h2>How Unit Conversion Works</h2>
            <p>
              Unit conversion works by using a common base unit within each category. For example, all length
              conversions go through meters, all weight through kilograms. The converter multiplies the input
              value to the base unit, then divides to the target unit — handling the math instantly.
            </p>
            <h3>Quick Reference</h3>
            <ul>
              <li><strong>1 inch</strong> = 2.54 centimeters</li>
              <li><strong>1 foot</strong> = 30.48 centimeters</li>
              <li><strong>1 mile</strong> = 1.609 kilometers</li>
              <li><strong>1 pound</strong> = 0.4536 kilograms</li>
              <li><strong>1 ounce</strong> = 28.35 grams</li>
              <li><strong>100°F</strong> = 37.8°C (body temperature)</li>
              <li><strong>1 gallon</strong> = 3.785 liters</li>
            </ul>

            <h3>Frequently Asked Questions</h3>
            {faqs.map((faq, i) => (
              <div key={i}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-2xl border border-teal-100 dark:border-teal-800">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                🔄 Common Conversions
              </h3>
              <ul className="space-y-2 text-sm text-teal-800 dark:text-teal-200">
                <li>1 kg = 2.205 lbs</li>
                <li>1 mi = 1.609 km</li>
                <li>1 in = 2.54 cm</li>
                <li>0°C = 32°F</li>
                <li>1 gal = 3.785 L</li>
                <li>1 acre = 4,047 m²</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-2xl border border-orange-100 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                📐 Metric Prefixes
              </h3>
              <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                <li><strong>kilo (k)</strong> = 1,000×</li>
                <li><strong>centi (c)</strong> = 1/100</li>
                <li><strong>milli (m)</strong> = 1/1,000</li>
                <li><strong>micro (μ)</strong> = 1/1,000,000</li>
              </ul>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
