import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './components/guards/ProtectedRoute'
import AdminRoute from './components/guards/AdminRoute'

// Public Pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Plans = lazy(() => import('./pages/Plans'))
const PlanDetail = lazy(() => import('./pages/PlanDetail'))
const Compare = lazy(() => import('./pages/Compare'))
const Contact = lazy(() => import('./pages/Contact'))

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))

// Customer Dashboard Pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Policies = lazy(() => import('./pages/dashboard/Policies'))
const PolicyDetail = lazy(() => import('./pages/dashboard/PolicyDetail'))
const BuyPolicy = lazy(() => import('./pages/buy/BuyPolicy'))
const Payment = lazy(() => import('./pages/Payment'))
const PaymentHistory = lazy(() => import('./pages/dashboard/PaymentHistory'))
const Claims = lazy(() => import('./pages/dashboard/Claims'))
const SubmitClaim = lazy(() => import('./pages/dashboard/SubmitClaim'))
const ClaimDetail = lazy(() => import('./pages/dashboard/ClaimDetail'))
const RenewPolicy = lazy(() => import('./pages/dashboard/RenewPolicy'))
const Profile = lazy(() => import('./pages/dashboard/Profile'))

// AI Pages
const AICalculator = lazy(() => import('./pages/ai/Calculator'))
const AIRecommend = lazy(() => import('./pages/ai/Recommend'))

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/admin/Users'))
const AdminPlans = lazy(() => import('./pages/admin/AdminPlans'))
const AdminClaims = lazy(() => import('./pages/admin/AdminClaims'))
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'))
const AdminDocuments = lazy(() => import('./pages/admin/Documents'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

// Error Pages
const NotFound = lazy(() => import('./pages/NotFound'))
const Unauthorized = lazy(() => import('./pages/Unauthorized'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-surface-500 font-medium">Loading page...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:planId" element={<PlanDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Customer Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
          <Route path="/dashboard/policies/:policyId" element={<ProtectedRoute><PolicyDetail /></ProtectedRoute>} />
          <Route path="/buy/:planId" element={<ProtectedRoute><BuyPolicy /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/dashboard/payments" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
          <Route path="/dashboard/claims" element={<ProtectedRoute><Claims /></ProtectedRoute>} />
          <Route path="/dashboard/claims/new" element={<ProtectedRoute><SubmitClaim /></ProtectedRoute>} />
          <Route path="/dashboard/claims/:claimId" element={<ProtectedRoute><ClaimDetail /></ProtectedRoute>} />
          <Route path="/dashboard/renew/:policyId" element={<ProtectedRoute><RenewPolicy /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* AI Pages */}
          <Route path="/ai/calculator" element={<AICalculator />} />
          <Route path="/ai/recommend" element={<AIRecommend />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/plans" element={<AdminRoute><AdminPlans /></AdminRoute>} />
          <Route path="/admin/claims" element={<AdminRoute><AdminClaims /></AdminRoute>} />
          <Route path="/admin/payments" element={<AdminRoute><AdminPayments /></AdminRoute>} />
          <Route path="/admin/documents" element={<AdminRoute><AdminDocuments /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

          {/* Utility Pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
