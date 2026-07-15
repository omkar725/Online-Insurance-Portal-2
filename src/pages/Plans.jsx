import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Heart, Shield, Car, Plane, Home as HomeIcon, Building2, ChevronRight, IndianRupee } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { insurancePlans, categories, formatINR } from '../lib/dummyData'

const iconMap = { health: Heart, life: Shield, motor: Car, travel: Plane, home: HomeIcon, business: Building2 }

export default function Plans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let plans = insurancePlans.filter(p => p.is_active)
    if (activeCategory !== 'all') plans = plans.filter(p => p.category === activeCategory)
    if (search) plans = plans.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    return plans
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16 md:py-20">
        <div className="page-container text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Insurance Plans</h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">Browse and compare the best insurance plans curated for India.</p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="page-container">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input type="text" placeholder="Search plans..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-11" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setSearchParams({})} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-surface-600 hover:bg-surface-50 border border-surface-200'}`}>
              All Plans
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSearchParams({ category: cat.id })} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-surface-600 hover:bg-surface-50 border border-surface-200'}`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Plans Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-surface-500 text-lg">No plans found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((plan, i) => {
                const Icon = iconMap[plan.category] || Shield
                const catInfo = categories.find(c => c.id === plan.category)
                return (
                  <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className="card-hover h-full flex flex-col">
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${catInfo?.color || 'from-primary-500 to-primary-600'} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="badge-info text-[10px]">{catInfo?.name}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">{plan.name}</h3>
                        <p className="text-sm text-surface-500 mb-4 line-clamp-2">{plan.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-surface-500">Coverage</span>
                            <span className="font-semibold text-surface-900">{formatINR(plan.coverage_amount)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-surface-500">Monthly Premium</span>
                            <span className="font-semibold text-accent-600">{formatINR(plan.premium_monthly)}/mo</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {plan.benefits.slice(0, 3).map((b, j) => (
                            <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-50 text-surface-600 border border-surface-100 truncate max-w-[180px]">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 pt-0 flex gap-3">
                        <Link to={`/plans/${plan.id}`} className="btn-secondary text-sm flex-1 text-center py-2.5">View Details</Link>
                        <Link to={`/buy/${plan.id}`} className="btn-primary text-sm flex-1 text-center py-2.5">Buy Now</Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
