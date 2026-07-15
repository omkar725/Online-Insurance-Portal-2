import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyUsers } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { Search, UserCheck, ShieldAlert, ArrowLeft } from 'lucide-react'

export default function Users() {
  const [usersList, setUsersList] = useState(dummyUsers)
  const [search, setSearch] = useState('')

  const handleToggleStatus = (id) => {
    setUsersList(
      usersList.map((u) => {
        if (u.id === id) {
          return { ...u, status: u.status === 'active' ? 'blocked' : 'active' }
        }
        return u
      })
    )
  }

  const filtered = usersList.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

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
          <h1 className="text-2xl md:text-3xl font-bold font-display">Manage Users</h1>
          <p className="text-primary-300 mt-1">View, inspect and manage user account statuses</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input-field pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="card">
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Phone</th>
                    <th className="table-header">City</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Policies</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="table-row">
                      <td className="table-cell font-semibold text-surface-900">{u.full_name}</td>
                      <td className="table-cell">{u.email}</td>
                      <td className="table-cell text-xs">{u.phone}</td>
                      <td className="table-cell">{u.city}</td>
                      <td className="table-cell capitalize">
                        <span
                          className={`badge ${u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'badge-neutral'}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="table-cell text-center">{u.policies_count}</td>
                      <td className="table-cell">
                        <span className={u.status === 'active' ? 'badge-success' : 'badge-danger'}>{u.status}</span>
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                            u.status === 'active'
                              ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'active' ? <ShieldAlert className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          {u.status === 'active' ? 'Block' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
