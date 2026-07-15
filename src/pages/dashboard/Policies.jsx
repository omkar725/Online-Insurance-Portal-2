import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyPolicies, formatINR } from '../../lib/dummyData'

export default function Policies() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container"><h1 className="text-2xl md:text-3xl font-bold font-display">My Policies</h1><p className="text-primary-300 mt-1">View and manage your insurance policies</p></div>
      </section>
      <section className="py-8"><div className="page-container">
        <div className="card">
          <div className="table-container">
            <table className="w-full">
              <thead><tr><th className="table-header">Policy No.</th><th className="table-header">Plan</th><th className="table-header">Category</th><th className="table-header">Premium</th><th className="table-header">Expiry</th><th className="table-header">Status</th><th className="table-header">Action</th></tr></thead>
              <tbody>
                {dummyPolicies.map(p => (
                  <tr key={p.id} className="table-row">
                    <td className="table-cell font-medium">{p.policy_number}</td>
                    <td className="table-cell">{p.plan_name}</td>
                    <td className="table-cell capitalize">{p.category}</td>
                    <td className="table-cell">{formatINR(p.premium_amount)}/yr</td>
                    <td className="table-cell">{new Date(p.end_date).toLocaleDateString('en-IN')}</td>
                    <td className="table-cell"><span className={p.status === 'active' ? 'badge-success' : 'badge-danger'}>{p.status}</span></td>
                    <td className="table-cell"><Link to={`/dashboard/policies/${p.id}`} className="text-primary-600 font-medium text-sm hover:underline">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div></section>
      <Footer />
    </div>
  )
}
