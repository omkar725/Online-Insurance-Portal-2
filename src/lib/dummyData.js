// Indian Insurance Dummy Data — All amounts in INR
export const insurancePlans = [
  {
    id: 'plan-health-01',
    name: 'SecureHealth Plus',
    category: 'health',
    description: 'Comprehensive health insurance covering hospitalization, surgeries, and critical illnesses for individuals and families across India.',
    coverage_amount: 1000000,
    premium_monthly: 1499,
    premium_yearly: 15990,
    min_age: 18,
    max_age: 65,
    is_active: true,
    benefits: ['Cashless hospitalization at 5000+ network hospitals', 'Pre & post hospitalization cover (60/90 days)', 'Day care procedures covered', 'Ambulance charges up to ₹3,000', 'No-claim bonus up to 50%', 'Free annual health check-up', 'AYUSH treatment covered'],
    exclusions: ['Pre-existing diseases (waiting period 3 years)', 'Cosmetic surgery', 'Self-inflicted injuries', 'War & nuclear risks', 'Maternity (first 2 years)'],
    terms: 'Policy is renewable annually. 30-day waiting period for new policies. Pre-existing disease waiting period of 3 years.',
  },
  {
    id: 'plan-health-02',
    name: 'Family Health Shield',
    category: 'health',
    description: 'Family floater plan providing health coverage for the entire family under a single sum insured with added maternity benefits.',
    coverage_amount: 2500000,
    premium_monthly: 2999,
    premium_yearly: 32990,
    min_age: 18,
    max_age: 60,
    is_active: true,
    benefits: ['Family floater — covers spouse + 2 children', 'Maternity cover up to ₹75,000', 'New-born baby cover from day 1', 'Organ donor expenses covered', 'Restoration benefit — 100% sum insured', 'Mental illness cover', 'Domiciliary treatment'],
    exclusions: ['Dental treatments (unless accidental)', 'Cosmetic procedures', 'External aids and devices', 'War and terrorism', 'Hazardous activities'],
    terms: 'Family floater plan. Renewal without break for continued benefits. Cumulative bonus applicable.',
  },
  {
    id: 'plan-life-01',
    name: 'LifeGuard Term Plan',
    category: 'life',
    description: 'Pure term life insurance providing high coverage at affordable premiums to secure your family\'s financial future.',
    coverage_amount: 10000000,
    premium_monthly: 899,
    premium_yearly: 9590,
    min_age: 21,
    max_age: 55,
    is_active: true,
    benefits: ['₹1 Crore life cover', 'Death benefit — lump sum or monthly income', 'Terminal illness benefit', 'Accidental death benefit (2x cover)', 'Tax benefits under Section 80C & 10(10D)', 'Option to increase cover at life events', 'Waiver of premium on disability'],
    exclusions: ['Suicide within first year', 'Death due to substance abuse', 'Participation in criminal activity', 'Aviation (non-commercial)', 'War and nuclear risks'],
    terms: 'Policy tenure: 20-40 years. Premium payment term options available. Nominee must be declared at policy inception.',
  },
  {
    id: 'plan-motor-01',
    name: 'DriveShield Comprehensive',
    category: 'motor',
    description: 'Comprehensive motor insurance covering own damage, third-party liability, and personal accident for cars and SUVs.',
    coverage_amount: 800000,
    premium_monthly: 799,
    premium_yearly: 8590,
    min_age: 18,
    max_age: 70,
    is_active: true,
    benefits: ['Own damage cover (accidents, fire, theft)', 'Third-party liability as per Motor Vehicles Act', 'Personal accident cover ₹15 lakh', 'Roadside assistance 24x7', 'Cashless repairs at 4000+ garages', 'Zero depreciation add-on', 'Engine protection cover'],
    exclusions: ['Driving without valid licence', 'Driving under influence', 'Wear and tear', 'Mechanical breakdown', 'Consequential loss', 'Using vehicle for racing'],
    terms: 'Annual policy. No-claim bonus up to 50%. Transfer of NCB allowed on vehicle change.',
  },
  {
    id: 'plan-travel-01',
    name: 'YatraRaksha International',
    category: 'travel',
    description: 'International travel insurance for Indian travellers covering medical emergencies, trip cancellation, and baggage loss.',
    coverage_amount: 5000000,
    premium_monthly: 499,
    premium_yearly: 4990,
    min_age: 5,
    max_age: 70,
    is_active: true,
    benefits: ['Medical expenses up to ₹50 lakh', 'Emergency evacuation & repatriation', 'Trip cancellation/interruption cover', 'Baggage loss/delay compensation', 'Passport loss assistance', 'Personal liability cover', 'Flight delay — ₹5,000 per 6 hours'],
    exclusions: ['Pre-existing conditions', 'Adventure sports (unless add-on)', 'Travel against medical advice', 'Mental disorders', 'Pregnancy-related claims'],
    terms: 'Single trip or annual multi-trip options. Cover starts from departure from India.',
  },
  {
    id: 'plan-home-01',
    name: 'GrihaRaksha Home Insurance',
    category: 'home',
    description: 'Home insurance protecting your property structure and contents against fire, natural disasters, theft, and more.',
    coverage_amount: 5000000,
    premium_monthly: 599,
    premium_yearly: 6490,
    min_age: 21,
    max_age: 70,
    is_active: true,
    benefits: ['Structure cover — fire, earthquake, flood, storm', 'Contents cover — furniture, electronics, valuables', 'Theft & burglary protection', 'Temporary accommodation expenses', 'Liability cover for domestic help injuries', 'Rent loss cover (if rented out)', 'Electrical & plumbing breakdown'],
    exclusions: ['Normal wear and tear', 'War and nuclear risks', 'Wilful negligence', 'Land value', 'Under-construction property', 'Undisclosed renovations'],
    terms: 'Annual renewable policy. Sum insured based on property valuation. Photos and documents required at claim.',
  },
  {
    id: 'plan-business-01',
    name: 'VyaparSuraksha Business Plan',
    category: 'business',
    description: 'Comprehensive business insurance for MSMEs covering property, liability, employee cover, and cyber risks.',
    coverage_amount: 10000000,
    premium_monthly: 3499,
    premium_yearly: 37990,
    min_age: 21,
    max_age: 65,
    is_active: true,
    benefits: ['Property cover — office, inventory, equipment', 'Public liability up to ₹50 lakh', 'Employee compensation cover', 'Business interruption cover', 'Cyber liability protection', 'Professional indemnity', 'Money in transit cover'],
    exclusions: ['Intentional damage', 'Contractual liability', 'War and terrorism', 'Radioactive contamination', 'Pollution liability', 'Patent infringement'],
    terms: 'MSME businesses with annual turnover up to ₹25 Crore. Customizable add-ons available.',
  },
]

