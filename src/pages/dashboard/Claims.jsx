import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyClaims, formatINR } from '../../lib/dummyData'
import { FileText, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Claims() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">My Claims</h1>
            <p className="text-primary-300 mt-1">Track and submit your insurance claims</p>
          </div>
          <div>
            <Link to="/dashboard/claims/new" className="btn-accent inline-flex items-center gap-2">
              <Plus className="w-5 h-5" /> File New Claim
            </Link>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container">
          <div className="card">
            {dummyClaims.length === 0 ? (
              <div className="p-12 text-center text-surface-500">
                <FileText className="w-12 h-12 mx-auto text-surface-300 mb-3" />
                <p>No claims filed yet.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="table-header">Claim ID</th>
                      <th className="table-header">Policy Number</th>
                      <th className="table-header">Claim Amount</th>
                      <th className="table-header">Incident Date</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyClaims.map((c) => (
                      <tr key={c.id} className="table-row">
                        <td className="table-cell font-mono text-xs">{c.claim_number}</td>
                        <td className="table-cell">{c.policy_number}</td>
                        <td className="table-cell font-semibold text-surface-900">{formatINR(c.claim_amount)}</td>
                        <td className="table-cell">{new Date(c.incident_date).toLocaleDateString('en-IN')}</td>
                        <td className="table-cell">
                          {c.status === 'approved' && (
                            <span className="badge-success inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          )}
                          {c.status === 'pending' && (
                            <span className="badge-warning inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Under Review
                            </span>
                          )}
                          {c.status === 'rejected' && (
                            <span className="badge-danger inline-flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Rejected
                            </span>
                          )}
                        </td>
                        <td className="table-cell">
                          <Link to={`/dashboard/claims/${c.id}`} className="text-primary-600 font-semibold hover:underline">
                            Track Status
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
