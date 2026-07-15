import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { CheckCircle2, CreditCard } from 'lucide-react'
import { formatINR } from '../lib/dummyData'

export default function Payment() {
  const [status, setStatus] = useState('pending') // pending, processing, success, failed
  const handlePay = () => { setStatus('processing'); setTimeout(() => setStatus('success'), 2000) }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="py-12"><div className="page-container max-w-lg mx-auto">
        {status === 'success' ? (
          <div className="card p-10 text-center"><CheckCircle2 className="w-20 h-20 text-accent-500 mx-auto mb-4" /><h1 className="text-2xl font-bold text-surface-900 mb-2">Payment Successful!</h1><p className="text-surface-500 mb-6">Your policy has been activated. Check your email for confirmation.</p><Link to="/dashboard/policies" className="btn-primary">View My Policies</Link></div>
        ) : (
          <div className="card p-8">
            <h1 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-2"><CreditCard className="w-6 h-6 text-primary-600" /> Payment</h1>
            <div className="bg-surface-50 rounded-xl p-5 mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-surface-500">Plan</span><span className="font-semibold">SecureHealth Plus</span></div>
              <div className="flex justify-between"><span className="text-surface-500">Amount</span><span className="font-bold text-primary-600 text-lg">{formatINR(15990)}</span></div>
            </div>
            <div className="space-y-4 mb-6">
              <div><label className="label">Card Number</label><input className="input-field" placeholder="4111 1111 1111 1111" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Expiry</label><input className="input-field" placeholder="MM/YY" /></div>
                <div><label className="label">CVV</label><input className="input-field" placeholder="123" /></div>
              </div>
              <div><label className="label">Card Holder Name</label><input className="input-field" placeholder="AMIT SHARMA" /></div>
            </div>
            <button onClick={handlePay} disabled={status === 'processing'} className="btn-primary w-full">{status === 'processing' ? 'Processing...' : `Pay ${formatINR(15990)}`}</button>
            <p className="text-xs text-surface-400 text-center mt-4">Secured by Razorpay • 256-bit SSL Encryption</p>
          </div>
        )}
      </div></section>
      <Footer />
    </div>
  )
}
