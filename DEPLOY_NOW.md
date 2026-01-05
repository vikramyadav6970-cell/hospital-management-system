# 🚀 Deploy Now - Step by Step

## ✅ What's Ready

- ✅ Code committed to git
- ✅ All files ready
- ✅ Netlify configuration ready
- ✅ Environment variables documented

## 📤 Step 1: Create GitHub Repository (2 minutes)

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `hospital-management-system`
3. **Description**: "QR-based Hospital Management System"
4. **Visibility**: Public (for free Netlify) or Private
5. **DO NOT** check "Initialize with README"
6. **Click**: "Create repository"

## 📤 Step 2: Push Code to GitHub (1 minute)

After creating the repository, GitHub shows you commands. Run these in your terminal:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/hospital-management-system.git

# Push your code
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/hospital-management-system.git
git push -u origin main
```

## 🌐 Step 3: Deploy to Netlify (5 minutes)

### 3.1: Connect Repository

1. **Go to Netlify**: https://app.netlify.com
2. **Sign in** (use "Sign up with GitHub" if new)
3. **Click**: "Add new site" → "Import an existing project"
4. **Click**: "Deploy with GitHub"
5. **Authorize** Netlify (if prompted)
6. **Select** your repository: `hospital-management-system`
7. **Click**: "Deploy site"

### 3.2: Configure Build

Netlify will auto-detect Next.js. Verify:
- **Build command**: `npm run build` ✅
- **Publish directory**: (leave empty - auto-detected) ✅
- **Click**: "Deploy site"

### 3.3: Add Environment Variables

1. **Go to**: Site settings → Environment variables
2. **Click**: "Add variable"
3. **Add these 6 variables** (one at a time):

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   Value: AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
   ```

   ```
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   Value: cursormedi.firebaseapp.com
   ```

   ```
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   Value: cursormedi
   ```

   ```
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   Value: cursormedi.firebasestorage.app
   ```

   ```
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   Value: 276906495326
   ```

   ```
   NEXT_PUBLIC_FIREBASE_APP_ID
   Value: 1:276906495326:web:8ca0b2d409573aee8c53cf
   ```

4. **Click**: "Save" after each variable

### 3.4: Trigger New Deploy

1. **Go to**: Deploys tab
2. **Click**: "Trigger deploy" → "Deploy site"
3. **Wait**: 2-3 minutes for deployment

## 🎉 Step 4: You're Live!

Your site is now live at:
- `https://your-site-name-12345.netlify.app`

You can customize the domain name in Netlify dashboard.

## ✅ Verify Deployment

1. **Visit** your Netlify URL
2. **Test** login page loads
3. **Login** with demo credentials (after seeding data locally)
4. **Test** QR scanner (requires HTTPS - Netlify provides this)

## 🔄 Continuous Deployment

Now every time you push to GitHub:
- ✅ Automatic deployment to Netlify
- ✅ Preview deployments for pull requests
- ✅ Build logs and status tracking

## 📝 Quick Reference

**GitHub Repository**: `https://github.com/YOUR_USERNAME/hospital-management-system`

**Netlify Site**: `https://your-site-name.netlify.app`

**Environment Variables**: Set in Netlify Dashboard → Site settings → Environment variables

---

**Follow these steps and your Hospital Management System will be live in 10 minutes! 🚀**

