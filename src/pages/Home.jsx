import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, CheckCircle2, Heart, Car, Plane, Home as HomeIcon, Building2, Sparkles, Scale, FileCheck, Lock, Star, ChevronRight, Zap } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { testimonials, trustStats, categories, formatINR } from '../lib/dummyData'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

const iconMap = { Heart, Shield, Car, Plane, Home: HomeIcon, Building2 }

const features = [
  { icon: Scale, title: 'Compare Plans', desc: 'Side-by-side comparison of premiums, coverage, and benefits across providers.', color: 'from-blue-500 to-indigo-600' },
  { icon: Sparkles, title: 'AI-Powered', desc: 'Get personalised plan recommendations and premium estimates using AI.', color: 'from-violet-500 to-purple-600' },
  { icon: FileCheck, title: 'Instant Claims', desc: 'Submit and track claims digitally. Average settlement in 3-5 business days.', color: 'from-emerald-500 to-teal-600' },
  { icon: Lock, title: '100% Secure', desc: 'Bank-grade encryption protects your data. IRDAI compliant platform.', color: 'from-amber-500 to-orange-600' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-[128px]" />
        </div>
        <div className="page-container relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-amber-400" /> Trusted by 2,50,000+ Indians
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight mb-6 text-balance">
                Insurance Made
                <span className="block gradient-text-accent"> Simple & Smart</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-200 mb-8 max-w-2xl leading-relaxed">
                Compare health, life, motor, travel, home & business insurance plans. 
                Get AI-powered recommendations. Buy online in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plans" className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary-500/30">
                  Explore Plans <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/ai/calculator" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white border-2 border-white/25 hover:bg-white/10 transition-all duration-300">
                  <Sparkles className="w-5 h-5" /> AI Calculator
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="relative z-10 -mt-8 mb-16">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center p-5"
              >
                <p className="text-2xl md:text-3xl font-bold font-display text-primary-600">{stat.value}</p>
                <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">Why Choose <span className="gradient-text">OnlineInsurance?</span></h2>
            <p className="section-subtitle mx-auto mt-4">Everything you need to find, buy, and manage insurance — powered by technology.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{f.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">Insurance <span className="gradient-text">Categories</span></h2>
            <p className="section-subtitle mx-auto mt-4">Choose from a wide range of insurance products tailored for every need.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Shield
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/plans?category=${cat.id}`}
                    className="card-hover p-6 flex items-center gap-5 group flex-auto"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                      <p className="text-sm text-surface-500 mt-0.5">{cat.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-surface-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">What Our <span className="gradient-text">Customers Say</span></h2>
            <p className="section-subtitle mx-auto mt-4">Real stories from real people across India.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-surface-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white p-10 md:p-16 text-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-300 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Ready to Get Insured?</h2>
              <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
                Join 2,50,000+ Indians who trust OnlineInsurance. Start comparing plans today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
                  Create Free Account
                </Link>
                <Link to="/plans" className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                  Browse Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
