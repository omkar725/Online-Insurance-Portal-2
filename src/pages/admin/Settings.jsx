import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, ShieldAlert } from 'lucide-react'

export default function Settings() {
  const [form, setForm] = useState({
    systemMode: 'production',
    allowRegistrations: 'yes',
    gstRate: '18',
    notificationEmail: 'alerts@onlineinsurance.in',
  })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

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
          <h1 className="text-2xl md:text-3xl font-bold font-display">Portal Settings</h1>
          <p className="text-primary-300 mt-1">Configure global operational attributes for the insurance portal</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
            {saved && (
              <div className="p-4 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 text-sm">
                System parameters saved successfully!
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="label">System Environment</label>
                <select
                  className="input-field"
                  value={form.systemMode}
                  onChange={(e) => setForm({ ...form, systemMode: e.target.value })}
                >
                  <option value="development">Development Sandbox</option>
                  <option value="production">Production Mode (IRDAI Compliant)</option>
                </select>
              </div>

              <div>
                <label className="label">New User Registrations</label>
                <select
                  className="input-field"
                  value={form.allowRegistrations}
                  onChange={(e) => setForm({ ...form, allowRegistrations: e.target.value })}
                >
                  <option value="yes">Allow New Registrations</option>
                  <option value="no">Temporarily Block Registrations</option>
                </select>
              </div>

              <div>
                <label className="label">Indian GST Rate (%)</label>
                <input
                  type="number"
                  className="input-field"
                  value={form.gstRate}
                  onChange={(e) => setForm({ ...form, gstRate: e.target.value })}
                />
              </div>

              <div>
                <label className="label">System Operations Alert Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={form.notificationEmail}
                  onChange={(e) => setForm({ ...form, notificationEmail: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save System Settings
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}
