import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2, XCircle, ArrowLeft, IndianRupee, Heart, Car, Plane, Home as HomeIcon, Building2, Calendar, Users } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { insurancePlans, categories, formatINR } from '../lib/dummyData'

const iconMap = { health: Heart, life: Shield, motor: Car, travel: Plane, home: HomeIcon, business: Building2 }

export default function PlanDetail() {
  const { planId } = useParams()
  const plan = insurancePlans.find(p => p.id === planId)

  if (!plan) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header />
        <div className="page-container py-20 text-center">
          <h1 className="text-2xl font-bold text-surface-900 mb-4">Plan Not Found</h1>
          <Link to="/plans" className="btn-primary">Browse All Plans</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = iconMap[plan.category] || Shield
  const catInfo = categories.find(c => c.id === plan.category)

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16">
        <div className="page-container">
          <Link to="/plans" className="inline-flex items-center gap-2 text-primary-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Plans
          </Link>
          <div className="flex items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${catInfo?.color || 'from-primary-500 to-primary-600'} flex items-center justify-center shadow-lg shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-primary-300 text-sm">{catInfo?.name}</span>
              <h1 className="text-3xl md:text-4xl font-bold font-display mt-1">{plan.name}</h1>
              <p className="text-primary-200 mt-2 max-w-2xl">{plan.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="page-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Benefits */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Benefits & Coverage</h2>
                <div className="space-y-3">
                  {plan.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-surface-700">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Exclusions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Exclusions</h2>
                <div className="space-y-3">
                  {plan.exclusions.map((e, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-surface-700">{e}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Terms */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Terms & Conditions</h2>
                <p className="text-sm text-surface-600 leading-relaxed">{plan.terms}</p>
              </motion.div>
            </div>

            {/* Sidebar — Pricing */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sticky top-24">
                <h3 className="font-semibold text-surface-900 mb-4">Premium Details</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-surface-50">
                    <span className="text-sm text-surface-500">Coverage Amount</span>
                    <span className="font-bold text-surface-900">{formatINR(plan.coverage_amount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-accent-50">
                    <span className="text-sm text-surface-500">Monthly Premium</span>
                    <span className="font-bold text-accent-700">{formatINR(plan.premium_monthly)}/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-primary-50">
                    <span className="text-sm text-surface-500">Yearly Premium</span>
                    <span className="font-bold text-primary-700">{formatINR(plan.premium_yearly)}/yr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-surface-50">
                    <span className="text-sm text-surface-500">Eligible Age</span>
                    <span className="font-semibold text-surface-700">{plan.min_age} — {plan.max_age} years</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link to={`/buy/${plan.id}`} className="btn-primary w-full text-center">Buy This Plan</Link>
                  <Link to={`/compare?plans=${plan.id}`} className="btn-secondary w-full text-center">Add to Compare</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
