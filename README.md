# Quvora: Freelance Software Studio Website

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide · Prisma · Supabase (PostgreSQL + Auth) · Resend · Vercel

Pages: Home, Services, Work (+ case studies), About, Contact (form + FAQ), protected `/admin` lead dashboard.

---

## 1. Quick start

**Option A: automatic (recommended)**
```bash
bash bootstrap.sh
```
This creates `../quvora-website` with `create-next-app`, installs all dependencies, copies the source files and generates the Prisma client.

**Option B: manual**
```bash
npx create-next-app@latest quvora-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd quvora-website
rm src/app/page.tsx src/app/favicon.ico      # ours live in src/app/(site)/ and src/app/icon.svg
# copy this folder's src/, prisma/, .env.example and README.md into the project (merge/overwrite)
npm i @prisma/client resend zod @supabase/ssr @supabase/supabase-js framer-motion lucide-react clsx tailwind-merge
npm i -D prisma
npm pkg set scripts.postinstall="prisma generate"
printf '\n!.env.example\n' >> .gitignore
```

Styles assume **Tailwind v4** (the `create-next-app` default; `globals.css` uses `@import "tailwindcss"`).

## 2. Environment variables

Copy `.env.example` to **both** `.env` (Prisma CLI) and `.env.local` (Next.js), then fill in:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string → **Transaction pooler** (port 6543, add `?pgbouncer=true`) |
| `DIRECT_URL` | Same page → **Session/Direct** connection (port 5432). Used only for migrations |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | Optional. Default `Quvora <onboarding@resend.dev>` |
| `ADMIN_EMAIL` | Receives lead emails **and** is the only account allowed into `/admin` |
| `NEXT_PUBLIC_WHATSAPP_PRIMARY` / `_SECONDARY` | Digits only with country code, e.g. `919098218202` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | `https://instagram.com/quvoradev` |
| `NEXT_PUBLIC_SITE_URL` | `https://quvora.dev` (used for sitemap and Open Graph) |

## 3. Supabase setup

1. Create a project at supabase.com. Save the database password.
2. Copy the connection strings and API keys into your env files (table above).
3. Create the table: `npx prisma migrate dev --name init` (creates `leads` with a status enum).
4. **Admin login (important):**
   - Authentication → Sign In / Providers → Email → turn **OFF** "Allow new users to sign up".
   - Authentication → Users → **Add user → Create new user**: use the same email as `ADMIN_EMAIL`, set a strong password, tick **Auto Confirm User**.

The app also checks that the logged-in email equals `ADMIN_EMAIL`, so a stray account can never open the dashboard.

## 4. Resend setup

1. Create an account at resend.com and generate an API key → `RESEND_API_KEY`.
2. Without a verified domain you can send from `onboarding@resend.dev`, but **only to the email address you registered Resend with**. Register Resend with `quvoradev12@gmail.com`, or verify `quvora.dev` (Resend → Domains) and set `RESEND_FROM_EMAIL="Quvora <hello@quvora.dev>"`.
3. Leads are saved to the database first, so even if an email fails the lead is never lost (check Vercel logs for `[contact] Email error`).

## 5. Local development

```bash
npm run dev          # http://localhost:3000
npx prisma studio    # browse the database
npm run build        # production build check
```

Test the pipeline:
1. Submit the form at `/contact` → row appears in Supabase (`leads`) and an email arrives.
2. Open `/admin` → you're redirected to `/admin/login` → sign in → manage leads.

API quick tests:
```bash
curl -i localhost:3000/api/admin/leads                # 401 without login
curl -c jar.txt -X POST localhost:3000/api/admin/login -H "Content-Type: application/json" \
  -d '{"email":"ADMIN_EMAIL","password":"YOUR_PASSWORD"}'
curl -b jar.txt "localhost:3000/api/admin/leads?q=test&status=NEW"
```

## 6. Deploy to Vercel

1. Push the project to GitHub (`.env*` files are git-ignored; `.env.example` is committed).
2. vercel.com → **Add New → Project** → import the repo (framework: Next.js, defaults are fine; `postinstall` runs `prisma generate`).
3. Project → Settings → **Environment Variables**: add every variable from section 2 for Production (and Preview if needed).
4. Run migrations against Supabase from your machine once (`npx prisma migrate deploy`), then **Deploy**.
5. Add the domain `quvora.dev` under Settings → Domains and follow the DNS instructions. Update `NEXT_PUBLIC_SITE_URL`.
6. Redeploy, then test the contact form and `/admin` on the live URL.

## 7. Project structure

```
prisma/schema.prisma          Lead model + LeadStatus enum
src/middleware.ts             First auth gate for /admin and /api/admin (rename to proxy.ts on Next 16+ if warned)
src/app/layout.tsx            Root layout: fonts + global metadata
src/app/(site)/               Public pages with Navbar/Footer: home, services, work, about, contact
src/app/admin/login           Admin login page
src/app/admin/(protected)/    Dashboard + lead detail (re-checks auth in layout)
src/app/api/contact           POST: validate, honeypot, rate limit, save, email
src/app/api/admin/*           login, logout, leads (GET), leads/[id] (GET, PATCH, DELETE)
src/components/               layout, home, work, contact, admin, ui (shadcn-style), motion
src/data/                     services, projects, testimonials, faqs (edit content here)
src/lib/                      prisma, supabase, auth, resend, validation, rate-limit, constants, utils
```

## 8. Editing content

- Projects: `src/data/projects.ts` (add `github` / `live` when ready; the "Coming Soon" labels disappear automatically).
- Services, FAQs, testimonials: `src/data/*`. The testimonials are placeholders. Replace them only with real client reviews.
- Contact info and dropdown options: `src/lib/constants.ts`.

## 9. Security notes

- Server-side validation (Zod) on every input; honeypot field; per-IP rate limiting on contact and login.
- The in-memory rate limiter is best-effort on serverless. For strict limits use Upstash Redis (`@upstash/ratelimit`) in `src/lib/rate-limit.ts`.
- Admin auth is checked in middleware, in the admin layout and in every admin API handler (defense in depth), using `supabase.auth.getUser()`.
- Never expose `DATABASE_URL`, `RESEND_API_KEY` or admin credentials with a `NEXT_PUBLIC_` prefix.
