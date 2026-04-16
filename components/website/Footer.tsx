import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Yantrix <span className="text-blue-400">Labs</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-xs">
              Building software that drives growth — Android apps, iOS apps, websites, and custom digital solutions for startups and businesses.
            </p>
            <div className="flex space-x-3 mb-6">
              {[
                { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-gray-400 hover:text-blue-400">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/products' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                'Android Apps',
                'iOS Apps',
                'Web Development',
                'Custom Software',
                'UI/UX Design',
                'MVP for Startups',
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
                { label: 'Refund Policy', href: '/refund-policy' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Yantrix Labs. Building software that drives growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
