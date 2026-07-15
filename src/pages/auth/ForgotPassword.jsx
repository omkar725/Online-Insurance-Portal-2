import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mail, Lock, CheckCircle2 } from 'lucide-react'
import { insforge } from '../../lib/insforge'

export default function ForgotPassword() {
  const [step, setStep] = useState(1) // 1=email, 2=code, 3=newPw, 4=done
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const sendReset = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try { await insforge.auth.sendResetPasswordEmail({ email, redirectTo: window.location.origin + '/forgot-password' }); setStep(2) }
    catch (err) { setError(err.message) }
    setLoading(false)
  }

  const verifyCode = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { data, error: err } = await insforge.auth.exchangeResetPasswordToken({ email, code })
    if (err) { setError(err.message); setLoading(false); return }
    setToken(data.token); setStep(3); setLoading(false)
  }

  const resetPw = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error: err } = await insforge.auth.resetPassword({ newPassword, otp: token })
    if (err) { setError(err.message); setLoading(false); return }
    setStep(4); setLoading(false)
  }

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
          {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm mb-5 border border-red-200">{error}</div>}

          {step === 1 && (
            <form onSubmit={sendReset} className="space-y-4">
              <h1 className="text-2xl font-bold text-surface-900 mb-1">Forgot Password?</h1>
              <p className="text-surface-500 text-sm mb-4">Enter your email to receive a reset code.</p>
              <div><label className="label">Email</label><input required type="email" className="input-field" placeholder="amit@gmail.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Sending...' : 'Send Reset Code'}</button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={verifyCode} className="space-y-4">
              <h1 className="text-2xl font-bold text-surface-900 mb-1">Enter Code</h1>
              <p className="text-surface-500 text-sm mb-4">Check <strong>{email}</strong> for a 6-digit code.</p>
              <input required type="text" maxLength={6} className="input-field text-center text-2xl tracking-[0.5em] font-mono" placeholder="000000" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} />
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Verifying...' : 'Verify Code'}</button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={resetPw} className="space-y-4">
              <h1 className="text-2xl font-bold text-surface-900 mb-1">New Password</h1>
              <p className="text-surface-500 text-sm mb-4">Enter your new password (min 6 characters).</p>
              <div><label className="label">New Password</label><input required type="password" minLength={6} className="input-field" placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Resetting...' : 'Reset Password'}</button>
            </form>
          )}
          {step === 4 && (
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-surface-900 mb-2">Password Reset!</h1>
              <p className="text-surface-500 text-sm mb-6">Your password has been updated successfully.</p>
              <Link to="/login" className="btn-primary">Sign In Now</Link>
            </div>
          )}
          <p className="text-center text-sm text-surface-500 mt-6"><Link to="/login" className="text-primary-600 font-semibold">← Back to Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}
