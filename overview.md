# OnlineInsurance — Project Overview

## 📋 Project Summary

| Field | Detail |
|-------|--------|
| **Project Name** | OnlineInsurance |
| **Backend Project** | `insurance1` |
| **Type** | Insurance Comparison & Management Portal |
| **Framework** | React 19 + Vite 8 |
| **Backend** | InsForge BaaS (PostgreSQL) |
| **Styling** | Tailwind CSS 3.4 |
| **Auth** | InsForge Auth (Email/Password + Google + GitHub OAuth) |
| **Deployment** | Vercel |
| **Target Audience** | Indian consumers seeking health, life, motor, travel, home & business insurance |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│                  React 19 + Vite SPA                 │
│                                                      │
│  ┌─────────┐  ┌──────────┐  ┌─────────────────────┐ │
│  │  Pages   │  │Components│  │  Route Guards       │ │
│  │  (25+)   │  │ (Header, │  │ ProtectedRoute.jsx  │ │
│  │          │  │  Footer) │  │ AdminRoute.jsx      │ │
│  └─────────┘  └──────────┘  └─────────────────────┘ │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │ AuthProvider  │                       │
│              │ (auth.jsx)    │                       │
│              └───────┬───────┘                       │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │ @insforge/sdk │                       │
│              │ (insforge.js) │                       │
│              └───────┬───────┘                       │
└──────────────────────┼───────────────────────────────┘
                       │ HTTPS
          ┌────────────┴────────────┐
          │   InsForge Backend      │
          │   (yx8pnmmc.us-east)    │
          │                         │
          │  ┌─────┐ ┌──────────┐  │
          │  │ Auth │ │ Database │  │
          │  │      │ │ (Postgres│  │
          │  └──────┘ │ profiles)│  │
          │           └──────────┘  │
          └─────────────────────────┘
```

---

## 📁 Folder Structure

```
insurance2/
├── .env                       # Environment variables (VITE_INSFORGE_URL, VITE_INSFORGE_ANON_KEY)
├── .insforge/                 # InsForge CLI project link
├── index.html                 # HTML entry point
├── insforge.toml              # InsForge backend config (auth, storage, realtime)
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Tailwind CSS theme & design tokens
├── vite.config.js             # Vite build configuration
├── vercel.json                # Vercel deployment config (SPA rewrites)
├── postcss.config.js          # PostCSS plugins
├── migrations/                # SQL migration files
│   └── 20260714..._create-profiles-table.sql
│
├── public/                    # Static assets
│
└── src/
    ├── main.jsx               # App entry point (wraps App in AuthProvider)
    ├── App.jsx                # Route definitions (React Router v6)
    ├── App.css                # Component-specific styles
    ├── index.css              # Global styles & design system
    │
    ├── lib/
    │   ├── insforge.js        # InsForge SDK client initialization
    │   ├── auth.jsx           # AuthProvider context (user, profile, loading)
    │   └── dummyData.js       # Static demo data (plans, testimonials, etc.)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx     # Navigation bar with auth-aware profile menu
    │   │   └── Footer.jsx     # Site footer
    │   └── guards/
    │       ├── ProtectedRoute.jsx  # Redirects unauthenticated users to /login
    │       └── AdminRoute.jsx      # Requires profile.role === 'admin'
    │
    ├── pages/
    │   ├── Home.jsx           # Landing page (hero, features, categories, testimonials)
    │   ├── About.jsx          # Company information
    │   ├── Plans.jsx          # Insurance plans listing
    │   ├── PlanDetail.jsx     # Individual plan details
    │   ├── Compare.jsx        # Side-by-side plan comparison
    │   ├── Contact.jsx        # Contact form
    │   ├── Payment.jsx        # Payment processing
    │   ├── Terms.jsx          # Terms of Service
    │   ├── Privacy.jsx        # Privacy Policy
    │   ├── NotFound.jsx       # 404 page
    │   ├── Unauthorized.jsx   # 403 page (admin access denied)
    │   │
    │   ├── auth/
    │   │   ├── Login.jsx          # Email/password + OAuth login
    │   │   ├── Register.jsx       # Registration with email verification (6-digit code)
    │   │   └── ForgotPassword.jsx # Password reset flow
    │   │
    │   ├── dashboard/
    │   │   ├── Dashboard.jsx      # User dashboard overview
    │   │   ├── Profile.jsx        # User profile management
    │   │   ├── Policies.jsx       # Active policies list
    │   │   ├── PolicyDetail.jsx   # Individual policy details
    │   │   ├── Claims.jsx         # Claims list
    │   │   ├── SubmitClaim.jsx    # New claim submission
    │   │   ├── ClaimDetail.jsx    # Individual claim details
    │   │   ├── RenewPolicy.jsx    # Policy renewal
    │   │   └── PaymentHistory.jsx # Payment transaction history
    │   │
    │   ├── buy/
    │   │   └── BuyPolicy.jsx      # Policy purchase flow
    │   │
    │   ├── ai/
    │   │   ├── Calculator.jsx     # AI-powered premium estimator
    │   │   └── Recommend.jsx      # AI-powered plan recommender
    │   │
    │   └── admin/
    │       ├── AdminDashboard.jsx # Admin overview & analytics
    │       ├── Users.jsx          # User management
    │       ├── AdminPlans.jsx     # Plan management
    │       ├── AdminClaims.jsx    # Claims management
    │       ├── AdminPayments.jsx  # Payment management
    │       ├── Documents.jsx      # Document management
    │       └── Settings.jsx       # System settings
    │
    └── assets/                    # Images, icons, static assets
