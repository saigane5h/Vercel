# Insurance Learning Hub 🎓

A professional BFSI video academy platform built with **Next.js 14** and **Tailwind CSS**, deployable to **Vercel** via GitHub.

---

## 🚀 Features

- **Landing Page** — Marketing page with hero, features, and CTA
- **Login / Auth Gate** — Credential-protected access to all course content
- **Dashboard** — Overview of courses, policy updates, and promotions
- **Courses** — Filterable grid of BFSI courses by category and level
- **Course Detail** — Embedded YouTube video player with lesson list
- **Promotions** — Active deals and course bundle offers
- **Policy Updates** — IRDAI regulatory video briefings with modal player

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Playfair Display + DM Sans |
| Icons | Lucide React |
| Auth | LocalStorage (demo) — swap for NextAuth/Supabase |
| Deployment | Vercel |

---

## 📁 Project Structure

```
insurance-learning-hub/
├── app/
│   ├── layout.jsx          # Root layout (fonts, Navbar, Providers)
│   ├── globals.css         # Global styles + design tokens
│   ├── page.jsx            # Landing page (public)
│   ├── login/page.jsx      # Login page
│   ├── dashboard/page.jsx  # Main dashboard (protected)
│   ├── courses/
│   │   ├── page.jsx        # All courses (protected)
│   │   └── [id]/page.jsx   # Individual course + video player (protected)
│   ├── promotions/page.jsx # Promotions page (protected)
│   └── policies/page.jsx   # Policy update videos (protected)
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── CourseCard.jsx      # Reusable course card
│   ├── ProtectedRoute.jsx  # Auth guard wrapper
│   └── Providers.jsx       # Client-side context providers
├── lib/
│   ├── auth.jsx            # AuthContext + login logic
│   └── data.js             # Mock data (courses, videos, promos, policies)
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## ⚡ Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Demo Login Credentials
| Role | Email | Password |
|---|---|---|
| Learner | learner@insurancehub.com | learn123 |
| Admin | admin@insurancehub.com | admin123 |

---

## 🌐 Deploy to Vercel via GitHub

### Step 1 — Push to GitHub
```bash
# In the project folder:
git init
git add .
git commit -m "Initial commit: Insurance Learning Hub"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/insurance-learning-hub.git
git branch -M main
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import"** next to your GitHub repo
4. Framework will be auto-detected as **Next.js**
5. Click **"Deploy"** — done! 🎉

Vercel auto-deploys every time you push to `main`.

---

## 🔧 Customisation Guide

### Adding Real Videos
Edit `lib/data.js` — replace `youtubeId` values with your actual YouTube video IDs:
```js
youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // e.g. 'dQw4w9WgXcQ'
```

### Adding Real Authentication
Replace the demo auth in `lib/auth.jsx` with:
- **NextAuth.js** — for OAuth / email magic links
- **Supabase Auth** — for full user management
- **Clerk** — for drop-in auth UI

### Adding a CMS
Replace the static `lib/data.js` with API calls to:
- **Contentful** / **Sanity** — for course/video management
- **Notion API** — for policy update tracking
- **Your own backend** — REST or GraphQL

### Environment Variables
Create `.env.local` for any secrets:
```
NEXT_PUBLIC_APP_URL=https://your-domain.com
# Add auth provider keys here
```

---

## 📝 Notes

- The demo auth uses localStorage — **not production-ready**. Upgrade to a real auth provider before going live.
- YouTube embed IDs in `lib/data.js` are placeholders — replace with your actual video IDs.
- Tailwind purges unused styles on build — production bundle is minimal.
