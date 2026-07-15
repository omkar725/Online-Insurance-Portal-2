import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16">
        <div className="page-container text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Contact Us</h1>
          <p className="text-primary-200 text-lg">We&apos;re here to help. Reach out to us anytime.</p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="page-container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-surface-900 mb-2">Message Sent!</h2>
                  <p className="text-surface-500">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className="label">Full Name</label><input required type="text" className="input-field" placeholder="Amit Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                    <div><label className="label">Email</label><input required type="email" className="input-field" placeholder="amit@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className="label">Phone</label><input type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                    <div><label className="label">Subject</label><input required type="text" className="input-field" placeholder="Claim Enquiry" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
                  </div>
                  <div><label className="label">Message</label><textarea required rows={5} className="input-field resize-none" placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                  <button type="submit" disabled={loading} className="btn-primary"><Send className="w-4 h-4 mr-2" />{loading ? 'Sending...' : 'Send Message'}</button>
                </form>
              )}
            </div>
            <div className="space-y-6">
              {[{ icon: Mail, title: 'Email', value: 'support@onlineinsurance.in', sub: 'We reply within 24 hours' },
                { icon: Phone, title: 'Phone', value: '+91 1800-123-4567', sub: 'Toll-free, Mon-Sat 9AM-7PM' },
                { icon: MapPin, title: 'Office', value: 'Bandra Kurla Complex', sub: 'Mumbai, Maharashtra 400051' }].map(c => (
                <div key={c.title} className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0"><c.icon className="w-5 h-5 text-primary-600" /></div>
                  <div><p className="font-semibold text-surface-900 text-sm">{c.title}</p><p className="text-primary-600 text-sm font-medium">{c.value}</p><p className="text-xs text-surface-400 mt-0.5">{c.sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
