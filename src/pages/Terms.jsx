import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold font-display">Terms of Service</h1>
          <p className="text-primary-300 mt-1">Please read these terms carefully before using our platform</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container max-w-3xl">
          <div className="card p-6 md:p-8 space-y-4 text-sm text-surface-600 leading-relaxed">
            <h2 className="text-lg font-bold text-surface-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using OnlineInsurance, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not access or use the platform.
            </p>
            <h2 className="text-lg font-bold text-surface-900">2. Regulatory Compliance</h2>
            <p>
              OnlineInsurance is a composite insurance broker platform licensed under the Insurance Regulatory and Development Authority of India (IRDAI). All quotes, premiums, and policy issuances conform strictly to IRDAI guidelines and Indian laws.
            </p>
            <h2 className="text-lg font-bold text-surface-900">3. Policy Purchases & Premiums</h2>
            <p>
              Premiums listed on the platform are estimates based on user profile inputs. The final premium is subject to underwriting decisions by the insurer. Payments are processed through secure Indian gateway facilities.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
