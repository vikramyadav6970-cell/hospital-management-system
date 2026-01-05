# ⚡ Quick Deploy to Netlify

## 🚀 Fastest Method (5 minutes)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```
Opens browser - authorize Netlify CLI.

### Step 3: Initialize & Deploy
```bash
netlify init
```

When prompted:
- **"What would you like to do?"** → Select **"Create & configure a new site"**
- **"Team"** → Select your team
- **"Site name"** → Press Enter for random name, or enter custom name
- **"Build command"** → Press Enter (uses `npm run build` from netlify.toml)
- **"Directory to deploy"** → Press Enter (Netlify auto-detects Next.js)
- **"Netlify functions folder"** → Press Enter

### Step 4: Set Environment Variables
```bash
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc"
netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "cursormedi.firebaseapp.com"
netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "cursormedi"
netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "cursormedi.firebasestorage.app"
netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "276906495326"
netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "1:276906495326:web:8ca0b2d409573aee8c53cf"
```

### Step 5: Deploy to Production
```bash
netlify deploy --prod
```

### 🎉 Done!
Your site is now live at: `https://your-site-name.netlify.app`

## 🌐 Alternative: Deploy via Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify"
   git push
   ```

2. **Deploy on Netlify**
   - Go to https://app.netlify.com
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect GitHub repository
   - Netlify auto-detects Next.js
   - Click **"Deploy site"**

3. **Add Environment Variables**
   - Site settings → Environment variables
   - Add all 6 Firebase variables
   - Trigger new deploy

## ✅ Post-Deployment Checklist

- [ ] Site deployed successfully
- [ ] Environment variables set
- [ ] Can access login page
- [ ] Firebase authentication works
- [ ] QR scanner works (requires HTTPS - Netlify provides)

## 🔗 Your Live URL

After deployment, you'll get a URL like:
- `https://random-name-12345.netlify.app`

You can customize it in Netlify dashboard → Domain settings.

---

**That's it! Your Hospital Management System is now live on Netlify! 🎉**


