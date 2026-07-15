import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Sparkles, HelpCircle, Activity, Heart, Shield, Car, Plane } from 'lucide-react'
import { formatINR } from '../../lib/dummyData'
import { motion } from 'framer-motion'

export default function Calculator() {
  const [category, setCategory] = useState('health')
  const [inputs, setInputs] = useState({
    age: 30,
    tobacco: 'no',
    medicalHistory: 'none',
    coverage: 500000,
    vehicleValue: 600000,
    vehicleAge: 1,
    travelDays: 15,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      let premium = 0
      let riskScore = 20

      if (category === 'health') {
        // Base rate
        let base = 5000
        // Age factor
        if (inputs.age > 45) {
          base += 3000
          riskScore += 25
        } else if (inputs.age > 30) {
          base += 1500
          riskScore += 10
        }
        // Tobacco multiplier
        if (inputs.tobacco === 'yes') {
          base *= 1.35
          riskScore += 30
        }
        // Medical history
        if (inputs.medicalHistory !== 'none') {
          base *= 1.25
          riskScore += 20
        }
        // Coverage amount factor
        base += (inputs.coverage / 100000) * 800
        premium = base
      } else if (category === 'life') {
        let base = 3000
        if (inputs.age > 45) {
          base += 4000
          riskScore += 35
        } else if (inputs.age > 30) {
          base += 1500
          riskScore += 15
        }
        if (inputs.tobacco === 'yes') {
          base *= 1.5
          riskScore += 30
        }
        base += (inputs.coverage / 1000000) * 1200
        premium = base
      } else if (category === 'motor') {
        // IDV (vehicle value) * factor
        let base = inputs.vehicleValue * 0.02
        if (inputs.vehicleAge > 5) {
          base *= 1.15
          riskScore += 15
        }
        premium = Math.max(2500, base)
      } else if (category === 'travel') {
        premium = 499 + inputs.travelDays * 50
      }

      setResult({
        estimatedPremium: Math.round(premium),
        riskScore: Math.min(100, riskScore),
        recommendation:
          riskScore > 50
            ? 'We recommend selecting a high-coverage plan with critical illness add-ons.'
            : 'A standard comprehensive plan fits your risk profile perfectly.',
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-accent-300 border border-white/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Engine v2.0
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-display">AI Premium Calculator</h1>
          <p className="text-primary-300 mt-1 max-w-xl mx-auto">
            Get an instant AI-estimated premium profile based on Indian underwriting risk models
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container grid lg:grid-cols-2 gap-8 max-w-5xl">
          {/* Inputs */}
          <div className="card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-surface-900 mb-5">Configure Profile</h2>
            <div className="flex gap-2 mb-6">
              {[
                { id: 'health', label: 'Health', icon: Heart },
                { id: 'life', label: 'Life', icon: Shield },
                { id: 'motor', label: 'Motor', icon: Car },
                { id: 'travel', label: 'Travel', icon: Plane },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id)
                    setResult(null)
                  }}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                    category === cat.id
                      ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-sm'
                      : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'
                  }`}
                >
                  <cat.icon className="w-5 h-5" />
                  {cat.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {category === 'health' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Age</label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        className="input-field"
                        value={inputs.age}
                        onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 18 })}
                      />
                    </div>
                    <div>
                      <label className="label">Tobacco User?</label>
                      <select
                        className="input-field"
                        value={inputs.tobacco}
                        onChange={(e) => setInputs({ ...inputs, tobacco: e.target.value })}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Medical History</label>
                    <select
                      className="input-field"
                      value={inputs.medicalHistory}
                      onChange={(e) => setInputs({ ...inputs, medicalHistory: e.target.value })}
                    >
                      <option value="none">No major pre-existing conditions</option>
                      <option value="diabetes">Diabetes</option>
                      <option value="hypertension">Hypertension</option>
                      <option value="heart">Heart disease</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Coverage Required (Sum Insured)</label>
                    <select
                      className="input-field"
                      value={inputs.coverage}
                      onChange={(e) => setInputs({ ...inputs, coverage: parseInt(e.target.value) })}
                    >
                      <option value="300000">₹3,00,000</option>
                      <option value="500000">₹5,00,000</option>
                      <option value="1000000">₹10,00,000</option>
                      <option value="2500000">₹25,00,000</option>
                    </select>
                  </div>
                </>
              )}

              {category === 'life' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Age</label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        className="input-field"
                        value={inputs.age}
                        onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 18 })}
                      />
                    </div>
                    <div>
                      <label className="label">Tobacco User?</label>
                      <select
                        className="input-field"
                        value={inputs.tobacco}
                        onChange={(e) => setInputs({ ...inputs, tobacco: e.target.value })}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Coverage Required (Sum Assured)</label>
                    <select
                      className="input-field"
                      value={inputs.coverage}
                      onChange={(e) => setInputs({ ...inputs, coverage: parseInt(e.target.value) })}
                    >
                      <option value="5000000">₹50,00,000 (50 Lakhs)</option>
                      <option value="10000000">₹1,00,00,000 (1 Crore)</option>
                      <option value="20000000">₹2,00,00,000 (2 Crores)</option>
                    </select>
                  </div>
                </>
              )}

              {category === 'motor' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Vehicle Age (Years)</label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        className="input-field"
                        value={inputs.vehicleAge}
                        onChange={(e) => setInputs({ ...inputs, vehicleAge: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="label">Vehicle Value (IDV in ₹)</label>
                      <input
                        type="number"
                        min="100000"
                        step="50000"
                        className="input-field"
                        value={inputs.vehicleValue}
                        onChange={(e) => setInputs({ ...inputs, vehicleValue: parseInt(e.target.value) || 100000 })}
                      />
                    </div>
                  </div>
                </>
              )}

              {category === 'travel' && (
                <>
                  <div>
                    <label className="label">Travel Duration (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      className="input-field"
                      value={inputs.travelDays}
                      onChange={(e) => setInputs({ ...inputs, travelDays: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? 'Analyzing Profile...' : 'Estimate Premium'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-center">
            {result ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 md:p-8 space-y-6 bg-gradient-to-br from-primary-50 to-white border-primary-100">
                <div className="text-center">
                  <span className="text-xs text-primary-500 font-semibold uppercase tracking-wider">Estimated Premium</span>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-primary-600 mt-1">
                    {formatINR(result.estimatedPremium)}
                    <span className="text-sm font-normal text-surface-500"> / year</span>
                  </h3>
                </div>

                <hr className="border-primary-100" />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-4 rounded-xl border border-primary-100">
                    <span className="text-[11px] text-surface-400 font-semibold block">Risk Score</span>
                    <span className="text-2xl font-bold text-surface-900 mt-1">{result.riskScore}%</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-primary-100 flex flex-col justify-center items-center">
                    <Activity className="w-5 h-5 text-accent-500 mb-1" />
                    <span className="text-[11px] text-surface-400 font-semibold">Underwriting Rating</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent-50/50 border border-accent-100 text-xs text-accent-800 leading-relaxed">
                  <strong>AI Recommendation:</strong> {result.recommendation}
                </div>

                <div className="flex gap-3">
                  <Link to="/plans" className="btn-primary flex-1 text-center py-3 text-sm">
                    Browse Plans
                  </Link>
                  <Link to="/ai/recommend" className="btn-secondary flex-1 text-center py-3 text-sm">
                    Get Recommender
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="card p-12 text-center text-surface-400 border-dashed border-2 flex flex-col items-center justify-center">
                <HelpCircle className="w-12 h-12 text-surface-300 mb-3" />
                <p className="text-sm font-medium">Please enter your profile details and click &quot;Estimate Premium&quot; to calculate your risk-adjusted quote.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
