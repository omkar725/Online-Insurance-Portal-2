import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftRight, CheckCircle2, XCircle, X, Plus } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { insurancePlans, formatINR } from '../lib/dummyData'

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState([])

  const selectedPlans = useMemo(() => insurancePlans.filter(p => selectedIds.includes(p.id)), [selectedIds])
  const available = insurancePlans.filter(p => p.is_active && !selectedIds.includes(p.id))

  const addPlan = (id) => { if (selectedIds.length < 3) setSelectedIds([...selectedIds, id]) }
  const removePlan = (id) => setSelectedIds(selectedIds.filter(i => i !== id))

  const fields = [
    { label: 'Category', key: 'category' },
    { label: 'Coverage', key: 'coverage_amount', format: formatINR },
    { label: 'Monthly Premium', key: 'premium_monthly', format: v => formatINR(v) + '/mo' },
    { label: 'Yearly Premium', key: 'premium_yearly', format: v => formatINR(v) + '/yr' },
    { label: 'Age Range', key: null, render: p => `${p.min_age} — ${p.max_age} yrs` },
  ]

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16">
        <div className="page-container text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Compare Plans</h1>
          <p className="text-primary-200 text-lg">Select up to 3 plans to compare side-by-side.</p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="page-container">
          {/* Plan Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {selectedPlans.map(p => (
              <span key={p.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium border border-primary-200">
                {p.name}
                <button onClick={() => removePlan(p.id)}><X className="w-4 h-4" /></button>
              </span>
            ))}
            {selectedIds.length < 3 && (
              <select onChange={e => { if (e.target.value) addPlan(e.target.value); e.target.value = '' }} className="input-field w-auto text-sm" defaultValue="">
                <option value="" disabled>+ Add a plan</option>
                {available.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
          </div>

          {selectedPlans.length < 2 ? (
            <div className="card p-12 text-center">
              <ArrowLeftRight className="w-16 h-16 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500 text-lg mb-2">Select at least 2 plans to compare</p>
              <Link to="/plans" className="btn-primary mt-4 inline-flex">Browse Plans</Link>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="table-container">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="table-header w-40">Feature</th>
                    {selectedPlans.map(p => (
                      <th key={p.id} className="table-header text-center">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map(f => (
                    <tr key={f.label} className="table-row">
                      <td className="table-cell font-medium text-surface-900">{f.label}</td>
                      {selectedPlans.map(p => (
                        <td key={p.id} className="table-cell text-center">
                          {f.render ? f.render(p) : f.format ? f.format(p[f.key]) : p[f.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="table-row">
                    <td className="table-cell font-medium text-surface-900">Key Benefits</td>
                    {selectedPlans.map(p => (
                      <td key={p.id} className="px-4 py-4 align-top">
                        <div className="space-y-1.5">
                          {p.benefits.slice(0, 5).map((b, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-surface-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent-500 shrink-0 mt-0.5" /> {b}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="table-row">
                    <td className="table-cell font-medium text-surface-900">Exclusions</td>
                    {selectedPlans.map(p => (
                      <td key={p.id} className="px-4 py-4 align-top">
                        <div className="space-y-1.5">
                          {p.exclusions.slice(0, 4).map((e, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-surface-600">
                              <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" /> {e}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="table-row">
                    <td className="table-cell"></td>
                    {selectedPlans.map(p => (
                      <td key={p.id} className="table-cell text-center">
                        <Link to={`/buy/${p.id}`} className="btn-primary text-sm px-5 py-2">Buy Now</Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
