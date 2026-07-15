import { useParams, Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPolicies, dummyPayments, formatINR } from '../../lib/dummyData'
import { ArrowLeft, Shield, Calendar, User, FileText } from 'lucide-react'

export default function PolicyDetail() {
  const { policyId } = useParams()
  const policy = dummyPolicies.find(p => p.id === policyId)
  if (!policy) return <div className="min-h-screen bg-surface-50"><Header /><div className="page-container py-20 text-center"><h1 className="text-xl font-bold">Policy not found</h1><Link to="/dashboard/policies" className="btn-primary mt-4">Back to Policies</Link></div><Footer /></div>

  const payments = dummyPayments.filter(p => p.policy_id === policyId)

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <Link to="/dashboard/policies" className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <h1 className="text-2xl font-bold font-display">{policy.plan_name}</h1>
          <p className="text-primary-300 mt-1">{policy.policy_number}</p>
        </div>
      </section>
      <section className="py-8"><div className="page-container grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Policy Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[['Status', <span className={policy.status === 'active' ? 'badge-success' : 'badge-danger'}>{policy.status}</span>], ['Category', <span className="capitalize">{policy.category}</span>], ['Premium', formatINR(policy.premium_amount) + '/yr'], ['Start Date', new Date(policy.start_date).toLocaleDateString('en-IN')], ['End Date', new Date(policy.end_date).toLocaleDateString('en-IN')], ['Nominee', policy.nominee_name], ['Relation', policy.nominee_relation]].map(([l, v]) => (
                <div key={l}><p className="text-surface-500">{l}</p><p className="font-medium text-surface-900 mt-0.5">{v}</p></div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Payment History</h2>
            {payments.length === 0 ? <p className="text-surface-500 text-sm">No payments found.</p> : (
              <div className="space-y-3">{payments.map(p => (
                <div key={p.id} className="flex justify-between items-center p-3 rounded-xl bg-surface-50">
                  <div><p className="text-sm font-medium text-surface-900">{formatINR(p.amount)}</p><p className="text-xs text-surface-500">{new Date(p.created_at).toLocaleDateString('en-IN')} • {p.payment_method}</p></div>
                  <span className={p.status === 'success' ? 'badge-success' : 'badge-danger'}>{p.status}</span>
                </div>
              ))}</div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {policy.status === 'active' && <Link to={`/dashboard/renew/${policy.id}`} className="btn-primary w-full text-center">Renew Policy</Link>}
          <Link to="/dashboard/claims/new" className="btn-secondary w-full text-center">File a Claim</Link>
        </div>
      </div></section>
      <Footer />
    </div>
  )
}
