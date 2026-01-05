# 🚀 Push to GitHub & Deploy to Netlify

## Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit: https://github.com/new
   - Sign in to your GitHub account

2. **Create New Repository**
   - Repository name: `hospital-management-system` (or any name you prefer)
   - Description: "QR-based Hospital Management System with Next.js and Firebase"
   - Visibility: Choose **Public** (for free Netlify) or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click **"Create repository"**

3. **Copy the Repository URL**
   - You'll see a page with setup instructions
   - Copy the repository URL (e.g., `https://github.com/yourusername/hospital-management-system.git`)

## Step 2: Push Code to GitHub

Run these commands in your terminal (replace with your actual repository URL):

```bash
# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/hospital-management-system.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**If you get authentication errors:**
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop app
- Or use SSH: `git@github.com:yourusername/repo-name.git`

## Step 3: Deploy to Netlify via GitHub

### Option A: Via Netlify Dashboard (Easiest)

1. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Sign up/Login (you can use GitHub to sign in)

2. **Import from GitHub**
   - Click **"Add new site"** → **"Import an existing project"**
   - Click **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub
   - Select your repository: `hospital-management-system`
   - Click **"Deploy site"**

3. **Configure Build Settings**
   - Netlify will auto-detect Next.js
   - Build command: `npm run build` (should be auto-filled)
   - Publish directory: Leave empty (Netlify handles Next.js automatically)
   - Click **"Deploy site"**

4. **Add Environment Variables**
   - Go to **Site settings** → **Environment variables** → **Add variable**
   - Add these 6 variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = cursormedi.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID = cursormedi
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = cursormedi.firebasestorage.app
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 276906495326
     NEXT_PUBLIC_FIREBASE_APP_ID = 1:276906495326:web:8ca0b2d409573aee8c53cf
     ```
   - Click **"Save"**

5. **Trigger New Deploy**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Wait for deployment to complete (2-3 minutes)

6. **🎉 Done!**
   - Your site is live at: `https://your-site-name.netlify.app`
   - Every push to `main` branch will auto-deploy!

### Option B: Via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site (after creating it on Netlify dashboard)
netlify link

# Set environment variables
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc"
netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "cursormedi.firebaseapp.com"
netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "cursormedi"
netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "cursormedi.firebasestorage.app"
netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "276906495326"
netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "1:276906495326:web:8ca0b2d409573aee8c53cf"

# Deploy
netlify deploy --prod
```

## ✅ Post-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Repository connected to Netlify
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Can access login page
- [ ] Firebase authentication works
- [ ] QR scanner works (requires HTTPS)

## 🔄 Continuous Deployment

Once connected:
- ✅ Every push to `main` branch = automatic deployment
- ✅ Preview deployments for pull requests
- ✅ Rollback to previous versions available
- ✅ Deploy logs and status in Netlify dashboard

## 🌐 Custom Domain (Optional)

1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain
3. Follow DNS configuration
4. Free SSL certificate provided automatically

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Check Node version (should be 18+)

### Authentication Errors
- Verify Firebase environment variables
- Check Firestore rules are deployed
- Ensure Firebase project is active

### QR Scanner Not Working
- Requires HTTPS (Netlify provides automatically)
- Check browser console for errors
- Verify camera permissions

## 📝 Quick Commands Reference

```bash
# Git commands
git add .
git commit -m "Your message"
git push origin main

# Netlify commands
netlify login
netlify link
netlify deploy --prod
```

---

**Your Hospital Management System will be live on Netlify! 🎉**

