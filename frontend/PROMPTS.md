Tech Stack Guidelines
Frontend: React (preferred), Next.js 14, TypeScript, Tailwind CSS
State Management: Zustand
UI Components: Shadcn, Lucide
Form Validation: Zod
Charts & Analytics: Recharts
Backend: Node.js with Next.js API routes (or Express.js if preferred)
Database: PostgreSQL with Prisma ORM
Authentication: next-auth@beta
File Uploads: Uploadthing
Email Notifications: Resend
Payments: Stripe (for job payments and freelancer payouts)
Deployment: Bonus points for deploying on Vercel, Netlify, or AWS
Step-by-Step Instructions
1. Database Design
Design a relational structure with the following key tables/models:

Users: id, name, email, role (freelancer/employer/admin)
Jobs: id, title, description, category, budget, skills_required, employer_id, status
Applications: id, freelancer_id, job_id, proposal, status, created_at
Transactions: id, job_id, amount, status, payment_date
2. Backend Development
Implement RESTful API routes using Next.js API:

Authentication:
POST /auth/signup – User registration
POST /auth/login – User login (next-auth)
Jobs Management:
GET /jobs – List all available jobs (with filters)
POST /jobs – Create a new job (Employer only)
PUT /jobs/:id – Update job details (Employer only)
DELETE /jobs/:id – Remove a job (Admin only)
Applications Management:
POST /applications – Apply for a job (Freelancer only)
GET /applications – View application history (Freelancer only)
Admin-only endpoints:
GET /admin/jobs – Manage all job listings
GET /admin/applications – Manage all applications
3. Frontend Development
Create a clean, modern UI with Tailwind CSS and Shadcn components. Implement the following pages:

Home Page: Display available freelance jobs with filtering options.
Job Details Page: Show job description, budget, and application button.
Freelancer Dashboard: View applied jobs and statuses.
Employer Dashboard: Manage job listings and applications.
Admin Dashboard: Manage all users, jobs, and applications.
4. Authentication & Authorization
Implement role-based access control using next-auth@beta:

Freelancers: Can browse and apply for jobs.
Employers: Can post and manage job listings.
Admins: Have full control over jobs, users, and applications.
5. Bonus Features (Optional)
Search Bar: Enable keyword-based search for jobs.
Ratings & Reviews: Freelancers and employers can rate each other.
Stripe Integration: Employers pay freelancers through the platform.
Deploy the App: Provide a live demo link.