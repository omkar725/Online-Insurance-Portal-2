import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold font-display text-surface-900 mb-2">403 — Unauthorized Access</h1>
      <p className="text-surface-500 max-w-md mb-8">
        You do not have administrative privileges to view this page. If you believe this is an error, contact operations.
      </p>
      <div className="flex gap-4">
        <Link to="/dashboard" className="btn-primary">
          Go to Dashboard
        </Link>
        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
