'use client';

import { Mail, MapPin, MessageSquare, Clock, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(formData.subject || 'SmartCalc Inquiry');
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:contact@legalpolicygen.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We love hearing from our users. Whether you've spotted a bug, have a feature request, or just want to say hello — we're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                For general inquiries and support.
              </p>
              <a href="mailto:contact@legalpolicygen.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                contact@legalpolicygen.com
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Response Time</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We typically respond within <strong>24–48 hours</strong> during business days. For urgent calculator bugs, we aim to respond within 12 hours.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Office</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                SmartCalc Digital LLC<br />
                123 Innovation Drive, Suite 400<br />
                Austin, TX 78701<br />
                United States
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Common Support Topics</h3>
              <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Bug reports & calculation errors</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Feature requests & new calculator ideas</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Partnership & business inquiries</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Content corrections & formula questions</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Accessibility & usability feedback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
          <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-500" />
            Send a Message
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select a topic...</option>
                <option value="Bug Report">Bug Report / Calculation Error</option>
                <option value="Feature Request">Feature Request / New Calculator Idea</option>
                <option value="Partnership">Partnership / Business Inquiry</option>
                <option value="Content Correction">Content Correction / Formula Question</option>
                <option value="Accessibility">Accessibility / Usability Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea 
                required
                rows={4}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-xl transition-colors"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
              This will open your email client. We typically reply within 24–48 hours.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
