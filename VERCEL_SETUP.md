# Vercel Deployment Instructions for Subdirectory Project

## The Issue
Vercel shows "Other" framework because the Vite project is in `frontend/` subdirectory, not the root.

## Solution: Manual Configuration in Vercel UI

When importing your project in Vercel, follow these **exact steps**:

### Step 1: Import Project
- Click "Add New..." → "Project"
- Select your repository: `kerixyz/online-exp`
- Click "Import"

### Step 2: Configure Build Settings

**IMPORTANT**: You need to set the Root Directory FIRST, then Vercel will detect Vite.

#### 1. Set Root Directory
- Look for **"Root Directory"** field (should be near the top)
- Click **"Edit"** or the field
- Select or type: **`frontend`**
- This tells Vercel to look in the `frontend` folder

#### 2. Framework Detection
- After setting Root Directory to `frontend`, the **Framework Preset** should now show **"Vite"**
- If it doesn't auto-detect, manually select **"Vite"** from the dropdown

#### 3. Build Settings (should auto-fill after detecting Vite)
These should populate automatically, but verify:

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 3: Add Environment Variable

Expand **"Environment Variables"** section:

```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com
```

(Replace with your actual Render backend URL)

### Step 4: Deploy

Click **"Deploy"** and wait ~2-3 minutes.

---

## If It Still Shows "Other"

If Vercel still doesn't detect Vite, you can manually override the settings:

1. **Framework Preset**: Select "Other" (it's okay!)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

This will work exactly the same as selecting Vite!

---

## Alternative: Deploy from Frontend Only

If the above doesn't work, you can create a separate Vercel project for just the frontend:

### Option 1: Deploy from Same Repo with Root Directory
(This is what we're trying above - should work!)

### Option 2: Deploy Frontend Folder Separately
1. In Vercel, during import, set **Root Directory** to `frontend`
2. This makes Vercel treat `frontend/` as the root
3. Framework should then detect as Vite

---

## Verifying Your Settings

Before clicking Deploy, your configuration should look like:

```
┌─────────────────────────────────────┐
│ Root Directory:  frontend           │
│ Framework:       Vite                │
│ Build Command:   npm run build       │
│ Output Dir:      dist                │
└─────────────────────────────────────┘

Environment Variables:
  VITE_API_URL = https://your-backend.onrender.com
```

---

## Screenshot Reference (What You Should See)

1. **Root Directory field** - Set to `frontend`
2. **Framework Preset** - Should change to "Vite" automatically
3. **Build Settings** - Should auto-populate
4. **Environment Variables** - Add your backend URL

---

## After Deployment

Once deployed:
1. Visit your Vercel URL
2. Check browser console (F12) for any errors
3. Test a simulation

If you see CORS errors, remember to add `ALLOWED_ORIGINS` to Render!

---

**Need help?** Let me know what you see in the Vercel UI and I can guide you through it!
