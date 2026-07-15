import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { adminStats, formatINR } from '../../lib/dummyData'
import { Users, Shield, DollarSign, Activity, FileText, Settings, Key, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const cards = [
    { label: 'Total Users', value: adminStats.totalUsers.toLocaleString('en-IN'), icon: Users, color: 'from-blue-500 to-indigo-600', link: '/admin/users' },
    { label: 'Active Policies', value: adminStats.activePolicies.toLocaleString('en-IN'), icon: Shield, color: 'from-emerald-500 to-teal-600', link: '/admin/plans' },
    { label: 'Total Revenue', value: formatINR(adminStats.totalRevenue), icon: DollarSign, color: 'from-violet-500 to-purple-600', link: '/admin/payments' },
    { label: 'Pending Claims', value: adminStats.pendingClaims, icon: AlertTriangle, color: 'from-amber-500 to-orange-500', link: '/admin/claims' },
  ]

  const actions = [
    { label: 'Manage Users', desc: 'Activate, block or view user profiles.', link: '/admin/users', icon: Users },
    { label: 'Review Claims', desc: 'Assess and approve/reject claims.', link: '/admin/claims', icon: AlertTriangle },
    { label: 'Approve KYC Docs', desc: 'Verify Aadhaar, PAN card uploads.', link: '/admin/documents', icon: FileText },
    { label: 'Portal Settings', desc: 'Modify system-wide preferences.', link: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <span className="badge-success text-xs font-semibold uppercase tracking-wider mb-2 inline-block">Admin Console</span>
          <h1 className="text-2xl md:text-3xl font-bold font-display">System Administration</h1>
          <p className="text-primary-300 mt-1">Monitor users, premiums, claims settlements and documents status</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={c.link} className="stat-card group hover:-translate-y-1 hover:shadow-card-hover transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center`}><c.icon className="w-5 h-5 text-white" /></div>
                  <p className="text-2xl font-bold text-surface-900 mt-2">{c.value}</p>
                  <p className="text-xs text-surface-500">{c.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Grid */}
          <div>
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Quick Management</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actions.map((act, i) => (
                <Link key={act.label} to={act.link} className="card p-5 hover:border-primary-300 hover:shadow-card-hover group transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"><act.icon className="w-5 h-5" /></div>
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">{act.label}</h3>
                  <p className="text-xs text-surface-500 mt-1 leading-relaxed">{act.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
