# OnlineInsurance — Website Walkthrough

A step-by-step guide through every page of the OnlineInsurance portal.

---

## 1. Home Page (`/`)

The **landing page** — the first thing visitors see.

- **Hero Section** — Bold headline "Insurance Made Simple & Smart" with gradient background. Two CTA buttons: "Explore Plans" and "AI Calculator".
- **Trust Stats Bar** — 4 stat cards: 2,50,000+ Happy Customers, 98.7% Claims Settled, 45+ Insurance Partners, 500+ Cities Covered.
- **Why Choose Us** — 4 feature cards: Compare Plans, AI-Powered, Instant Claims, 100% Secure.
- **Insurance Categories** — 6 clickable category cards: Health, Life, Motor, Travel, Home, Business. Each links to `/plans?category=...`.
- **Customer Testimonials** — 3 review cards with star ratings, quotes, names, and cities.
- **CTA Section** — "Ready to Get Insured?" banner with "Create Free Account" and "Browse Plans" buttons.
- **Footer** — Company info, insurance links, quick links, legal links, contact details.

---

## 2. Plans Page (`/plans`)

Browse all available insurance plans.

- **Page Header** — Title "Our Insurance Plans" with description.
- **Category Filter** — Filter buttons for All, Health, Life, Motor, Travel, Home, Business.
- **Plan Cards** — Each card shows: plan name, category badge, coverage amount (₹), yearly premium (₹), age range, key benefits list, and a "View Details" button.
- **7 plans total** — SecureHealth Plus, Family Health Shield, LifeGuard Term Plan, DriveShield Comprehensive, YatraRaksha International, GrihaRaksha Home Insurance, VyaparSuraksha Business Plan.

---

## 3. Plan Detail Page (`/plans/:planId`)

Detailed view of a single insurance plan.

- **Plan Header** — Plan name, category, premium (monthly & yearly), coverage amount.
- **Benefits Section** — Full list of all benefits with checkmark icons.
- **Exclusions Section** — What's NOT covered, with X icons.
- **Terms & Conditions** — Policy terms text.
- **Age Eligibility** — Min and max age displayed.
- **CTA Button** — "Buy This Plan" button (requires login → redirects to `/buy/:planId`).

---

## 4. Compare Plans Page (`/compare`)

Side-by-side comparison of insurance plans.

- **Plan Selectors** — Two dropdown menus to pick any two plans.
- **Comparison Table** — Compares: plan name, category, coverage amount, monthly premium, yearly premium, min age, max age, number of benefits.
- **Benefits Comparison** — Lists benefits of both plans side by side.

---

## 5. AI Calculator Page (`/ai/calculator`)

AI-powered premium estimation tool. **Public — no login required.**

- **Input Form** — User fills: age, gender, occupation, annual income, city, BMI, smoking status, existing conditions, insurance type (health/life/motor/travel/home/business).
- **Calculate Button** — Processes the inputs using built-in logic.
- **Results Card** — Shows: estimated monthly premium (₹), estimated yearly premium (₹), recommended coverage amount, risk assessment level, and personalized tips.

---

## 6. AI Recommend Page (`/ai/recommend`)

AI-powered plan recommendation engine. **Public — no login required.**

- **Questionnaire Form** — User answers: age, family size, budget range, priority (coverage vs price), existing health conditions, lifestyle.
- **Get Recommendations Button** — Processes answers.
- **Recommended Plans** — Shows top 3 matching plans with match percentage, plan details, and "View Plan" links.

---

## 7. About Page (`/about`)

Company information page.

- **Company Story** — Mission, vision, and background of OnlineInsurance.
- **Key Highlights** — Statistics and achievements.
- **Team/Values Section** — Core values and commitments.
- **IRDAI Compliance** — Regulatory information.

---

## 8. Contact Page (`/contact`)

Contact form and company details.

- **Contact Form** — Fields: name, email, subject, message, and "Send Message" button.
- **Contact Info Cards** — Email (support@onlineinsurance.in), phone (+91 1800-123-4567), address (Mumbai).
- **Business Hours** — Operating hours display.

---

## 9. Login Page (`/login`)

User authentication page.