export const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai, Maharashtra', rating: 5, text: 'Filed a health insurance claim for my father\'s surgery. The entire process was seamless and cashless. Got approved within 24 hours!', avatar: 'PS' },
  { id: 2, name: 'Rajesh Kumar', location: 'Delhi, NCR', rating: 5, text: 'The AI calculator helped me find the perfect plan within my budget. Saved ₹3,000 annually compared to my previous insurer.', avatar: 'RK' },
  { id: 3, name: 'Anita Desai', location: 'Bengaluru, Karnataka', rating: 4, text: 'Comparing plans side-by-side made my decision so easy. Bought a family floater plan in under 10 minutes!', avatar: 'AD' },
  { id: 4, name: 'Vikram Singh', location: 'Jaipur, Rajasthan', rating: 5, text: 'My motor claim was settled in just 3 days. Zero depreciation add-on was totally worth it. Highly recommended!', avatar: 'VS' },
  { id: 5, name: 'Meena Patel', location: 'Ahmedabad, Gujarat', rating: 5, text: 'Best insurance portal I\'ve used. The dashboard shows everything clearly — policies, claims, payments. Very professional.', avatar: 'MP' },
]

export const trustStats = [
  { label: 'Happy Customers', value: '2,50,000+' },
  { label: 'Claims Settled', value: '98.7%' },
  { label: 'Insurance Partners', value: '45+' },
  { label: 'Cities Covered', value: '500+' },
]

export const categories = [
  { id: 'health', name: 'Health Insurance', icon: 'Heart', color: 'from-rose-500 to-pink-600', desc: 'Cashless hospitalization & medical cover' },
  { id: 'life', name: 'Life Insurance', icon: 'Shield', color: 'from-primary-500 to-primary-700', desc: 'Secure your family\'s financial future' },
  { id: 'motor', name: 'Motor Insurance', icon: 'Car', color: 'from-amber-500 to-orange-600', desc: 'Comprehensive car & bike protection' },
  { id: 'travel', name: 'Travel Insurance', icon: 'Plane', color: 'from-sky-500 to-blue-600', desc: 'Travel worry-free across the globe' },
  { id: 'home', name: 'Home Insurance', icon: 'Home', color: 'from-emerald-500 to-green-600', desc: 'Protect your property & belongings' },
  { id: 'business', name: 'Business Insurance', icon: 'Building2', color: 'from-violet-500 to-purple-600', desc: 'Safeguard your MSME enterprise' },
]

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

// Dummy policies for logged-in user
export const dummyPolicies = [
  { id: 'pol-001', policy_number: 'INS-2025-HLT-001', plan_id: 'plan-health-01', plan_name: 'SecureHealth Plus', category: 'health', status: 'active', premium_amount: 15990, payment_frequency: 'yearly', start_date: '2025-01-15', end_date: '2026-01-14', nominee_name: 'Sunita Sharma', nominee_relation: 'Spouse' },
  { id: 'pol-002', policy_number: 'INS-2024-MTR-042', plan_id: 'plan-motor-01', plan_name: 'DriveShield Comprehensive', category: 'motor', status: 'active', premium_amount: 8590, payment_frequency: 'yearly', start_date: '2024-11-01', end_date: '2025-10-31', nominee_name: 'Rahul Sharma', nominee_relation: 'Son' },
  { id: 'pol-003', policy_number: 'INS-2023-LIF-018', plan_id: 'plan-life-01', plan_name: 'LifeGuard Term Plan', category: 'life', status: 'expired', premium_amount: 9590, payment_frequency: 'yearly', start_date: '2023-06-01', end_date: '2024-05-31', nominee_name: 'Sunita Sharma', nominee_relation: 'Spouse' },
]

