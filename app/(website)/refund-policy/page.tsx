import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Refund Policy | Yantrix Labs',
  description: 'Yantrix Labs refund policy for digital products and software development services.',
  alternates: { canonical: `${SITE_URL}/refund-policy` },
};

export default function RefundPolicyPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-gray-400">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <h2>1. Digital Products</h2>
            <p>
              Due to the nature of digital goods, all sales of digital products (templates, UI kits, source code,
              eBooks, etc.) are <strong>final and non-refundable</strong> once downloaded or accessed.
            </p>
            <p>
              Exceptions may be made at our discretion if:
            </p>
            <ul>
              <li>The product is substantially different from its description</li>
              <li>A technical defect prevents the product from functioning as advertised</li>
              <li>The same product was accidentally purchased twice</li>
            </ul>

            <h2>2. Software Development Services</h2>
            <p>
              For custom development projects:
            </p>
            <ul>
              <li><strong>Before project start:</strong> Full refund of any advance payments if the project hasn&apos;t begun.</li>
              <li><strong>After project start:</strong> Payments made for completed milestones are non-refundable.</li>
              <li><strong>Project cancellation:</strong> You are only liable for work completed at the time of cancellation.</li>
            </ul>

            <h2>3. How to Request a Refund</h2>
            <p>To request a refund, please email us at{' '}
              <a href="mailto:support@yantrixlab.com" className="text-blue-600 hover:underline">support@yantrixlab.com</a> with:
            </p>
            <ul>
              <li>Your order number or transaction ID</li>
              <li>The product/service purchased</li>
              <li>Reason for the refund request</li>
              <li>Supporting evidence if applicable</li>
            </ul>

            <h2>4. Processing Time</h2>
            <p>
              We will review your request within <strong>3 business days</strong>. Approved refunds are processed
              within 5–7 business days to the original payment method.
            </p>

            <h2>5. Chargebacks</h2>
            <p>
              Initiating a chargeback without first contacting us will result in the immediate suspension of your
              account and ban from future purchases. Please reach out to us first — we&apos;re happy to resolve issues.
            </p>

            <h2>6. Contact</h2>
            <p>
              For refund inquiries:{' '}
              <a href="mailto:support@yantrixlab.com" className="text-blue-600 hover:underline">support@yantrixlab.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
