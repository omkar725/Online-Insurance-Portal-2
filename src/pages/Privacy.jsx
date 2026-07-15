import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold font-display">Privacy Policy</h1>
          <p className="text-primary-300 mt-1">Learn how we protect and manage your personal data</p>
        </div>
      </section>
      <section className="py-8">
        <div className="page-container max-w-3xl">
          <div className="card p-6 md:p-8 space-y-4 text-sm text-surface-600 leading-relaxed">
            <h2 className="text-lg font-bold text-surface-900">1. Data Collection</h2>
            <p>
              We collect demographic details, health histories, and vehicle parameters necessary to compute insurance quotes. We also collect KYC files (Aadhaar, PAN cards) to verify identity during policy purchases.
            </p>
            <h2 className="text-lg font-bold text-surface-900">2. Data Security & Storage</h2>
            <p>
              All personal profiles, financial transactions, and uploaded files are protected under 256-bit secure encryption and stored in compliance with the Digital Personal Data Protection (DPDP) Act of India.
            </p>
            <h2 className="text-lg font-bold text-surface-900">3. Contact Us</h2>
            <p>For any queries related to your data rights, please contact our Data Protection Officer at privacy@onlineinsurance.in.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
