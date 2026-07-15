import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPolicies, formatINR } from '../../lib/dummyData'

export default function SubmitClaim() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    policyId: '',
    incidentDate: '',
    description: '',
    claimAmount: '',
  })
  const [docs, setDocs] = useState({
    bill: null,
    report: null,
    idProof: null,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const activePolicies = dummyPolicies.filter((p) => p.status === 'active')

  const handleDocUpload = (key, file) => {
    setDocs({ ...docs, [key]: file })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission to backend/storage
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

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
          <h1 className="text-2xl font-bold font-display">Submit Claim</h1>
          <p className="text-primary-300 mt-1">Provide claim details and upload supporting documents</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container max-w-3xl mx-auto">
          {success ? (
            <div className="card p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-surface-900 mb-2">Claim Filed Successfully!</h2>
              <p className="text-surface-500 mb-6">
                Your claim has been submitted to the admin team for review. You can track the status on your dashboard.
              </p>
              <Link to="/dashboard/claims" className="btn-primary">
                Go to Claims List
              </Link>
            </div>
          ) : (
            <div className="card p-6 md:p-8">
              {/* Form Steps */}
              <div className="flex items-center gap-2 mb-8">
                {['Claim Details', 'Supporting Documents', 'Submit'].map((s, i) => (
                  <div key={s} className="flex-1 flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step > i + 1
                          ? 'bg-accent-500 text-white'
                          : step === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-200 text-surface-500'
                      }`}
                    >
                      {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className="text-xs text-surface-500 hidden md:block">{s}</span>
                    {i < 2 && (
                      <div
                        className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-accent-500' : 'bg-surface-200'}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-surface-900">Enter Details</h2>
                  <div>
                    <label className="label">Select Policy</label>
                    <select
                      required
                      className="input-field"
                      value={form.policyId}
                      onChange={(e) => setForm({ ...form, policyId: e.target.value })}
                    >
                      <option value="">-- Choose Active Policy --</option>
                      {activePolicies.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.plan_name} ({p.policy_number})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Incident Date</label>
                      <input
                        required
                        type="date"
                        className="input-field"
                        value={form.incidentDate}
                        onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Estimated Claim Amount (₹)</label>
                      <input
                        required
                        type="number"
                        placeholder="e.g. 50000"
                        className="input-field"
                        value={form.claimAmount}
                        onChange={(e) => setForm({ ...form, claimAmount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Incident Description</label>
                    <textarea
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Explain what happened in detail..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!form.policyId || !form.incidentDate || !form.claimAmount || !form.description}
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900">Upload Required Documents</h2>
                  <p className="text-sm text-surface-500">
                    Please upload scanned copies/images of medical bills, discharge summaries, or accident reports.
                  </p>

                  <div className="space-y-4">
                    {[
                      { key: 'bill', name: 'Main Hospital Bill / Repair Invoice' },
                      { key: 'report', name: 'Discharge Summary / Diagnosis Report' },
                      { key: 'idProof', name: 'Patient / Owner ID Proof' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-surface-200"
                      >
                        <div>
                          <p className="text-sm font-medium text-surface-700">{item.name}</p>
                          <p className="text-xs text-surface-400">
                            {docs[item.key] ? docs[item.key].name : 'No file chosen (PDF, PNG, JPG)'}
                          </p>
                        </div>
                        <label className="btn-outline text-sm py-1.5 px-4 cursor-pointer">
                          <Upload className="w-4 h-4 mr-1.5" /> Upload
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={(e) => handleDocUpload(item.key, e.target.files[0])}
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline">
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!docs.bill || !docs.report}
                      onClick={() => setStep(3)}
                      className="btn-primary"
                    >
                      Next: Review
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900">Review Summary</h2>
                  <div className="bg-surface-50 rounded-xl p-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Policy ID</span>
                      <span className="font-semibold text-surface-900">{form.policyId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Incident Date</span>
                      <span className="font-semibold text-surface-900">{form.incidentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Claim Amount</span>
                      <span className="font-bold text-primary-600">{formatINR(form.claimAmount)}</span>
                    </div>
                    <div>
                      <p className="text-surface-500">Description</p>
                      <p className="text-surface-700 mt-1">{form.description}</p>
                    </div>
                    <hr className="border-surface-200" />
                    <div>
                      <p className="text-surface-500">Uploaded Documents</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(docs).map(([k, file]) =>
                          file ? (
                            <span
                              key={k}
                              className="text-xs px-2.5 py-1 bg-white border border-surface-200 rounded-md"
                            >
                              {file.name}
                            </span>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="btn-outline">
                      Back
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary">
                      {loading ? 'Submitting...' : 'Submit Claim'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
