# Deployment Guide: Render + Vercel

This guide will walk you through deploying your AI-Mediated Community Dynamics Platform using Render (backend) and Vercel (frontend).

## Overview

- **Backend (Python/Flask)** → Render
- **Frontend (React/TypeScript)** → Vercel

**Total deployment time**: ~10-15 minutes
**Cost**: Free (both services have generous free tiers)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign up with GitHub (recommended - easier deployment)

### Step 2: Deploy Backend
1. Once logged in, click **"New +"** in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select your repository: `kerixyz/online-exp`
5. Click **"Connect"**

### Step 3: Configure the Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `ai-community-backend` (or any name you prefer) |
| **Region** | `Oregon (US West)` (or closest to you) |
| **Branch** | `claude/create-qa-website-011CUqwzKgQf7KMy8k3evGhc` |
| **Root Directory** | Leave blank |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `cd backend && python app.py` |

### Step 4: Set Environment Variables

Scroll down to **"Environment Variables"** and click **"Add Environment Variable"**.

Add these variables:

| Key | Value |
|-----|-------|
| `MODE` | `offline` |
| `FLASK_PORT` | `5000` |
| `PYTHON_VERSION` | `3.11.0` |
| `ALLOWED_ORIGINS` | Leave blank for now (we'll update this after deploying frontend) |

### Step 5: Deploy!

1. Scroll to the bottom
2. Select **"Free"** plan (750 hours/month free)
3. Click **"Create Web Service"**

### Step 6: Wait for Deployment

- Render will now build and deploy your backend
- This takes ~3-5 minutes
- You'll see logs in real-time
- Wait for the message: **"Your service is live 🎉"**

### Step 7: Get Your Backend URL

Once deployed, you'll see your backend URL at the top of the page:
```
https://ai-community-backend-XXXX.onrender.com
```

**📝 SAVE THIS URL** - you'll need it for the frontend!

### Step 8: Test Your Backend

Click on the URL and add `/api/health` to test:
```
https://ai-community-backend-XXXX.onrender.com/api/health
```

You should see:
```json
{
  "status": "healthy",
  "mode": "offline",
  "version": "1.0.0"
}
```

✅ **Backend is deployed!**

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### Step 2: Import Project
1. Once logged in, click **"Add New..."** → **"Project"**
2. Find your repository: `kerixyz/online-exp`
3. Click **"Import"**

### Step 3: Configure Project

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` (should auto-detect) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` (should be auto-filled) |
| **Output Directory** | `dist` (should be auto-filled) |

### Step 4: Add Environment Variable

Click **"Environment Variables"** section and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://ai-community-backend-XXXX.onrender.com` |

⚠️ **IMPORTANT**: Replace `XXXX` with YOUR actual Render backend URL from Part 1, Step 7!

**Example**:
```
VITE_API_URL=https://ai-community-backend-abc123.onrender.com
```

⚠️ **Do NOT include `/api` at the end** - the code adds that automatically!

### Step 5: Deploy!

1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. This takes ~2-3 minutes

### Step 6: Get Your Frontend URL

Once deployed, Vercel will show your live URL:
```
https://your-project-name.vercel.app
```

✅ **Frontend is deployed!**

---

## Part 3: Connect Frontend & Backend (CORS)

Now we need to tell the backend to accept requests from your Vercel frontend.

### Step 1: Go Back to Render

1. Go to https://dashboard.render.com
2. Click on your `ai-community-backend` service

### Step 2: Update Environment Variables

1. Click on **"Environment"** in the left sidebar
2. Find the `ALLOWED_ORIGINS` variable (or add it if missing)
3. Set the value to your Vercel frontend URL:
   ```
   https://your-project-name.vercel.app
   ```

   **Example**:
   ```
   https://ai-community-dynamics.vercel.app
   ```

4. Click **"Save Changes"**

### Step 3: Wait for Redeploy

- Render will automatically redeploy with the new environment variable
- This takes ~1-2 minutes
- Wait for it to finish

---

## Part 4: Test Your Deployed App

### Step 1: Open Your Frontend

Go to your Vercel URL:
```
https://your-project-name.vercel.app
```

### Step 2: Run a Simulation

1. Click **"Explore Simulations"**
2. Select the community
3. Choose an AI agent type (e.g., Moderator)
4. Adjust parameters
5. Click **"Run Simulation"**

### Expected Behavior:

**First request after 15+ min of inactivity**:
- ⏳ Takes ~30 seconds (Render free tier cold start)
- This is normal and expected!

**Subsequent requests**:
- ⚡ Fast (instant responses)
- Service stays warm for 15 minutes

### Step 3: Verify Results

You should see:
- ✅ Network visualizations
- ✅ Metrics dashboard
- ✅ Impact summary
- ✅ Downloadable reports

---

## Troubleshooting

### Issue: "Network Error" or CORS Error

**Solution**:
1. Check that `ALLOWED_ORIGINS` in Render is set to your exact Vercel URL
2. Make sure there's no trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`
3. Redeploy backend after changing environment variables

### Issue: Backend is slow on first request

**This is normal!** Render free tier has cold starts after 15 min of inactivity.

**Solutions**:
- Wait 30 seconds for first request
- Keep service warm by pinging it every 14 minutes (optional)
- Upgrade to Render paid plan ($7/mo) for no cold starts

### Issue: "Cannot find module" error in backend

**Solution**:
1. Check that build command in Render is: `pip install -r backend/requirements.txt`
2. Check that start command is: `cd backend && python app.py`
3. Trigger manual redeploy in Render dashboard

### Issue: Frontend shows blank page

**Solution**:
1. Check browser console for errors (F12)
2. Verify `VITE_API_URL` environment variable in Vercel settings
3. Make sure you didn't include `/api` at the end of the URL

### Issue: Simulation returns 404 error

**Solution**:
1. Test backend directly: `https://your-backend.onrender.com/api/health`
2. If backend works, check CORS settings
3. Check browser network tab for actual error message

---

## Custom Domains (Optional)

### For Frontend (Vercel):
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Backend (Render):
1. Go to service settings in Render
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records

**Then update** `ALLOWED_ORIGINS` in Render to include your custom domain!

---

## Keeping Backend Warm (Optional)

To avoid cold starts, you can ping your backend every 14 minutes:

### Option 1: UptimeRobot (Free)
1. Sign up at https://uptimerobot.com
2. Create new monitor
3. URL: `https://your-backend.onrender.com/api/health`
4. Interval: 14 minutes

### Option 2: Cron Job (Free)
Use a service like cron-job.org to ping your backend every 14 minutes.

---

## Monitoring

### Check Backend Health:
```
https://your-backend.onrender.com/api/health
```

### View Logs:

**Render**:
- Go to dashboard → your service → "Logs" tab
- See real-time backend logs

**Vercel**:
- Go to project → deployment → "Logs" tab
- See build and runtime logs

---

## Costs

Both services are **FREE** for this project:

**Render Free Tier**:
- ✅ 750 hours/month (plenty for this use case)
- ⚠️ Cold starts after 15 min inactivity
- ✅ Unlimited API calls

**Vercel Free Tier**:
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ Instant deployments

---

## Updating Your App

### Deploy Code Changes:

**Backend**:
1. Push changes to your Git branch
2. Render auto-deploys (takes ~3-5 min)
3. Watch deployment in Render dashboard

**Frontend**:
1. Push changes to your Git branch
2. Vercel auto-deploys (takes ~2-3 min)
3. Automatic live at your Vercel URL

Both platforms auto-deploy on git push! 🎉

---

## Summary Checklist

- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Backend URL saved
- [ ] Backend health check works
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` environment variable set in Vercel
- [ ] `ALLOWED_ORIGINS` set in Render to Vercel URL
- [ ] Frontend loads successfully
- [ ] Simulation runs successfully
- [ ] Network visualizations appear
- [ ] Report download works

---

## Need Help?

Common issues and solutions are in the Troubleshooting section above.

For other issues:
1. Check Render logs (backend)
2. Check Vercel logs (frontend)
3. Check browser console (F12)
4. Test backend health endpoint directly

---

## What's Next?

Once deployed, you can:
- Share your Vercel URL with collaborators
- Run unlimited simulations
- Download research reports
- Add custom domains
- Upgrade plans for better performance
- Connect to live Reddit API (online mode)

**Your platform is now live!** 🚀
