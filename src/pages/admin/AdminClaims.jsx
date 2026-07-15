import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyClaims, formatINR } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react'

export default function AdminClaims() {
  const [claims, setClaims] = useState(dummyClaims)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [comments, setComments] = useState('')

  const handleAction = (status) => {
    if (!selectedClaim) return
    setClaims(
      claims.map((c) => {
        if (c.id === selectedClaim.id) {
          return {
            ...c,
            status,
            admin_comments: comments || `${status.toUpperCase()} by Admin on ${new Date().toLocaleDateString()}`,
            resolved_at: new Date().toISOString(),
            approved_amount: status === 'approved' ? c.claim_amount : null,
          }
        }
        return c
      })
    )
    setSelectedClaim(null)
    setComments('')
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <Link
            to="/admin"
            className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Assess Claims</h1>
          <p className="text-primary-300 mt-1">Review, approve or reject claims submitted by policyholders</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="table-container">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="table-header">Claim ID</th>
                      <th className="table-header">Policy No.</th>
                      <th className="table-header">Claim Amount</th>
                      <th className="table-header">Date</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((c) => (
                      <tr key={c.id} className="table-row">
                        <td className="table-cell font-mono text-xs">{c.claim_number}</td>
                        <td className="table-cell text-xs">{c.policy_number}</td>
                        <td className="table-cell font-semibold text-surface-900">{formatINR(c.claim_amount)}</td>
                        <td className="table-cell">{new Date(c.incident_date).toLocaleDateString('en-IN')}</td>
                        <td className="table-cell">
                          {c.status === 'approved' && <span className="badge-success">Approved</span>}
                          {c.status === 'pending' && <span className="badge-warning">Pending</span>}
                          {c.status === 'rejected' && <span className="badge-danger">Rejected</span>}
                        </td>
                        <td className="table-cell">
                          <button
                            onClick={() => {
                              setSelectedClaim(c)
                              setComments(c.admin_comments || '')
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-surface-200 hover:bg-surface-50 transition-all text-surface-700"
                          >
                            <Eye className="w-3.5 h-3.5" /> Assess
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            {selectedClaim ? (
              <div className="card p-6 space-y-5 bg-white sticky top-24">
                <div className="flex justify-between items-center pb-3 border-b border-surface-100">
                  <h3 className="font-semibold text-surface-900">Assess Request</h3>
                  <span className="font-mono text-xs text-surface-500">{selectedClaim.claim_number}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-surface-400 block">Policy Number</span>
                    <span className="font-medium text-surface-800 mt-0.5 block">{selectedClaim.policy_number}</span>
                  </div>
                  <div>
                    <span className="text-surface-400 block">Incident Date</span>
                    <span className="font-medium text-surface-800 mt-0.5 block">
                      {new Date(selectedClaim.incident_date).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-400 block">Claim Amount Requested</span>
                    <span className="font-bold text-primary-600 mt-0.5 block">{formatINR(selectedClaim.claim_amount)}</span>
                  </div>
                  <div>
                    <span className="text-surface-400 block">Incident Description</span>
                    <p className="text-surface-600 mt-1 leading-relaxed bg-surface-50 p-2.5 rounded-lg">
                      {selectedClaim.incident_description}
                    </p>
                  </div>
                </div>

                {selectedClaim.status === 'pending' ? (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="label text-xs">Assessment Comments</label>
                      <textarea
                        rows={3}
                        className="input-field text-xs resize-none"
                        placeholder="Add reason for approval or rejection..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAction('rejected')}
                        className="btn-danger text-xs py-2 px-3 flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                      <button
                        onClick={() => handleAction('approved')}
                        className="btn-accent text-xs py-2 px-3 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-xs">
                    <p className="text-surface-400">Resolution Comments</p>
                    <p className="font-medium text-surface-700 mt-1 italic">{selectedClaim.admin_comments}</p>
                    {selectedClaim.resolved_at && (
                      <p className="text-[10px] text-surface-400 mt-2">
                        Resolved on {new Date(selectedClaim.resolved_at).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-8 text-center text-surface-400 border-dashed border-2 flex flex-col items-center justify-center h-48 sticky top-24">
                <Clock className="w-8 h-8 text-surface-300 mb-2" />
                <p className="text-xs">Select a claim from the table to assess, add comments, approve or reject.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
