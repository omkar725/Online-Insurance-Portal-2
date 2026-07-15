import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, RefreshCw, Star } from 'lucide-react'
import { insurancePlans, formatINR } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Recommend() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    ageGroup: '',
    incomeGroup: '',
    familyType: '',
    primaryGoal: '',
    lifestyle: [],
  })
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)

  const handleCheckbox = (val) => {
    if (form.lifestyle.includes(val)) {
      setForm({ ...form, lifestyle: form.lifestyle.filter((v) => v !== val) })
    } else {
      setForm({ ...form, lifestyle: [...form.lifestyle, val] })
    }
  }

  const getRecommendations = () => {
    setLoading(true)
    setTimeout(() => {
      // Logic matching dummy insurance plans
      let recommended = []
      if (form.primaryGoal === 'family') {
        recommended = [
          {
            plan: insurancePlans.find((p) => p.id === 'plan-health-02'), // Family Health Shield
            matchScore: 98,
            reason: 'Perfect fit for family hospitalization requirements with maternity benefits.',
          },
          {
            plan: insurancePlans.find((p) => p.id === 'plan-life-01'), // LifeGuard Term Plan
            matchScore: 92,
            reason: 'Essential term protection to secure family members against financial instability.',
          },
        ]
      } else if (form.primaryGoal === 'tax') {
        recommended = [
          {
            plan: insurancePlans.find((p) => p.id === 'plan-life-01'), // LifeGuard Term Plan
            matchScore: 96,
            reason: 'High tax savings eligibility under Section 80C and Section 10(10D).',
          },
          {
            plan: insurancePlans.find((p) => p.id === 'plan-health-01'), // SecureHealth Plus
            matchScore: 88,
            reason: 'Health insurance premiums are tax-deductible under Section 80D.',
          },
        ]
      } else if (form.primaryGoal === 'wealth') {
        recommended = [
          {
            plan: insurancePlans.find((p) => p.id === 'plan-life-01'), // LifeGuard Term Plan
            matchScore: 94,
            reason: 'Essential pure risk protection to cover liabilities.',
          },
          {
            plan: insurancePlans.find((p) => p.id === 'plan-business-01'), // VyaparSuraksha Business Plan
            matchScore: 82,
            reason: 'Protects business wealth, assets, and liabilities against incidents.',
          },
        ]
      } else {
        // Default / Health-focused
        recommended = [
          {
            plan: insurancePlans.find((p) => p.id === 'plan-health-01'), // SecureHealth Plus
            matchScore: 95,
            reason: 'Ideal individual health cover with a wide network of cashless hospitals.',
          },
          {
            plan: insurancePlans.find((p) => p.id === 'plan-motor-01'), // DriveShield Comprehensive
            matchScore: 85,
            reason: 'Comprehensive protection for your primary commute vehicle.',
          },
        ]
      }

      setRecommendations(recommended)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-accent-300 border border-white/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Engine
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-display">AI Policy Recommender</h1>
          <p className="text-primary-300 mt-1 max-w-xl mx-auto">
            Get personalized policy recommendations matches in under 2 minutes
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container max-w-3xl mx-auto">
          {recommendations ? (
            <div className="space-y-6">
              <div className="card p-6 border-accent-100 bg-accent-50/20 text-center">
                <CheckCircle2 className="w-12 h-12 text-accent-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-surface-900">Your AI Recommended Matches</h2>
                <p className="text-sm text-surface-500 mt-1">Based on your family, income and lifestyle parameters</p>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={rec.plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-l-4 border-l-primary-500"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="badge bg-primary-100 text-primary-700 font-bold">{rec.matchScore}% MATCH</span>
                        <span className="text-xs text-surface-400 capitalize">{rec.plan.category} Insurance</span>
                      </div>
                      <h3 className="text-lg font-bold text-surface-900">{rec.plan.name}</h3>
                      <p className="text-sm text-surface-600 leading-relaxed">{rec.plan.description}</p>
                      <div className="p-3 bg-surface-50 rounded-xl text-xs text-surface-600 mt-2">
                        <strong>AI Analysis:</strong> {rec.reason}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0 w-full md:w-auto">
                      <div className="text-right">
                        <p className="text-xs text-surface-400">Estimated Premium</p>
                        <p className="text-lg font-bold text-primary-600">{formatINR(rec.plan.premium_monthly)}/mo</p>
                      </div>
                      <Link to={`/buy/${rec.plan.id}`} className="btn-primary text-xs w-full md:w-auto py-2 px-5">
                        Buy Now
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setRecommendations(null)
                    setStep(1)
                  }}
                  className="btn-outline text-xs"
                >
                  <RefreshCw className="w-4 h-4 mr-1.5" /> Retake Survey
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-6 md:p-8">
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-8">
                {['Age & Income', 'Family', 'Primary Goal', 'Lifestyle'].map((s, i) => (
                  <div key={s} className="flex-1 flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step > i + 1
                          ? 'bg-accent-500 text-white'
                          : step === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-200 text-surface-500'
                      }`}
                    >
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className="text-[10px] text-surface-400 hidden md:block">{s}</span>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-accent-500' : 'bg-surface-200'}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-surface-900">Demographic Profile</h2>
                  <div>
                    <label className="label">What is your age?</label>
                    <select
                      className="input-field"
                      value={form.ageGroup}
                      onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                    >
                      <option value="">Select Age</option>
                      <option value="18-25">18 — 25 years</option>
                      <option value="26-35">26 — 35 years</option>
                      <option value="36-45">36 — 45 years</option>
                      <option value="46-60">46 — 60 years</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">What is your annual household income?</label>
                    <select
                      className="input-field"
                      value={form.incomeGroup}
                      onChange={(e) => setForm({ ...form, incomeGroup: e.target.value })}
                    >
                      <option value="">Select Income</option>
                      <option value="below-5l">Below ₹5 Lakhs</option>
                      <option value="5l-10l">₹5 Lakhs — ₹10 Lakhs</option>
                      <option value="10l-20l">₹10 Lakhs — ₹20 Lakhs</option>
                      <option value="above-20l">Above ₹20 Lakhs</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      disabled={!form.ageGroup || !form.incomeGroup}
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-surface-900">Family Setup</h2>
                  <div>
                    <label className="label">Who are you looking to insure?</label>
                    <select
                      className="input-field"
                      value={form.familyType}
                      onChange={(e) => setForm({ ...form, familyType: e.target.value })}
                    >
                      <option value="">Select Family Type</option>
                      <option value="self">Only Me</option>
                      <option value="couple">Me and Spouse</option>
                      <option value="nuclear">Me, Spouse and Kids</option>
                      <option value="parents">Me, Spouse, Kids and Parents</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="btn-outline">
                      Back
                    </button>
                    <button disabled={!form.familyType} onClick={() => setStep(3)} className="btn-primary">
                      Continue <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-surface-900">Primary Goal</h2>
                  <div>
                    <label className="label">What is your primary goal for buying insurance?</label>
                    <select
                      className="input-field"
                      value={form.primaryGoal}
                      onChange={(e) => setForm({ ...form, primaryGoal: e.target.value })}
                    >
                      <option value="">Select Goal</option>
                      <option value="health">Cover health emergencies & hospitalization costs</option>
                      <option value="family">Protect family&apos;s financial future (pure term plan)</option>
                      <option value="tax">Save income taxes under Sec 80C/80D</option>
                      <option value="wealth">Protect assets/liabilities (home/business)</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="btn-outline">
                      Back
                    </button>
                    <button disabled={!form.primaryGoal} onClick={() => setStep(4)} className="btn-primary">
                      Continue <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900">Lifestyle & Risks</h2>
                  <div className="space-y-3">
                    <label className="label">Select all applicable lifestyle details:</label>
                    {[
                      { val: 'smoke', label: 'Tobacco user / smoker' },
                      { val: 'travel', label: 'Frequent international traveler' },
                      { val: 'owner', label: 'Own a car or two-wheeler' },
                      { val: 'business', label: 'Own a registered business / enterprise' },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className="flex items-center gap-3 p-4 rounded-xl border border-surface-200 hover:bg-surface-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4.5 h-4.5 accent-primary-600 rounded"
                          checked={form.lifestyle.includes(item.val)}
                          onChange={() => handleCheckbox(item.val)}
                        />
                        <span className="text-sm font-medium text-surface-700">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(3)} className="btn-outline">
                      Back
                    </button>
                    <button onClick={getRecommendations} disabled={loading} className="btn-primary">
                      {loading ? 'Running AI Matcher...' : 'Generate Recommendations'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
