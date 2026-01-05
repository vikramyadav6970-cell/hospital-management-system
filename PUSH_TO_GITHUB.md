# 📤 Quick Guide: Push to GitHub

## ✅ What's Ready

- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ All files committed
- ✅ Ready to push to GitHub

## 🚀 Next Steps

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `hospital-management-system` (or your choice)
3. Description: "QR-based Hospital Management System"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if not already)
git branch -M main

# Push your code
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/yourusername/hospital-management-system.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Netlify

Once code is on GitHub:

1. **Go to Netlify**: https://app.netlify.com
2. **Sign in** (use GitHub to sign in)
3. **Add new site** → **Import from Git**
4. **Authorize** Netlify to access GitHub
5. **Select** your repository
6. **Deploy** (Netlify auto-detects Next.js)
7. **Add environment variables** (see GITHUB_DEPLOY.md)
8. **Trigger deploy**

## 📝 Environment Variables for Netlify

Add these in Netlify Dashboard → Site settings → Environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cursormedi.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cursormedi
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cursormedi.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=276906495326
NEXT_PUBLIC_FIREBASE_APP_ID=1:276906495326:web:8ca0b2d409573aee8c53cf
```

## 🎯 Complete Instructions

See `GITHUB_DEPLOY.md` for detailed step-by-step guide.

## ✅ Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Environment variables added
- [ ] Site deployed
- [ ] Site is live!

---

**You're ready to push! Just follow Step 1 and Step 2 above! 🚀**

