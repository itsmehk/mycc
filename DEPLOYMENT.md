# Deployment Guide for CardMatch Pro

## Vercel Deployment

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itsmehk/mycc)

### Manual Setup

1. **Import Project**
   - Go to https://vercel.com/new
   - Import your repository: `itsmehk/mycc`
   - Framework Preset: **Next.js**
   - Root Directory: Leave empty (vercel.json handles this)

2. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```
   (Or point to your deployed backend URL)

3. **Build Settings** (Auto-detected from vercel.json)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build from the `frontend` directory

### Troubleshooting Vercel

**Changes not showing?**
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" with "Use existing Build Cache" **UNCHECKED**
3. This forces a fresh build without cache

**Build failing?**
- Check build logs in Vercel Dashboard
- Ensure Node version is 18+ (Settings → General → Node.js Version)
- Verify `frontend/package.json` has all dependencies

---

## Netlify Deployment

### Quick Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/itsmehk/mycc)

### Manual Setup

1. **Import Project**
   - Go to https://app.netlify.com/start
   - Connect your GitHub repository: `itsmehk/mycc`
   - Select the repository

2. **Build Settings** (Auto-detected from netlify.toml)
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **IMPORTANT**: Enable "Next.js Runtime" plugin (Netlify will prompt)

3. **Environment Variables**
   Add these in Netlify Dashboard → Site settings → Environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NODE_VERSION=18
   ```

4. **Enable Essential Next.js Plugin**
   - Go to Site settings → Build & deploy → Build plugins
   - Click "Add plugin"
   - Search for "@netlify/plugin-nextjs"
   - Click "Install"

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build from the `frontend` directory with Next.js support

### Troubleshooting Netlify

**"Page not found" error on Netlify?**
This is the most common issue with Next.js on Netlify. Fix it:

1. **Install Essential Next.js Plugin**
   - Go to: Site settings → Build & deploy → Build plugins
   - Click "Add plugin"
   - Search: "@netlify/plugin-nextjs"
   - Install it
   - Redeploy

2. **Verify Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next` (NOT `frontend/.next`)
   - Save and redeploy

3. **Check Build Logs**
   - Go to Deploys tab
   - Click latest deploy
   - Check for errors in build log
   - Look for "Next.js Runtime" plugin in logs

4. **Clear Everything and Redeploy**
   ```bash
   # In Netlify Dashboard:
   # 1. Deploys → Trigger deploy → Clear cache and deploy site
   # 2. Wait for build to complete
   # 3. Test the URL
   ```

**Changes not showing?**
1. Go to Netlify Dashboard → Deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. This forces a fresh build

**Build failing?**
- Check deploy logs in Netlify Dashboard
- Verify Node version is 18+ (set NODE_VERSION=18 in environment variables)
- Ensure @netlify/plugin-nextjs is installed
- Check build command in netlify.toml matches: `npm run build`

---

## Backend Deployment (Optional)

For production, deploy the FastAPI backend separately:

### Railway / Render / Heroku

1. **Create new service** for Python app
2. **Set build/start command**:
   ```bash
   pip install -r requirements.txt
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
3. **Environment Variables**:
   ```
   PORT=8000
   ```
4. **Update Frontend Environment Variable**:
   - In Vercel/Netlify, update `NEXT_PUBLIC_API_BASE_URL` to your deployed backend URL
   - Example: `https://your-backend.railway.app`

---

## Force Refresh Deployments

If your deployment platform shows old version despite code changes:

### Vercel
```bash
# Local machine
cd frontend
rm -rf .next node_modules
npm install
npm run build

# Then in Vercel Dashboard
# Deployments → ... menu → Redeploy (uncheck cache)
```

### Netlify
```bash
# In Netlify Dashboard
# Deploys → Trigger deploy → Clear cache and deploy site
```

---

## Verify Deployment

After deployment, verify these features work:

**Landing Page:**
- [ ] Hero section loads
- [ ] "Start Quiz" button works
- [ ] Sticky CTA appears on mobile scroll

**Quiz Flow:**
- [ ] Questions appear with smooth transitions
- [ ] Progress bar updates correctly
- [ ] Loading screen shows 4-step progress

**Results Page:**
- [ ] Cards display with all new sections:
  - [ ] Green "Annual Benefit Range" box with info icon
  - [ ] Tooltip appears on hover over info icon
  - [ ] "Monthly Spend Required" section
  - [ ] Break-even spend in orange
  - [ ] Blue visual progress bar
  - [ ] "Your Eligibility" badge

**Learn More Modal:**
- [ ] Click "Learn More" → Drawer slides from right
- [ ] "Why We Recommend" blue box appears
- [ ] Match criteria badges shown
- [ ] Can close by clicking outside or X button

---

## Common Issues

### Issue: Old Version Still Showing

**Solution 1: Clear Deployment Cache**
- Vercel: Redeploy without cache
- Netlify: Clear cache and deploy

**Solution 2: Hard Refresh Browser**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`
- Or use Incognito mode

**Solution 3: Verify Deployment**
```bash
# Check latest commit on main branch
git log origin/main -1 --oneline

# Should show: "Enhance UX with improved card results..."
# Commit hash: ec1c880 or later
```

### Issue: Build Fails

Check these in order:
1. Node version is 18+ (add `.nvmrc` file)
2. All dependencies in `package.json` are resolvable
3. No environment variable references that don't exist
4. Build logs for specific error messages

### Issue: API Not Working

Frontend can't reach backend:
1. Check `NEXT_PUBLIC_API_BASE_URL` environment variable
2. Verify backend is deployed and accessible
3. Check CORS settings in backend (`app/main.py`)
4. Test API directly: `curl https://your-api-url/health`

---

## Production Checklist

Before going live:

- [ ] Deploy backend to production service
- [ ] Update `NEXT_PUBLIC_API_BASE_URL` in frontend environment variables
- [ ] Enable HTTPS on both frontend and backend
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring (Vercel Analytics, Sentry, etc.)
- [ ] Test all features in production environment
- [ ] Enable caching headers for optimal performance
- [ ] Set up CI/CD for automatic deployments

---

## Support

If issues persist:
1. Check deployment logs for errors
2. Verify environment variables are set correctly
3. Test locally with `npm run build` in frontend directory
4. Review GitHub Actions logs (if using CI/CD)

Last Updated: November 2025
