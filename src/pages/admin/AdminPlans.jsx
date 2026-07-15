import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { insurancePlans, formatINR } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Eye, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminPlans() {
  const [plans, setPlans] = useState(insurancePlans)

  const handleTogglePlan = (id) => {
    setPlans(
      plans.map((p) => {
        if (p.id === id) {
          return { ...p, is_active: !p.is_active }
        }
        return p
      })
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link
              to="/admin"
              className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Manage Plans</h1>
            <p className="text-primary-300 mt-1">Configure active plans, coverage terms, and pricing rates</p>
          </div>
          <div>
            <button className="btn-accent inline-flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add New Plan
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container">
          <div className="card">
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Plan Name</th>
                    <th className="table-header">Category</th>
                    <th className="table-header">Coverage Amount</th>
                    <th className="table-header">Premium (Yearly)</th>
                    <th className="table-header">Age Limit</th>
                    <th className="table-header">Visibility</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p) => (
                    <tr key={p.id} className="table-row">
                      <td className="table-cell font-semibold text-surface-900">{p.name}</td>
                      <td className="table-cell capitalize text-xs">{p.category}</td>
                      <td className="table-cell">{formatINR(p.coverage_amount)}</td>
                      <td className="table-cell font-medium text-accent-700">{formatINR(p.premium_yearly)}/yr</td>
                      <td className="table-cell text-xs">
                        {p.min_age} — {p.max_age} yrs
                      </td>
                      <td className="table-cell">
                        <span className={p.is_active ? 'badge-success' : 'badge-danger'}>
                          {p.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleTogglePlan(p.id)}
                            className="text-surface-500 hover:text-primary-600 transition-colors"
                            title="Toggle Visibility"
                          >
                            {p.is_active ? (
                              <ToggleRight className="w-6 h-6 text-primary-600" />
                            ) : (
                              <ToggleLeft className="w-6 h-6 text-surface-400" />
                            )}
                          </button>
                          <Link
                            to={`/plans/${p.id}`}
                            className="text-surface-400 hover:text-surface-600 transition-colors"
                            title="View Public Details"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
