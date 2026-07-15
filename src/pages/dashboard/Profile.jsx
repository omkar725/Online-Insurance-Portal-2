import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useAuth } from '../../lib/auth'
import { insforge } from '../../lib/insforge'
import { User, Phone, MapPin, Mail, CheckCircle2 } from 'lucide-react'

export default function Profile() {
  const { user, profile, refreshUser } = useAuth()
  const [name, setName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [address, setAddress] = useState(profile?.address || '')
  const [city, setCity] = useState(profile?.city || '')
  const [state, setState] = useState(profile?.state || '')
  const [pincode, setPincode] = useState(profile?.pincode || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const { error } = await insforge.database
        .from('profiles')
        .update({
          full_name: name,
          phone,
          address,
          city,
          state,
          pincode,
        })
        .eq('user_id', user.id)

      if (error) {
        // If profile doesn't exist, we insert it
        const { error: insError } = await insforge.database.from('profiles').insert([
          {
            user_id: user.id,
            full_name: name,
            phone,
            address,
            city,
            state,
            pincode,
            role: 'user',
          },
        ])
        if (insError) throw insError
      }
      await refreshUser()
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold font-display">My Profile</h1>
          <p className="text-primary-300 mt-1">Manage your account information and address details</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container max-w-2xl mx-auto">
          <div className="card p-6 md:p-8">
            {message && (
              <div
                className={`p-4 mb-6 rounded-xl border flex items-center gap-2 text-sm ${
                  message.includes('successfully')
                    ? 'bg-accent-50 border-accent-200 text-accent-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {message.includes('successfully') ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : null}
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400" />
                    <input
                      required
                      type="text"
                      className="input-field pl-11"
                      placeholder="Amit Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400" />
                    <input
                      disabled
                      type="email"
                      className="input-field pl-11 bg-surface-50 cursor-not-allowed text-surface-400"
                      value={user?.email || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400" />
                    <input
                      required
                      type="tel"
                      className="input-field pl-11"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400" />
                    <input
                      required
                      type="text"
                      className="input-field pl-11"
                      placeholder="Flat/House No, Colony"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="label">City</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">State</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Pincode</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="400051"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
