import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPayments, formatINR } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, DollarSign } from 'lucide-react'

export default function AdminPayments() {
  const totalRevenue = dummyPayments.filter((p) => p.status === 'success').reduce((acc, curr) => acc + curr.amount, 0)

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
          <h1 className="text-2xl md:text-3xl font-bold font-display">System Transactions</h1>
          <p className="text-primary-300 mt-1">Review premium billing records and transaction logs</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container space-y-6">
          {/* Revenue Header card */}
          <div className="card p-6 bg-gradient-to-br from-primary-50 to-white border-primary-100 flex items-center gap-4 max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-surface-400 font-semibold block">Total Success Payments Volume</span>
              <span className="text-2xl font-bold text-surface-900">{formatINR(totalRevenue)}</span>
            </div>
          </div>

          <div className="card">
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Transaction ID</th>
                    <th className="table-header">Policy No.</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">Method</th>
                    <th className="table-header">Date & Time</th>
                    <th className="table-header">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyPayments.map((p) => (
                    <tr key={p.id} className="table-row">
                      <td className="table-cell font-mono text-xs">{p.id.toUpperCase()}</td>
                      <td className="table-cell text-xs">{p.policy_number}</td>
                      <td className="table-cell font-semibold text-surface-900">{formatINR(p.amount)}</td>
                      <td className="table-cell text-xs">{p.payment_method}</td>
                      <td className="table-cell">
                        {new Date(p.created_at).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="table-cell">
                        {p.status === 'success' ? (
                          <span className="badge-success inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Success
                          </span>
                        ) : (
                          <span className="badge-danger inline-flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Failed
                          </span>
                        )}
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
