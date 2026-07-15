import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { dummyDocuments } from '../../lib/dummyData'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, FileText, Clock } from 'lucide-react'

export default function Documents() {
  const [documents, setDocuments] = useState(dummyDocuments)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [comments, setComments] = useState('')

  const handleAction = (status) => {
    if (!selectedDoc) return
    setDocuments(
      documents.map((d) => {
        if (d.id === selectedDoc.id) {
          return {
            ...d,
            status,
            admin_comments: comments || `${status.toUpperCase()} by Admin on ${new Date().toLocaleDateString()}`,
            verified_at: status === 'verified' ? new Date().toLocaleDateString() : null,
          }
        }
        return d
      })
    )
    setSelectedDoc(null)
    setComments('')
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
          <h1 className="text-2xl md:text-3xl font-bold font-display">Verify KYC Documents</h1>
          <p className="text-primary-300 mt-1">Review policyholder identity proofs and eligibility documents</p>
        </div>
      </section>

      <section className="py-8">
        <div className="page-container grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="table-container">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="table-header">User Name</th>
                      <th className="table-header">Document Type</th>
                      <th className="table-header">Uploaded At</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((d) => (
                      <tr key={d.id} className="table-row">
                        <td className="table-cell font-semibold text-surface-900">{d.user_name}</td>
                        <td className="table-cell uppercase text-xs font-mono">{d.document_type.replace('_', ' ')}</td>
                        <td className="table-cell">{new Date(d.uploaded_at).toLocaleDateString('en-IN')}</td>
                        <td className="table-cell">
                          {d.status === 'verified' && <span className="badge-success">Verified</span>}
                          {d.status === 'pending' && <span className="badge-warning">Pending</span>}
                          {d.status === 'rejected' && <span className="badge-danger">Rejected</span>}
                        </td>
                        <td className="table-cell">
                          <button
                            onClick={() => {
                              setSelectedDoc(d)
                              setComments(d.admin_comments || '')
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-surface-200 hover:bg-surface-50 transition-all text-surface-700"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            {selectedDoc ? (
              <div className="card p-6 space-y-5 bg-white sticky top-24">
                <div className="flex justify-between items-center pb-3 border-b border-surface-100">
                  <h3 className="font-semibold text-surface-900">Verify File</h3>
                  <span className="font-mono text-xs text-surface-500">{selectedDoc.id.toUpperCase()}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-surface-400 block">User / Policyholder</span>
                    <span className="font-medium text-surface-800 mt-0.5 block">{selectedDoc.user_name}</span>
                  </div>
                  <div>
                    <span className="text-surface-400 block">Document Type</span>
                    <span className="font-semibold text-surface-800 mt-0.5 block uppercase">{selectedDoc.document_type}</span>
                  </div>
                  <div>
                    <span className="text-surface-400 block">Scanned File Link</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-medium text-primary-600 hover:underline mt-0.5 flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" /> Download/View Document.pdf
                    </a>
                  </div>
                </div>

                {selectedDoc.status === 'pending' ? (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="label text-xs">Verification Remarks</label>
                      <textarea
                        rows={3}
                        className="input-field text-xs resize-none"
                        placeholder="Add comments, issues or approval remarks..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAction('rejected')}
                        className="btn-danger text-xs py-2 px-3 flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                      <button
                        onClick={() => handleAction('verified')}
                        className="btn-accent text-xs py-2 px-3 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Verify
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-xs">
                    <p className="text-surface-400">Resolution Comments</p>
                    <p className="font-medium text-surface-700 mt-1 italic">{selectedDoc.admin_comments}</p>
                    {selectedDoc.verified_at && (
                      <p className="text-[10px] text-surface-400 mt-2">Verified on {selectedDoc.verified_at}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-8 text-center text-surface-400 border-dashed border-2 flex flex-col items-center justify-center h-48 sticky top-24">
                <Clock className="w-8 h-8 text-surface-300 mb-2" />
                <p className="text-xs">Select a document from the table to review, download and verify.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
