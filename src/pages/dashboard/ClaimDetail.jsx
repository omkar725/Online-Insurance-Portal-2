import { useParams, Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyClaims, formatINR } from '../../lib/dummyData'
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, FileText, User, Calendar } from 'lucide-react'

export default function ClaimDetail() {
  const { claimId } = useParams()
  const claim = dummyClaims.find((c) => c.id === claimId)

  if (!claim) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header />
        <div className="page-container py-20 text-center">
          <h1 className="text-xl font-bold">Claim not found</h1>
          <Link to="/dashboard/claims" className="btn-primary mt-4">
            Back to Claims
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Define steps
  const steps = [
    { title: 'Claim Submitted', desc: 'Your claim request has been received.', date: claim.submitted_at, status: 'completed' },
    {
      title: 'Under Review',
      desc: 'Our claims adjustment officer is reviewing the documents.',
      date: claim.submitted_at, // Use submitted_at as proxy for active review start
      status: claim.status === 'pending' ? 'active' : 'completed',
    },
    {
      title: claim.status === 'rejected' ? 'Claim Rejected' : 'Claim Approved',
      desc: claim.admin_comments || 'Decision made based on submitted documents.',
      date: claim.resolved_at,
      status: claim.status === 'pending' ? 'upcoming' : 'completed',
    },
    {
      title: 'Settled',
      desc: claim.status === 'approved' ? `Amount of ${formatINR(claim.approved_amount)} credited.` : 'Claim resolution completed.',
      date: claim.resolved_at,
      status: claim.status === 'approved' ? 'completed' : claim.status === 'pending' ? 'upcoming' : 'cancelled',
    },
  ]

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <Link
            to="/dashboard/claims"
            className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Claims
          </Link>
          <h1 className="text-2xl font-bold font-display">Claim Tracking</h1>
          <p className="text-primary-300 mt-1">{claim.claim_number}</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container grid lg:grid-cols-3 gap-6">
          {/* Timeline tracker */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="font-semibold text-surface-900 mb-6">Status Tracker</h2>
              <div className="relative border-l-2 border-surface-200 ml-4 pl-8 space-y-8">
                {steps.map((s, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white ${
                        s.status === 'completed'
                          ? 'border-accent-500 bg-accent-50 text-accent-500'
                          : s.status === 'active'
                          ? 'border-primary-500 text-primary-500 animate-pulse'
                          : s.status === 'cancelled'
                          ? 'border-red-400 bg-red-50 text-red-400'
                          : 'border-surface-200 text-surface-400'
                      }`}
                    >
                      {s.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 fill-accent-500 text-white" />}
                      {s.status === 'active' && <Clock className="w-3.5 h-3.5" />}
                      {s.status === 'cancelled' && <AlertTriangle className="w-3.5 h-3.5" />}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-semibold text-surface-900 text-sm">{s.title}</h3>
                      <p className="text-xs text-surface-500 mt-0.5">{s.desc}</p>
                      {s.date && (
                        <p className="text-[10px] text-surface-400 mt-1 font-mono">
                          {new Date(s.date).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Claims summary */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-semibold text-surface-900 mb-4">Claim Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-surface-500">Incident Date</span>
                  <p className="font-semibold text-surface-900">{new Date(claim.incident_date).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-surface-500">Claim Amount</span>
                  <p className="font-bold text-primary-600">{formatINR(claim.claim_amount)}</p>
                </div>
                {claim.approved_amount && (
                  <div>
                    <span className="text-surface-500">Approved Amount</span>
                    <p className="font-bold text-accent-600">{formatINR(claim.approved_amount)}</p>
                  </div>
                )}
                <div>
                  <span className="text-surface-500">Description</span>
                  <p className="text-surface-700 mt-1">{claim.incident_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
