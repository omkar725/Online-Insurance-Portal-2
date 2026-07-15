import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPayments, formatINR } from '../../lib/dummyData'
import { CreditCard, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PaymentHistory() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold font-display">Payment History</h1>
          <p className="text-primary-300 mt-1">View all your transactions and premium receipts</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container">
          <div className="card">
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Transaction ID</th>
                    <th className="table-header">Policy Number</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">Payment Method</th>
                    <th className="table-header">Date & Time</th>
                    <th className="table-header">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyPayments.map((p) => (
                    <tr key={p.id} className="table-row">
                      <td className="table-cell font-mono text-xs">{p.id.toUpperCase()}</td>
                      <td className="table-cell">{p.policy_number}</td>
                      <td className="table-cell font-semibold text-surface-900">{formatINR(p.amount)}</td>
                      <td className="table-cell">{p.payment_method}</td>
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
