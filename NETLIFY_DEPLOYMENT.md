# 🚀 Deploy to Netlify - Complete Guide

## ✅ What's Already Configured

- ✅ `netlify.toml` configuration file created
- ✅ Next.js build settings configured
- ✅ Security headers configured
- ✅ Redirects configured

## 📋 Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Prepare Your Code**
   ```bash
   # Make sure everything is committed to git
   git add .
   git commit -m "Ready for Netlify deployment"
   ```

2. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git push origin main
   ```

3. **Deploy on Netlify**
   - Go to https://app.netlify.com
   - Sign up/Login with GitHub/GitLab/Bitbucket
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect your repository
   - Netlify will auto-detect Next.js settings
   - Click **"Deploy site"**

4. **Configure Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add these variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cursormedi.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=cursormedi
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cursormedi.firebasestorage.app
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=276906495326
     NEXT_PUBLIC_FIREBASE_APP_ID=1:276906495326:web:8ca0b2d409573aee8c53cf
     ```
   - Click **"Save"**
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**

5. **Done!** Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Select "Create & configure a new site"
   - Choose your team
   - Site name: (press Enter for random name or enter custom name)
   - Build command: `npm run build` (or press Enter)
   - Directory to deploy: `.next` (or press Enter for auto-detect)
   - Netlify functions folder: (press Enter)

4. **Set Environment Variables**
   ```bash
   netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc"
   netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "cursormedi.firebaseapp.com"
   netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "cursormedi"
   netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "cursormedi.firebasestorage.app"
   netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "276906495326"
   netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "1:276906495326:web:8ca0b2d409573aee8c53cf"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Drag & Drop (Quick Test)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `.next` folder
   - Wait for deployment

   ⚠️ **Note:** This method doesn't set environment variables automatically. You'll need to add them in the dashboard.

## 🔧 Netlify Configuration

The `netlify.toml` file includes:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `.next`
- ✅ Node version: 18
- ✅ Security headers
- ✅ Next.js redirects

## 🌐 Environment Variables

Make sure to set these in Netlify Dashboard:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Location:** Site settings → Environment variables → Add variable

## 🔒 Important Notes

1. **Firebase Rules**: Make sure Firestore rules are deployed:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **CORS**: Netlify deployment should work with Firebase without CORS issues.

3. **QR Scanner**: Camera access requires HTTPS, which Netlify provides automatically.

4. **Build Settings**: Netlify auto-detects Next.js, but you can override in dashboard:
   - Build command: `npm run build`
   - Publish directory: `.next`

## 🎯 Post-Deployment Checklist

- [ ] Environment variables set in Netlify
- [ ] Site deployed successfully
- [ ] Can access login page
- [ ] Firebase authentication works
- [ ] QR scanner works (requires HTTPS - Netlify provides this)
- [ ] Firestore rules deployed
- [ ] Sample data seeded (run `npm run seed` locally if needed)

## 🔄 Continuous Deployment

Once connected to Git:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Rollback to previous deployments available

## 📝 Custom Domain (Optional)

1. Go to **Domain settings** → **Add custom domain**
2. Enter your domain name
3. Follow DNS configuration instructions
4. Netlify provides free SSL certificate

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Check Node version (should be 18+)

### Firebase Errors
- Verify environment variables are set correctly
- Check Firebase project settings
- Ensure Firestore rules are deployed

### QR Scanner Not Working
- Requires HTTPS (Netlify provides automatically)
- Check browser console for errors
- Verify camera permissions

## 🎉 You're Live!

Once deployed, your Hospital Management System will be accessible at:
- `https://your-site-name.netlify.app`

Share this URL to demo your application!

---

**Need help?** Check Netlify docs: https://docs.netlify.com


