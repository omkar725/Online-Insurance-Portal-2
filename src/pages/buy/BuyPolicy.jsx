import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { insurancePlans, formatINR } from '../../lib/dummyData'
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react'

export default function BuyPolicy() {
  const { planId } = useParams()
  const plan = insurancePlans.find(p => p.id === planId)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ fullName: '', dob: '', gender: '', phone: '', address: '', city: '', state: '', pincode: '', nomineeName: '', nomineeRelation: '', frequency: 'yearly' })
  const navigate = useNavigate()
  const set = (k, v) => setForm({ ...form, [k]: v })

  if (!plan) return <div className="min-h-screen bg-surface-50"><Header /><div className="page-container py-20 text-center"><h1 className="text-xl font-bold">Plan not found</h1><Link to="/plans" className="btn-primary mt-4">Browse Plans</Link></div><Footer /></div>

  const premium = form.frequency === 'monthly' ? plan.premium_monthly : plan.premium_yearly

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container"><Link to={`/plans/${planId}`} className="text-primary-300 hover:text-white text-sm flex items-center gap-1 mb-4"><ArrowLeft className="w-4 h-4" /> Back to Plan</Link><h1 className="text-2xl font-bold font-display">Buy {plan.name}</h1></div>
      </section>
      <section className="py-8"><div className="page-container max-w-3xl mx-auto">
        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">{['Personal Info', 'Nominee', 'Documents', 'Review'].map((s, i) => (
          <div key={s} className="flex-1 flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-accent-500 text-white' : step === i + 1 ? 'bg-primary-600 text-white' : 'bg-surface-200 text-surface-500'}`}>{step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}</div><span className="text-xs text-surface-500 hidden md:block">{s}</span>{i < 3 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-accent-500' : 'bg-surface-200'}`} />}</div>
        ))}</div>

        <div className="card p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label">Full Name</label><input className="input-field" placeholder="Amit Sharma" value={form.fullName} onChange={e => set('fullName', e.target.value)} /></div>
                <div><label className="label">Date of Birth</label><input type="date" className="input-field" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
                <div><label className="label">Gender</label><select className="input-field" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="label">Phone</label><input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
              </div>
              <div><label className="label">Address</label><input className="input-field" placeholder="Flat 204, Patel Nagar" value={form.address} onChange={e => set('address', e.target.value)} /></div>
              <div className="grid md:grid-cols-3 gap-4">
                <div><label className="label">City</label><input className="input-field" placeholder="Mumbai" value={form.city} onChange={e => set('city', e.target.value)} /></div>
                <div><label className="label">State</label><input className="input-field" placeholder="Maharashtra" value={form.state} onChange={e => set('state', e.target.value)} /></div>
                <div><label className="label">Pincode</label><input className="input-field" placeholder="400051" value={form.pincode} onChange={e => set('pincode', e.target.value)} /></div>
              </div>
              <div className="flex justify-end"><button onClick={() => setStep(2)} className="btn-primary">Next: Nominee Details</button></div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Nominee Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label">Nominee Name</label><input className="input-field" placeholder="Sunita Sharma" value={form.nomineeName} onChange={e => set('nomineeName', e.target.value)} /></div>
                <div><label className="label">Relationship</label><select className="input-field" value={form.nomineeRelation} onChange={e => set('nomineeRelation', e.target.value)}><option value="">Select</option><option>Spouse</option><option>Parent</option><option>Child</option><option>Sibling</option></select></div>
              </div>
              <div className="flex justify-between"><button onClick={() => setStep(1)} className="btn-outline">Back</button><button onClick={() => setStep(3)} className="btn-primary">Next: Documents</button></div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
              {['Aadhaar Card', 'PAN Card', 'Address Proof', 'Passport Photo'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-surface-200">
                  <span className="text-sm font-medium text-surface-700">{doc}</span>
                  <label className="btn-outline text-sm py-1.5 px-4 cursor-pointer"><Upload className="w-4 h-4 mr-1" /> Upload<input type="file" className="hidden" /></label>
                </div>
              ))}
              <div className="flex justify-between"><button onClick={() => setStep(2)} className="btn-outline">Back</button><button onClick={() => setStep(4)} className="btn-primary">Next: Review</button></div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Review & Pay</h2>
              <div className="bg-surface-50 rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-surface-500">Plan</span><span className="font-semibold">{plan.name}</span></div>
                <div className="flex justify-between"><span className="text-surface-500">Coverage</span><span className="font-semibold">{formatINR(plan.coverage_amount)}</span></div>
                <div><label className="label">Payment Frequency</label><select className="input-field" value={form.frequency} onChange={e => set('frequency', e.target.value)}><option value="monthly">Monthly — {formatINR(plan.premium_monthly)}/mo</option><option value="yearly">Yearly — {formatINR(plan.premium_yearly)}/yr (Save {formatINR(plan.premium_monthly * 12 - plan.premium_yearly)})</option></select></div>
                <hr className="border-surface-200" />
                <div className="flex justify-between text-base"><span className="font-semibold text-surface-900">Total Payable</span><span className="font-bold text-primary-600">{formatINR(premium)}</span></div>
              </div>
              <div className="flex justify-between"><button onClick={() => setStep(3)} className="btn-outline">Back</button><button onClick={() => navigate('/payment')} className="btn-primary">Proceed to Payment</button></div>
            </div>
          )}
        </div>
      </div></section>
      <Footer />
    </div>
  )
}