- **Login Form** — Email field, password field (with show/hide toggle), "Forgot Password?" link.
- **Sign In Button** — Validates credentials via InsForge auth.
- **OAuth Buttons** — "Google" and "GitHub" social login buttons.
- **Error Messages** — Shows specific errors: invalid credentials, unverified email, too many attempts, server error, network error.
- **Sign Up Link** — "Don't have an account? Sign Up" redirects to `/register`.
- **On Success** → Redirects to `/dashboard`.

---

## 10. Register Page (`/register`)

New user registration.

- **Registration Form** — Fields: full name, email, phone number, password, confirm password.
- **Create Account Button** — Submits registration via InsForge auth.
- **Email Verification Step** — After registration, shows a 6-digit OTP input field. User enters the code sent to their email.
- **On Verification Success** → Redirects to `/login`.
- **OAuth Buttons** — Google and GitHub registration options.
- **Sign In Link** — "Already have an account? Sign In".

---

## 11. Forgot Password Page (`/forgot-password`)

Password reset flow.

- **Step 1: Email Input** — Enter registered email address, click "Send Reset Code".
- **Step 2: Code + New Password** — Enter the 6-digit code from email + new password.
- **On Success** → Redirects to `/login` with success message.

---

## 12. Dashboard (`/dashboard`) 🔒

Main user dashboard after login. **Requires authentication.**

- **Welcome Header** — "Welcome back, [name]" with user's email.
- **Quick Stats** — Cards showing: active policies count, pending claims, total premium paid.
- **Recent Activity** — Latest policy and claim activity.
- **Quick Action Buttons** — Links to: My Policies, Submit Claim, Payment History, My Profile.

---

## 13. My Policies (`/dashboard/policies`) 🔒

List of user's insurance policies.

- **Policy Cards** — Each shows: policy number, plan name, category, status (Active/Expired), premium amount, start & end dates, nominee info.
- **Action Buttons** — "View Details" and "Renew" (for expired policies).

---

## 14. Policy Detail (`/dashboard/policies/:policyId`) 🔒

Detailed view of a specific policy.

- **Policy Info** — Policy number, plan name, category, status, dates.
- **Coverage Details** — Coverage amount, premium, payment frequency.
- **Nominee Info** — Nominee name and relationship.
- **Action Buttons** — "Submit Claim", "Renew Policy" (if expired).

---

## 15. Buy Policy (`/buy/:planId`) 🔒

Policy purchase flow.

- **Plan Summary** — Selected plan details and pricing.
- **Personal Details Form** — Auto-filled from profile (name, email, phone, address).
- **Nominee Details** — Nominee name and relationship fields.
- **Payment Method Selection** — UPI, Credit Card, Net Banking options.
- **Proceed to Payment Button** → Redirects to `/payment`.

---

## 16. Payment Page (`/payment`) 🔒

Payment processing page.

- **Order Summary** — Plan name, premium amount, GST breakdown, total.
- **Payment Processing** — Simulates payment processing.
- **Success/Failure Status** — Shows payment result with transaction ID.

---

## 17. Claims List (`/dashboard/claims`) 🔒

View all submitted claims.

- **Claims Table** — Columns: claim number, policy number, amount, date, status (Approved/Pending/Rejected).
- **Status Badges** — Color-coded: green (approved), yellow (pending), red (rejected).
- **View Details Button** — Links to individual claim detail.
- **Submit New Claim Button** — Links to `/dashboard/claims/new`.

---

## 18. Submit Claim (`/dashboard/claims/new`) 🔒

File a new insurance claim.

- **Policy Selector** — Dropdown to choose which policy to claim against.
- **Incident Details Form** — Incident date, description, claim amount.
- **Document Upload** — Upload supporting documents (hospital bills, FIR, etc.).
- **Submit Button** — Creates the claim.

---

## 19. Claim Detail (`/dashboard/claims/:claimId`) 🔒

Detailed view of a specific claim.

- **Claim Info** — Claim number, policy number, status, dates.
- **Incident Description** — Full description of the incident.
- **Financial Details** — Claimed amount, approved amount (if settled).
- **Admin Comments** — Resolution comments from admin (if resolved).
- **Timeline** — Submitted date, resolved date.

---

## 20. Renew Policy (`/dashboard/renew/:policyId`) 🔒

Renew an expired or expiring policy.

