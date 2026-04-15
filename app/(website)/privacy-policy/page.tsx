import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | Yantrix Labs',
  description: 'Read Yantrix Labs Privacy Policy to understand how we collect, use, and protect your personal information.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const lastUpdated = 'January 1, 2025';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <h2>1. Introduction</h2>
            <p>
              Yantrix Labs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website
              yantrixlab.com or engage our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name when you contact us or place an order.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, referrer URL, device information, and IP address.</li>
              <li><strong>Cookies:</strong> Small files stored on your device to improve functionality and analytics.</li>
              <li><strong>Payment Information:</strong> Processed securely by Razorpay. We do not store card details.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to inquiries and provide customer support</li>
              <li>To process transactions and deliver purchased products</li>
              <li>To send transactional emails and project updates</li>
              <li>To analyze website traffic and improve our services</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist in operations (hosting, payment processing, analytics)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              We use cookies for analytics (Google Analytics) and to remember your preferences. You can disable cookies
              in your browser settings, though some features may not function correctly.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL/TLS encryption, secure servers, and regular
              security audits to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices.
              We encourage you to review their privacy policies.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal
              information from children.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by email or
              by posting a notice on our website.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:legal@yantrixlab.com" className="text-blue-600 hover:underline">legal@yantrixlab.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
