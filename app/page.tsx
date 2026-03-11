import { Home } from './page-component';

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are all SmartCalc tools really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — every calculator on SmartCalc is 100% free to use with no signup, no hidden trial, and no paywall. We sustain the site through non-intrusive display advertising so you never have to pay a cent."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe when I use these calculators?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All calculations run entirely in your browser using client-side JavaScript. Your financial figures, health metrics, and personal inputs are never sent to our servers. When you close the tab, the data is gone — we have zero access to it."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are SmartCalc's results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculators use industry-standard formulas (e.g., amortization for mortgages, Mifflin-St Jeor for calories, Epley for 1RM). We display our formulas, assumptions, and data sources on each tool page. However, results are estimates — always consult a licensed professional before making major financial or health decisions."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SmartCalc is completely stateless — there are no accounts, no logins, and no personal data stored on our end. Just open a calculator, enter your numbers, and get instant results."
        }
      },
      {
        "@type": "Question",
        "name": "What categories of calculators does SmartCalc offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer 20+ tools across three categories: Finance, Health, and Productivity. Explore tools for mortgage, investment, BMI, pomodoro timer, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use SmartCalc on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SmartCalc is fully responsive and works on any device — phone, tablet, laptop, or desktop. The interface automatically adapts to your screen size. You can even add it to your home screen for instant access."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home />
    </>
  );
}
