import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { motion } from 'framer-motion'
import { Shield, Target, Users, Award, Clock, CheckCircle2 } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'We believe in complete honesty. No hidden charges, no fine-print surprises.' },
  { icon: Target, title: 'Customer First', desc: 'Every decision we make puts our customers\' needs and experience at the centre.' },
  { icon: Users, title: 'Community Driven', desc: 'Built by Indians, for Indians. We understand the unique insurance needs of our country.' },
  { icon: Award, title: 'IRDAI Compliant', desc: 'Fully licensed and regulated. Your policies are backed by IRDAI-approved insurers.' },
]

const milestones = [
  { year: '2020', title: 'Founded in Mumbai', desc: 'Started with a vision to simplify insurance for every Indian.' },
  { year: '2021', title: '1 Lakh Users', desc: 'Crossed 1,00,000 registered users within the first year.' },
  { year: '2022', title: 'AI Integration', desc: 'Launched AI-powered premium calculator and recommendation engine.' },
  { year: '2023', title: '45+ Partners', desc: 'Partnered with 45+ leading insurance companies across India.' },
  { year: '2024', title: '98.7% Settlement', desc: 'Achieved industry-leading claim settlement ratio.' },
  { year: '2025', title: '2.5 Lakh Users', desc: 'Serving over 2,50,000 happy customers across 500+ cities.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-80 h-80 bg-accent-400 rounded-full blur-[120px]" />
        </div>
        <div className="page-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">About OnlineInsurance</h1>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              India&apos;s most trusted insurance comparison and purchase platform. Making insurance accessible, affordable, and understandable for every Indian.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title mb-6">Our <span className="gradient-text">Mission</span></h2>
              <p className="text-surface-600 leading-relaxed mb-4">
                At OnlineInsurance, we believe every Indian deserves access to the right insurance — without confusion, without middlemen, and without overpaying.
              </p>
              <p className="text-surface-600 leading-relaxed mb-6">
                We leverage cutting-edge AI technology to help you compare plans, estimate premiums, and get personalised recommendations — all from the comfort of your home.
              </p>
              <div className="space-y-3">
                {['Compare 100+ plans from 45+ insurers', 'AI-powered premium estimation', 'Instant digital policy purchase', '98.7% claim settlement rate', 'Dedicated support in Hindi & English'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                    <span className="text-surface-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary-100 to-accent-50 rounded-3xl p-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center mx-auto mb-4 shadow-premium">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <p className="text-3xl font-bold font-display text-primary-700">OnlineInsurance</p>
                <p className="text-surface-500 mt-1">Secure. Compare. Protect.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">Our <span className="gradient-text">Values</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-surface-900 mb-2">{v.title}</h3>
                <p className="text-sm text-surface-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">Our <span className="gradient-text">Journey</span></h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-primary-100 mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-primary-600 mb-1">{m.year}</p>
                  <h3 className="font-semibold text-surface-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-surface-500">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