```

---

## 🔀 Routing

### Public Routes (No Auth Required)

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with hero, features, categories, testimonials |
| `/about` | About | Company information |
| `/plans` | Plans | Browse insurance plans |
| `/plans/:planId` | PlanDetail | View individual plan details |
| `/compare` | Compare | Compare plans side-by-side |
| `/contact` | Contact | Contact form |
| `/ai/calculator` | Calculator | AI-powered premium estimation |
| `/ai/recommend` | Recommend | AI-powered plan recommendations |
| `/login` | Login | User sign-in |
| `/register` | Register | User registration |
| `/forgot-password` | ForgotPassword | Password reset |
| `/terms` | Terms | Terms of Service |
| `/privacy` | Privacy | Privacy Policy |
| `/unauthorized` | Unauthorized | 403 access denied |

### Protected Routes (Auth Required)

| Path | Page | Description |
|------|------|-------------|
| `/dashboard` | Dashboard | User dashboard overview |
| `/dashboard/profile` | Profile | Edit profile information |
| `/dashboard/policies` | Policies | View active policies |
| `/dashboard/policies/:policyId` | PolicyDetail | Individual policy details |
| `/dashboard/claims` | Claims | View submitted claims |
| `/dashboard/claims/new` | SubmitClaim | Submit a new claim |
| `/dashboard/claims/:claimId` | ClaimDetail | Individual claim details |
| `/dashboard/renew/:policyId` | RenewPolicy | Renew a policy |
| `/dashboard/payments` | PaymentHistory | Payment transaction history |
| `/buy/:planId` | BuyPolicy | Purchase a policy |
| `/payment` | Payment | Payment processing |

### Admin Routes (Auth + Admin Role Required)

| Path | Page | Description |
|------|------|-------------|
| `/admin` | AdminDashboard | System analytics & overview |
| `/admin/users` | Users | User management |
| `/admin/plans` | AdminPlans | Plan management |
| `/admin/claims` | AdminClaims | Claims review & management |
| `/admin/payments` | AdminPayments | Payment monitoring |
| `/admin/documents` | Documents | Document management |
| `/admin/settings` | Settings | System configuration |

---

## 🔐 Authentication Flow

### Registration
1. User fills in **Full Name**, **Email**, **Phone**, **Password** on `/register`
2. InsForge creates the user and sends a **6-digit verification code** via email
3. User enters the code on the verification step
4. On success → redirected to `/login`

### Login
1. User enters **Email** + **Password** on `/login`
2. InsForge validates credentials via `signInWithPassword()`
3. On success → `refreshUser()` hydrates the `AuthContext` (fetches `profiles` table)
4. Redirected to `/dashboard`

### OAuth (Google / GitHub)
1. User clicks Google or GitHub button on `/login`
2. InsForge redirects to the provider's OAuth consent page
3. After consent → callback redirects to `http://localhost:5173/dashboard`
4. `AuthProvider` hydrates the session from cookies

