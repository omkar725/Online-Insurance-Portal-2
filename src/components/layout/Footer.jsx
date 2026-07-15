import { Link } from 'react-router-dom'
import { Shield, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  'Insurance': [
    { name: 'Health Insurance', path: '/plans?category=health' },
    { name: 'Life Insurance', path: '/plans?category=life' },
    { name: 'Motor Insurance', path: '/plans?category=motor' },
    { name: 'Travel Insurance', path: '/plans?category=travel' },
    { name: 'Home Insurance', path: '/plans?category=home' },
    { name: 'Business Insurance', path: '/plans?category=business' },
  ],
  'Quick Links': [
    { name: 'Compare Plans', path: '/compare' },
    { name: 'AI Calculator', path: '/ai/calculator' },
    { name: 'AI Recommendations', path: '/ai/recommend' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  'Legal': [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 pt-16 pb-8">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Online<span className="text-primary-400">Insurance</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 mb-6 leading-relaxed">
              India&apos;s trusted insurance comparison portal. Compare, purchase, and manage your policies — all in one place.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-surface-400">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>support@onlineinsurance.in</span>
              </div>
              <div className="flex items-center gap-2.5 text-surface-400">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+91 1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5 text-surface-400">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>Bandra Kurla Complex, Mumbai 400051</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-surface-700/50 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <p>© {new Date().getFullYear()} OnlineInsurance. All rights reserved. IRDAI Licensed Composite Broker.</p>
          <p>Developed by Omkar Zalake</p>
        </div>
      </div>
    </footer>
  )
}
