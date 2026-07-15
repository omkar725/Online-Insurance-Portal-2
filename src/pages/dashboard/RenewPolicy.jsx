import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPolicies, formatINR } from '../../lib/dummyData'
import { ArrowLeft, RefreshCw, Shield, AlertTriangle } from 'lucide-react'

export default function RenewPolicy() {
  const { policyId } = useParams()
  const navigate = useNavigate()
  const policy = dummyPolicies.find((p) => p.id === policyId)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!policy) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header />
        <div className="page-container py-20 text-center">
          <h1 className="text-xl font-bold">Policy not found</h1>
          <Link to="/dashboard/policies" className="btn-primary mt-4">
            Back to Policies
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleRenew = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate payment / renewal success
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  // Renewed policies usually have a small adjustment or identical premium
  const renewalPremium = policy.premium_amount

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <Link
            to={`/dashboard/policies/${policyId}`}
            className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Details
          </Link>
          <h1 className="text-2xl font-bold font-display">Renew Policy</h1>
          <p className="text-primary-300 mt-1">Review your coverage and pay renewal premium</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container max-w-2xl mx-auto">
          {success ? (
            <div className="card p-8 text-center">
              <RefreshCw className="w-16 h-16 text-accent-500 mx-auto mb-4 animate-spin-slow" />
              <h2 className="text-2xl font-bold text-surface-900 mb-2">Policy Renewed Successfully!</h2>
              <p className="text-surface-500 mb-6">
                Your policy <strong>{policy.policy_number}</strong> has been successfully renewed. Your new coverage period is active.
              </p>
              <Link to="/dashboard/policies" className="btn-primary">
                View My Policies
              </Link>
            </div>
          ) : (
            <div className="card p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800">
                  Ensure all details below are reviewed before processing payment. Renewals are final and instant.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-surface-50 p-4 rounded-xl">
                  <div>
                    <span className="text-surface-500">Plan Name</span>
                    <p className="font-semibold text-surface-900 mt-0.5">{policy.plan_name}</p>
                  </div>
                  <div>
                    <span className="text-surface-500">Policy Number</span>
                    <p className="font-semibold text-surface-900 mt-0.5">{policy.policy_number}</p>
                  </div>
                  <div>
                    <span className="text-surface-500">Current Expiry</span>
                    <p className="font-semibold text-surface-900 mt-0.5">{new Date(policy.end_date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-surface-500">New Expiry</span>
                    <p className="font-semibold text-accent-600 mt-0.5">
                      {new Date(new Date(policy.end_date).setFullYear(new Date(policy.end_date).getFullYear() + 1)).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-b border-surface-200">
                  <div>
                    <p className="font-medium text-surface-900">Renewal Premium</p>
                    <p className="text-xs text-surface-500">Includes 18% GST (Indian tax compliance)</p>
                  </div>
                  <p className="text-xl font-bold text-primary-600">{formatINR(renewalPremium)}</p>
                </div>
              </div>

              <form onSubmit={handleRenew} className="space-y-4">
                <div className="flex items-center gap-2">
                  <input required type="checkbox" id="terms" className="w-4 h-4 accent-primary-600" />
                  <label htmlFor="terms" className="text-xs text-surface-600 cursor-pointer">
                    I confirm that there is no change in my health status/details and agree to renewal terms.
                  </label>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading ? 'Processing...' : `Renew & Pay ${formatINR(renewalPremium)}`}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