### Session Persistence
- InsForge SDK stores session tokens in **HTTP-only cookies**
- On page load, `AuthProvider.hydrateAuth()` calls `getCurrentUser()` to restore the session
- If the session is expired or missing → user is treated as unauthenticated

### Authorization
- **`ProtectedRoute`**: Checks `user !== null`. Redirects to `/login` if not authenticated.
- **`AdminRoute`**: Checks `user !== null` AND `profile.role === 'admin'`. Redirects to `/login` (no user) or `/unauthorized` (not admin).

---

## 🗄️ Database

### Tables

| Table | Purpose |
|-------|---------|
| `auth.users` | InsForge-managed user accounts (email, hashed password, metadata) |
| `public.profiles` | Application user profiles (role, full_name, phone, avatar_url) |

### `profiles` Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated primary key |
| `user_id` | UUID (FK → auth.users) | Links to InsForge auth user |
| `full_name` | TEXT | User's display name |
| `phone` | TEXT | Phone number |
| `avatar_url` | TEXT | Profile picture URL |
| `role` | TEXT | `'user'` (default) or `'admin'` |
| `created_at` | TIMESTAMPTZ | Record creation time |
| `updated_at` | TIMESTAMPTZ | Last update time |

### RLS Policies
- **Users can read their own profile**: `auth.uid() = user_id`
- **Users can insert their own profile**: `auth.uid() = user_id`
- **Users can update their own profile**: `auth.uid() = user_id`

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 8.1 | Build tool & dev server |
| React Router | 6.30 | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12.42 | Animations & transitions |
| Lucide React | 1.23 | Icon library |
| @insforge/sdk | 1.4 | Backend client (auth, database, storage) |
| InsForge BaaS | — | PostgreSQL database, auth, storage, edge functions |
| Vercel | — | Deployment platform |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment Variables (`.env`)
```
VITE_INSFORGE_URL=https://yx8pnmmc.us-east.insforge.app
VITE_INSFORGE_ANON_KEY=<your-anon-key>
```

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OxLint |

---

## 🎨 Key Features

### For Customers
- **Browse & Compare**: View 6 insurance categories (Health, Life, Motor, Travel, Home, Business) with side-by-side comparison
- **AI Calculator**: Get instant AI-powered premium estimates based on personal details
- **AI Recommender**: Receive personalised plan recommendations
- **Buy Online**: Complete policy purchase flow with payment processing
- **Claims Management**: Submit claims with document uploads, track status
- **Policy Management**: View active policies, renew expiring ones
- **Profile Management**: Update personal details, view account info

### For Admins
- **Dashboard Analytics**: View key metrics (users, policies, claims, revenue)
- **User Management**: View, search, and manage user accounts
- **Plan Management**: Manage insurance plans
- **Claims Processing**: Review and process submitted claims
- **Payment Monitoring**: Track payment transactions
- **Document Management**: Review uploaded documents (KYC, claims)
- **System Settings**: Configure platform settings

---

## 📊 Design System

The project uses a custom design system built on Tailwind CSS with:

- **Custom color tokens**: `primary-*`, `surface-*`, `accent-*` palettes
- **Typography**: `font-display` for headings, system font stack for body
- **Component classes**: `.card`, `.card-hover`, `.btn-primary`, `.btn-outline`, `.glass`
- **Responsive**: Mobile-first design with `md:` and `lg:` breakpoints
- **Animations**: Framer Motion for page transitions, scroll reveals, and micro-interactions
- **Glassmorphism**: Frosted glass header with `backdrop-blur`

---

## 🔗 Backend Configuration (`insforge.toml`)

```toml
[auth]
allowed_redirect_urls = ["http://localhost:5173", "http://localhost:5173/dashboard", "http://localhost:5173/login"]
require_email_verification = true
verify_email_method = "code"
reset_password_method = "code"

[auth.password]
min_length = 6

[storage]
max_file_size_mb = 50
```

---

*Built with React + InsForge · IRDAI Compliant · © 2026 OnlineInsurance*