// Dummy claims
export const dummyClaims = [
  { id: 'clm-001', claim_number: 'CLM-2025-0042', policy_id: 'pol-001', policy_number: 'INS-2025-HLT-001', status: 'approved', incident_date: '2025-05-10', incident_description: 'Hospitalization due to dengue fever at Fortis Hospital, Mumbai. Admitted for 4 days.', claim_amount: 85000, approved_amount: 82000, admin_comments: 'Claim approved. Room rent capping applied as per policy terms.', submitted_at: '2025-05-15', resolved_at: '2025-05-22' },
  { id: 'clm-002', claim_number: 'CLM-2025-0078', policy_id: 'pol-002', policy_number: 'INS-2024-MTR-042', status: 'pending', incident_date: '2025-06-20', incident_description: 'Minor fender bender at Andheri signal. Front bumper damage and headlight broken.', claim_amount: 25000, approved_amount: null, admin_comments: null, submitted_at: '2025-06-22', resolved_at: null },
]

// Dummy payments
export const dummyPayments = [
  { id: 'pay-001', policy_id: 'pol-001', policy_number: 'INS-2025-HLT-001', amount: 15990, currency: 'INR', payment_method: 'UPI', status: 'success', created_at: '2025-01-15T10:30:00' },
  { id: 'pay-002', policy_id: 'pol-002', policy_number: 'INS-2024-MTR-042', amount: 8590, currency: 'INR', payment_method: 'Credit Card', status: 'success', created_at: '2024-11-01T14:15:00' },
  { id: 'pay-003', policy_id: 'pol-003', policy_number: 'INS-2023-LIF-018', amount: 9590, currency: 'INR', payment_method: 'Net Banking', status: 'success', created_at: '2023-06-01T09:45:00' },
  { id: 'pay-004', policy_id: 'pol-001', policy_number: 'INS-2025-HLT-001', amount: 15990, currency: 'INR', payment_method: 'UPI', status: 'failed', created_at: '2025-01-15T10:25:00' },
]

// Dummy admin data
export const dummyUsers = [
  { id: 'usr-001', full_name: 'Amit Sharma', email: 'amit.sharma@gmail.com', phone: '+91 98765 43210', city: 'Mumbai', role: 'user', policies_count: 3, status: 'active', created_at: '2024-08-15' },
  { id: 'usr-002', full_name: 'Priya Patel', email: 'priya.patel@yahoo.com', phone: '+91 87654 32109', city: 'Ahmedabad', role: 'user', policies_count: 1, status: 'active', created_at: '2024-10-20' },
  { id: 'usr-003', full_name: 'Suresh Reddy', email: 'suresh.r@outlook.com', phone: '+91 76543 21098', city: 'Hyderabad', role: 'user', policies_count: 2, status: 'blocked', created_at: '2024-12-05' },
  { id: 'usr-004', full_name: 'Kavita Nair', email: 'kavita.nair@gmail.com', phone: '+91 65432 10987', city: 'Kochi', role: 'user', policies_count: 4, status: 'active', created_at: '2025-01-10' },
  { id: 'usr-005', full_name: 'Deepak Joshi', email: 'deepak.j@gmail.com', phone: '+91 54321 09876', city: 'Pune', role: 'admin', policies_count: 0, status: 'active', created_at: '2024-01-01' },
]

export const dummyDocuments = [
  { id: 'doc-001', user_id: 'usr-001', user_name: 'Amit Sharma', document_type: 'aadhaar', file_url: '#', status: 'verified', uploaded_at: '2024-08-15', verified_at: '2024-08-16' },
  { id: 'doc-002', user_id: 'usr-001', user_name: 'Amit Sharma', document_type: 'pan', file_url: '#', status: 'verified', uploaded_at: '2024-08-15', verified_at: '2024-08-16' },
  { id: 'doc-003', user_id: 'usr-002', user_name: 'Priya Patel', document_type: 'aadhaar', file_url: '#', status: 'pending', uploaded_at: '2025-06-25', verified_at: null },
  { id: 'doc-004', user_id: 'usr-003', user_name: 'Suresh Reddy', document_type: 'address_proof', file_url: '#', status: 'rejected', uploaded_at: '2025-01-05', verified_at: null, admin_comments: 'Document is blurry. Please re-upload a clear copy.' },
]

export const adminStats = {
  totalUsers: 2843,
  activePolicies: 4521,
  totalRevenue: 18750000,
  pendingClaims: 127,
  claimsSettled: 3892,
  settlementRate: 98.7,
}
