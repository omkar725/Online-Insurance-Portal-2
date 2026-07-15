import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'
import { insforge } from '../../lib/insforge'
import { useAuth } from '../../lib/auth'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifyStep, setVerifyStep] = useState(false)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error: err } = await insforge.auth.signUp({ email: form.email, password: form.password, name: form.name, redirectTo: window.location.origin + '/login' })
    setLoading(false)
    if (err) { setError(err.message); return }
    if (data?.requireEmailVerification) { setVerifyStep(true) }
    else if (data?.accessToken) { await refreshUser(); navigate('/dashboard') }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error: err } = await insforge.auth.verifyEmail({ email: form.email, otp })
    setLoading(false)
    if (err) { setError(err.message); return }
    await refreshUser()
    navigate('/dashboard')
  }

  const handleOAuth = async (provider) => {
    await insforge.auth.signInWithOAuth(provider, { redirectTo: window.location.origin + '/dashboard' })
  }

  const set = (key, val) => setForm({ ...form, [key]: val })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-lg"><Shield className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold font-display text-white">Online<span className="text-primary-300">Insurance</span></span>
          </Link>
        </div>
        <div className="card p-8">
          {verifyStep ? (
            <>
              <h1 className="text-2xl font-bold text-surface-900 mb-1">Verify Email</h1>
              <p className="text-surface-500 text-sm mb-6">Enter the 6-digit code sent to <strong>{form.email}</strong></p>
              {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm mb-5 border border-red-200">{error}</div>}
              <form onSubmit={handleVerify} className="space-y-4">
                <input required type="text" maxLength={6} className="input-field text-center text-2xl tracking-[0.5em] font-mono" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} />
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Verifying...' : 'Verify & Continue'}</button>
              </form>
              <button onClick={async () => { await insforge.auth.resendVerificationEmail({ email: form.email }) }} className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 block mx-auto">Resend Code</button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-surface-900 mb-1">Create Account</h1>
              <p className="text-surface-500 text-sm mb-6">Start your insurance journey today</p>
              {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm mb-5 border border-red-200">{error}</div>}
              <form onSubmit={handleRegister} className="space-y-4">
                <div><label className="label">Full Name</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" /><input required type="text" className="input-field pl-11" placeholder="Amit Sharma" value={form.name} onChange={e => set('name', e.target.value)} /></div></div>
                <div><label className="label">Email</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" /><input required type="email" className="input-field pl-11" placeholder="amit@gmail.com" value={form.email} onChange={e => set('email', e.target.value)} /></div></div>
                <div><label className="label">Phone</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" /><input type="tel" className="input-field pl-11" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div></div>
                <div><label className="label">Password</label><div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" /><input required type={showPw ? 'text' : 'password'} minLength={6} className="input-field pl-11 pr-11" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating Account...' : 'Create Account'}</button>
              </form>
              <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-surface-400">or sign up with</span></div></div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleOAuth('google')} className="btn-outline text-sm py-2.5">Google</button>
                <button onClick={() => handleOAuth('github')} className="btn-outline text-sm py-2.5">GitHub</button>
              </div>
              <p className="text-center text-sm text-surface-500 mt-6">Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Sign In</Link></p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
