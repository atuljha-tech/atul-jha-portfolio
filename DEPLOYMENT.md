# Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Vercel account
- Node.js 18+

---

## Step 1: MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. Create a database user (username + password)
3. Whitelist IP: `0.0.0.0/0` (allow all — required for Vercel)
4. Get connection string: `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/portfolio`

---

## Step 2: Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) → Create free account
2. From Dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

---

## Step 3: Environment Variables

Create `.env.local` in project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=YourStrongPassword123!
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## Step 4: Install Dependencies & Seed Admin

```bash
npm install
# Seed the admin user and default settings
npx tsx scripts/seed.ts
```

---

## Step 5: Run Locally

```bash
npm run dev
# Visit http://localhost:3000
# Admin: http://localhost:3000/admin/login
```

---

## Step 6: Deploy to Vercel

### Option A: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add all environment variables from `.env.local`
4. Deploy

### After Deploy: Seed Production DB
Run seed script with production MONGODB_URI:
```bash
MONGODB_URI="your_prod_uri" ADMIN_EMAIL="you@email.com" ADMIN_PASSWORD="pass" npx tsx scripts/seed.ts
```

---

## Admin Access

- URL: `https://your-domain.vercel.app/admin/login`
- Login with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- JWT token stored in HttpOnly cookie (7 day session)

---

## Folder Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── auth/login|logout|me
│   │   ├── projects/[id]
│   │   ├── hackathon-certificates/[id]
│   │   ├── skill-certificates/[id]
│   │   ├── skills/[id]
│   │   └── settings/
│   ├── admin/
│   │   ├── login/
│   │   ├── hackathons/
│   │   ├── projects/
│   │   ├── skill-certificates/
│   │   ├── skills/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/          # Admin UI components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── HackathonCertificates.tsx
│   ├── Projects.tsx
│   ├── SkillCertificates.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── mongodb.ts      # DB connection
│   ├── auth.ts         # JWT utilities
│   ├── cloudinary.ts   # Image upload
│   └── validations.ts  # Zod schemas
├── models/             # Mongoose models
├── middleware.ts        # Route protection
└── scripts/seed.ts     # Admin seeder
```

---

## Security Notes

- JWT stored in HttpOnly cookie (XSS safe)
- Rate limiting on login (5 attempts / 15 min)
- All admin routes protected by middleware
- Passwords hashed with bcrypt (12 rounds)
- Input validated with Zod on all API routes
- Cloudinary images stored securely
