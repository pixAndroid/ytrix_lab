import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service | Yantrix Labs',
  description: 'Read Yantrix Labs Terms of Service governing the use of our website, services, and digital products.',
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
};

export default function TermsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Yantrix Labs&apos; website and services, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, please do not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              Yantrix Labs provides software development, design, and consulting services, as well as digital products
              including templates, UI kits, and source code bundles. All services are provided as described in the
              respective project agreements or product descriptions.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account or engage our services, you are responsible for maintaining the security of
              your credentials and for all activities that occur under your account.
            </p>

            <h2>4. Intellectual Property</h2>
            <ul>
              <li>Content on yantrixlab.com is owned by Yantrix Labs unless otherwise stated.</li>
              <li>Purchased digital products are licensed, not sold, under the specified license terms.</li>
              <li>Custom software developed for clients becomes their property upon full payment.</li>
              <li>Free products are provided under MIT License unless otherwise specified.</li>
            </ul>

            <h2>5. Payment Terms</h2>
            <ul>
              <li>All prices are in INR (Indian Rupees) unless stated otherwise.</li>
              <li>Payments are processed securely via Razorpay.</li>
              <li>For project-based work, payment schedules are defined in individual contracts.</li>
              <li>Digital product purchases are non-refundable once downloaded (see Refund Policy).</li>
            </ul>

            <h2>6. Prohibited Uses</h2>
            <p>You may not use our services to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or malicious code</li>
              <li>Spam or harass others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>

            <h2>7. Limitation of Liability</h2>
            <p>
              Yantrix Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of our services. Our total liability shall not exceed the amount paid for the
              specific service in question.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              Services are provided &quot;as is&quot; without warranty of any kind. We do not warrant that our services will
              be uninterrupted, error-free, or meet your specific requirements.
            </p>

            <h2>9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services immediately, without prior notice,
              for conduct that we believe violates these Terms or is harmful to other users or us.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of our services after
              modifications constitutes acceptance of the updated terms.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these Terms?{' '}
              <a href="mailto:legal@yantrixlab.com" className="text-blue-600 hover:underline">legal@yantrixlab.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
