'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'smartcalc_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

function getStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === 'accepted' || value === 'rejected') return value;
    return null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch { /* localStorage unavailable */ }
    setVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    } catch { /* localStorage unavailable */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up"
    >
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl p-5 md:p-6">
          <button
            onClick={handleReject}
            className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Dismiss cookie consent"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-0.5 p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use cookies for analytics and to improve your experience.
                  No personal calculator data is ever collected or stored.
                  Read our{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 underline hover:no-underline font-medium"
                  >
                    Privacy Policy
                  </Link>{' '}
                  for details.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function hasAcceptedCookies(): boolean {
  return getStoredConsent() === 'accepted';
}
