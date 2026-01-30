import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - SmartCalc</title>
        <meta name="description" content="Privacy Policy for SmartCalc. We prioritize your privacy and do not store sensitive user data." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">1. Data Collection</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            SmartCalc works entirely on your device (client-side). We do not transmit or store your personal financial or health data on our servers.
            Any inputs you provide (such as loan amounts, weight, or age) stay in your browser and are lost when you close the tab.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">2. Cookies & Advertising</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We use third-party advertising partners (such as Google AdSense) to serve ads when you visit our website. 
            These companies may use cookies to serve ads based on your prior visits to this website or other websites.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">3. Contact</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </>
  );
}
