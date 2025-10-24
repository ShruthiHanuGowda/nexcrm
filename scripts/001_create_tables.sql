-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'agent', -- admin, manager, agent, finance, viewer
  status TEXT DEFAULT 'active', -- active, inactive
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  property_interest TEXT,
  budget DECIMAL(15, 2),
  status TEXT DEFAULT 'new', -- new, contacted, qualified, negotiating, converted, lost
  assigned_to UUID REFERENCES public.users(id),
  source TEXT, -- website, referral, advertisement, cold-call
  notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  total_units INTEGER,
  available_units INTEGER,
  budget DECIMAL(15, 2),
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'planning', -- planning, ongoing, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  property_type TEXT, -- apartment, villa, commercial
  area DECIMAL(10, 2),
  price DECIMAL(15, 2),
  status TEXT DEFAULT 'available', -- available, sold, reserved
  floor_plan_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.users(id),
  priority TEXT DEFAULT 'medium', -- low, medium, high
  status TEXT DEFAULT 'pending', -- pending, in-progress, completed
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site visits table
CREATE TABLE IF NOT EXISTS public.site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES public.users(id),
  visit_date TIMESTAMP WITH TIME ZONE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  notes TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  payment_date DATE,
  payment_method TEXT, -- cash, check, bank-transfer, card
  status TEXT DEFAULT 'pending', -- pending, completed, failed
  invoice_number TEXT UNIQUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  issue_date DATE,
  due_date DATE,
  status TEXT DEFAULT 'pending', -- pending, paid, overdue
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automation templates table
CREATE TABLE IF NOT EXISTS public.automation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT, -- whatsapp, email
  content TEXT NOT NULL,
  variables TEXT[], -- array of variable names like ['name', 'property']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automation campaigns table
CREATE TABLE IF NOT EXISTS public.automation_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  template_id UUID NOT NULL REFERENCES public.automation_templates(id),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, scheduled, sent
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_campaigns ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for users table
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Create RLS Policies for leads table (company-based access)
CREATE POLICY "leads_select_company" ON public.leads FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "leads_insert_company" ON public.leads FOR INSERT WITH CHECK (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "leads_update_company" ON public.leads FOR UPDATE USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "leads_delete_company" ON public.leads FOR DELETE USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);

-- Create RLS Policies for projects table
CREATE POLICY "projects_select_company" ON public.projects FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "projects_insert_company" ON public.projects FOR INSERT WITH CHECK (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "projects_update_company" ON public.projects FOR UPDATE USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);

-- Create RLS Policies for properties table
CREATE POLICY "properties_select_company" ON public.properties FOR SELECT USING (
  project_id IN (SELECT id FROM public.projects WHERE company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid()))
);

-- Create RLS Policies for tasks table
CREATE POLICY "tasks_select_company" ON public.tasks FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "tasks_insert_company" ON public.tasks FOR INSERT WITH CHECK (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);

-- Create RLS Policies for site_visits table
CREATE POLICY "site_visits_select_company" ON public.site_visits FOR SELECT USING (
  lead_id IN (SELECT id FROM public.leads WHERE company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid()))
);

-- Create RLS Policies for payments table
CREATE POLICY "payments_select_company" ON public.payments FOR SELECT USING (
  lead_id IN (SELECT id FROM public.leads WHERE company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid()))
);

-- Create RLS Policies for invoices table
CREATE POLICY "invoices_select_company" ON public.invoices FOR SELECT USING (
  lead_id IN (SELECT id FROM public.leads WHERE company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid()))
);

-- Create RLS Policies for automation tables
CREATE POLICY "automation_templates_select_company" ON public.automation_templates FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "automation_campaigns_select_company" ON public.automation_campaigns FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.users WHERE id = auth.uid())
);
