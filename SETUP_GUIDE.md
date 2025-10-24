# nexCRM Setup Guide

## Complete Real Estate & Construction CRM System

### What's Included

nexCRM is a fully functional, production-ready CRM system with:

#### Core Features
- **Authentication System** - Secure login/signup with Supabase Auth
- **Lead Management** - Full CRUD operations with status tracking
- **Project & Property Management** - Track projects and properties
- **Task & Site Visit Tracking** - Manage tasks with geo-tagging
- **Payment & Invoice Module** - Invoice generation and payment tracking
- **WhatsApp & Email Automation** - Message templates and campaigns
- **Analytics Dashboard** - Real-time KPIs and reporting
- **Admin Panel** - User management and role-based access control

#### Database Schema
- Users table with role-based access
- Leads table with status tracking
- Projects & Properties tables
- Tasks & Site Visits tables
- Payments & Invoices tables
- Automation templates & campaigns

#### API Routes
- `/api/leads` - Lead CRUD operations
- `/api/projects` - Project management
- `/api/payments` - Payment tracking
- `/api/invoices` - Invoice management
- `/api/tasks` - Task management
- `/api/site-visits` - Site visit tracking
- `/api/users` - User management
- `/api/automation` - Automation campaigns

### Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Setup Supabase**
   - Connect Supabase from the "Connect" section in the sidebar
   - Run the database scripts from the `/scripts` folder:
     - `001_create_tables.sql` - Creates all tables with RLS policies
     - `002_create_profile_trigger.sql` - Sets up user profile trigger

3. **Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

4. **Deploy**
   - Click "Publish" to deploy to Vercel
   - Or download and run locally with `npm run dev`

### Default Login
- Email: admin@nexsolutions.com
- Password: password123

### User Roles
- **Admin** - Full system access
- **Manager** - Lead and project management
- **Agent** - Lead management and site visits
- **Finance** - Payment and invoice management
- **Viewer** - Read-only access

### Key Features

#### Lead Management
- Add, edit, delete leads
- Track lead status (new, contacted, qualified, negotiating, converted, lost)
- Filter by status
- Track lead source (website, referral, advertisement, cold-call)
- Budget tracking

#### Admin Panel
- User management with role assignment
- Activity logging
- System settings
- Integration management
- User status tracking

#### Security
- Row Level Security (RLS) on all tables
- Role-based access control
- Secure authentication with Supabase
- Protected API routes

### Next Steps

1. **Customize** - Update company name and branding
2. **Integrate** - Connect WhatsApp, Email, and Payment APIs
3. **Train** - Set up team members with appropriate roles
4. **Deploy** - Go live with your CRM

### Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- v0 Documentation: https://v0.dev/docs
