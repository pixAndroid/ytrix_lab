import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ContactForm from '@/components/website/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Free Quote | Yantrix Labs',
  description: 'Get in touch with Yantrix Labs for your software development project. We offer free consultations for web, mobile app, and SaaS development.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@yantrixlab.com', href: 'mailto:hello@yantrixlab.com' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India (Remote Globally)', href: '#' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9AM–7PM IST', href: '#' },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-28 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Build{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a free consultation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form and our team will reach out to you.</p>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href}
                      className={`flex items-start gap-4 group ${href !== '#' ? 'cursor-pointer' : 'cursor-default'}`}>
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-gray-800 font-medium text-sm mt-0.5">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">⚡ Quick Response</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  We typically respond within 4 hours. For urgent projects, WhatsApp us directly for immediate attention.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Yantrix%20Labs%2C%20I%20need%20help%20with..."
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  💬 WhatsApp Us
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">What Happens Next?</h3>
                <ol className="space-y-3">
                  {[
                    'We review your project requirements',
                    'Schedule a free discovery call',
                    'Provide a detailed proposal & quote',
                    'Start building your vision',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
