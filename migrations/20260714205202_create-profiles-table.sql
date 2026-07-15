-- Create profiles table for user metadata and role management
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Index on user_id (PK already indexes it, but explicit for clarity in RLS)
-- role column used in admin checks
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- RLS Policies

-- Users can read their own profile
CREATE POLICY "users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Users can insert their own profile
CREATE POLICY "users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can update their own profile (but not the role field - handled by column grant)
CREATE POLICY "users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- Revoke broad UPDATE, then grant only safe columns (prevent role self-escalation)
REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (full_name, phone, address, city, state, pincode, updated_at) ON public.profiles TO authenticated;

-- Grant necessary privileges
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT ON public.profiles TO authenticated;

-- Auto-update updated_at timestamp
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();