- **Current Policy Summary** — Existing policy details.
- **Renewal Options** — Choose renewal period and payment method.
- **Updated Premium** — Shows new premium amount.
- **Renew Button** → Processes renewal.

---

## 21. Payment History (`/dashboard/payments`) 🔒

Transaction history.

- **Payments Table** — Columns: transaction ID, policy number, amount (₹), payment method, date & time, status.
- **Status Badges** — Green (success), red (failed).
- **Total Paid** — Summary of all successful payments.

---

## 22. My Profile (`/dashboard/profile`) 🔒

Edit personal information.

- **Profile Form** — Editable fields: full name, phone, address, city, state, pincode.
- **Email Field** — Displayed but disabled (cannot change).
- **Save Changes Button** — Updates profile in the `profiles` database table.
- **Success Message** — "Profile updated successfully!" confirmation.

---

## 23. Admin Dashboard (`/admin`) 🔒👑

Main admin control panel. **Requires admin role.**

- **Stats Grid** — 4 metric cards: Total Users (2,843), Active Policies (4,521), Total Revenue (₹1.87 Cr), Pending Claims (127).
- **Quick Management** — 4 action cards linking to: Manage Users, Review Claims, Approve KYC Docs, Portal Settings.

---

## 24. Manage Users (`/admin/users`) 🔒👑

User account management.

- **Search Bar** — Search users by name or email.
- **Users Table** — Columns: name, email, phone, city, role, policies count, status, actions.
- **Block/Unblock Button** — Toggle user account status.
- **Role Badge** — Purple for admin, neutral for regular user.

---

## 25. Manage Plans (`/admin/plans`) 🔒👑

Insurance plan management.

- **Add New Plan Button** — (Planned feature).
- **Plans Table** — Columns: plan name, category, coverage amount, yearly premium, age limit, visibility status, actions.
- **Toggle Visibility** — Show/hide plans from public listing.
- **View Button** — Links to public plan detail page.

---

## 26. Assess Claims (`/admin/claims`) 🔒👑

Claims review and settlement.

- **Claims Table** — Columns: claim ID, policy number, claim amount, date, status, action.
- **Assess Panel** (right side) — Shows selected claim details: policy number, incident date, claim amount, incident description.
- **Assessment Comments** — Textarea for admin notes.
- **Approve/Reject Buttons** — Settles the claim with comments.
- **Resolution Display** — Shows admin comments and resolution date for settled claims.

---

## 27. System Transactions (`/admin/payments`) 🔒👑

Payment monitoring dashboard.

- **Revenue Card** — Total successful payment volume in ₹.
- **Transactions Table** — Columns: transaction ID, policy number, amount, payment method, date & time, status.
- **Read-only** — No edit actions (transaction logs are immutable).

---

## 28. Verify KYC Documents (`/admin/documents`) 🔒👑

Document verification workflow.

- **Documents Table** — Columns: user name, document type (Aadhaar/PAN/Address Proof), uploaded date, status, action.
- **Review Panel** (right side) — Shows: user name, document type, download/view link.
- **Verification Remarks** — Textarea for admin comments.
- **Verify/Reject Buttons** — Approves or rejects the document.
- **Resolution Display** — Shows comments and verification date.

---

## 29. Portal Settings (`/admin/settings`) 🔒👑

System-wide configuration.

- **Settings Form** — Fields:
  - System Environment (Development / Production)
  - New User Registrations (Allow / Block)
  - Indian GST Rate (%)
  - System Operations Alert Email
- **Save Button** — Saves settings with success confirmation message.

---

## 30. Utility Pages

### Terms of Service (`/terms`)
Legal terms and conditions for using the platform.

### Privacy Policy (`/privacy`)
Data privacy and protection policy.

### 403 Unauthorized (`/unauthorized`)
Shown when a non-admin user tries to access `/admin` routes. Displays "403 — Unauthorized Access" with a message and "Go to Dashboard" button.

### 404 Not Found (`/*`)
Shown for any URL that doesn't match a defined route.

---

## 🔒 Legend

| Icon | Meaning |
|------|---------|
| 🔒 | Requires login (ProtectedRoute) |
| 🔒👑 | Requires login + admin role (AdminRoute) |
| *(no icon)* | Public — anyone can access |
