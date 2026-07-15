import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPolicies, dummyClaims, dummyPayments, formatINR } from '../../lib/dummyData'
import { Shield, FileText, AlertTriangle, CreditCard, ArrowRight, Plus, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const activePolicies = dummyPolicies.filter(p => p.status === 'active')
  const pendingClaims = dummyClaims.filter(c => c.status === 'pending')
  const totalPaid = dummyPayments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0)

  const stats = [
    { label: 'Active Policies', value: activePolicies.length, icon: Shield, color: 'from-primary-500 to-primary-600', link: '/dashboard/policies' },
    { label: 'Pending Claims', value: pendingClaims.length, icon: AlertTriangle, color: 'from-amber-500 to-orange-500', link: '/dashboard/claims' },
    { label: 'Total Paid', value: formatINR(totalPaid), icon: CreditCard, color: 'from-accent-500 to-emerald-600', link: '/dashboard/payments' },
    { label: 'Renewals Due', value: 1, icon: RefreshCw, color: 'from-rose-500 to-pink-600', link: '/dashboard/policies' },
  ]

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold font-display">Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'} 👋</h1>
          <p className="text-primary-300 mt-1">Here&apos;s your insurance overview</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={s.link} className="stat-card group hover:shadow-card-hover hover:-translate-y-1 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}><s.icon className="w-5 h-5 text-white" /></div>
                  <p className="text-2xl font-bold text-surface-900">{s.value}</p>
                  <p className="text-xs text-surface-500">{s.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/plans" className="btn-primary text-sm"><Plus className="w-4 h-4 mr-1" /> Buy New Policy</Link>
            <Link to="/dashboard/claims/new" className="btn-secondary text-sm"><FileText className="w-4 h-4 mr-1" /> Submit Claim</Link>
            <Link to="/ai/calculator" className="btn-outline text-sm">AI Calculator</Link>
          </div>
          {/* Recent Policies */}
          <div className="card mb-6">
            <div className="p-5 border-b border-surface-100 flex justify-between items-center">
              <h2 className="font-semibold text-surface-900">Recent Policies</h2>
              <Link to="/dashboard/policies" className="text-sm text-primary-600 font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="divide-y divide-surface-100">
              {dummyPolicies.slice(0, 3).map(p => (
                <Link key={p.id} to={`/dashboard/policies/${p.id}`} className="flex items-center justify-between p-5 hover:bg-surface-50 transition-colors">
                  <div>
                    <p className="font-medium text-surface-900 text-sm">{p.plan_name}</p>
                    <p className="text-xs text-surface-500">{p.policy_number}</p>
                  </div>
                  <span className={p.status === 'active' ? 'badge-success' : 'badge-danger'}>{p.status}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Recent Claims */}
          <div className="card">
            <div className="p-5 border-b border-surface-100 flex justify-between items-center">
              <h2 className="font-semibold text-surface-900">Recent Claims</h2>
              <Link to="/dashboard/claims" className="text-sm text-primary-600 font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="divide-y divide-surface-100">
              {dummyClaims.map(c => (
                <Link key={c.id} to={`/dashboard/claims/${c.id}`} className="flex items-center justify-between p-5 hover:bg-surface-50 transition-colors">
                  <div>
                    <p className="font-medium text-surface-900 text-sm">{c.claim_number}</p>
                    <p className="text-xs text-surface-500">{formatINR(c.claim_amount)}</p>
                  </div>
                  <span className={c.status === 'approved' ? 'badge-success' : c.status === 'pending' ? 'badge-warning' : 'badge-danger'}>{c.status}</span>
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
