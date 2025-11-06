# Quick Deployment Guide (TL;DR)

Fast track to get your app live in ~10 minutes.

## Backend: Render

1. **Sign up**: https://render.com (use GitHub)
2. **New Web Service** → Select repo `kerixyz/online-exp`
3. **Settings**:
   - Branch: `claude/create-qa-website-011CUqwzKgQf7KMy8k3evGhc`
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && python app.py`
   - Plan: Free
4. **Environment Variables**:
   - `MODE` = `offline`
   - `FLASK_PORT` = `5000`
   - `PYTHON_VERSION` = `3.11.0`
5. **Deploy** → Copy your backend URL (example: `https://ai-community-backend-abc123.onrender.com`)

## Frontend: Vercel

1. **Sign up**: https://vercel.com (use GitHub)
2. **Import Project** → Select `kerixyz/online-exp`
3. **Settings**:
   - Framework: Vite
   - Root Directory: `frontend`
4. **Environment Variable**:
   - `VITE_API_URL` = `https://your-backend.onrender.com` (your Render URL from above)
5. **Deploy** → Copy your frontend URL (example: `https://ai-community.vercel.app`)

## Connect Them (CORS)

1. Go back to **Render dashboard**
2. Click your backend service → **Environment**
3. Add/Update: `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app` (your Vercel URL from above)
4. Wait ~1 min for redeploy

## Test

Visit your Vercel URL → Click "Explore Simulations" → Run a simulation!

**First request**: ~30 sec (cold start - normal)
**After that**: Instant ⚡

---

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Having issues?** Check the Troubleshooting section in DEPLOYMENT.md
