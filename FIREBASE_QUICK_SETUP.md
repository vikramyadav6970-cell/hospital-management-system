# 🔥 Firebase Quick Setup Guide

## Step-by-Step Instructions

### Step 1: Create Firebase Project (5 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with your Google account

2. **Create New Project**
   - Click **"Add project"** or **"Create a project"**
   - Enter project name: `hospital-management` (or any name)
   - Click **Continue**
   - (Optional) Disable Google Analytics if you don't need it
   - Click **Create project**
   - Wait for project creation (30 seconds)
   - Click **Continue**

### Step 2: Enable Authentication (2 minutes)

1. **Navigate to Authentication**
   - In left sidebar, click **"Authentication"**
   - Click **"Get started"** (if first time)

2. **Enable Email/Password**
   - Click on **"Sign-in method"** tab
   - Find **"Email/Password"** in the list
   - Click on it
   - Toggle **"Enable"** to ON
   - Click **"Save"**

### Step 3: Create Firestore Database (3 minutes)

1. **Navigate to Firestore**
   - In left sidebar, click **"Firestore Database"**
   - Click **"Create database"**

2. **Configure Database**
   - Select **"Start in production mode"** (we'll deploy rules)
   - Click **Next**
   - Choose a location (select closest to you, e.g., `us-central1`)
   - Click **Enable**
   - Wait for database creation (30-60 seconds)

### Step 4: Get Firebase Configuration (2 minutes)

1. **Open Project Settings**
   - Click the **gear icon** (⚙️) next to "Project Overview"
   - Click **"Project settings"**

2. **Add Web App** (if not already added)
   - Scroll to **"Your apps"** section
   - Click the **Web icon** (`</>`)
   - Register app nickname: `Hospital Management`
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **"Register app"**

3. **Copy Configuration**
   - You'll see a `firebaseConfig` object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **Copy these values** (you'll need them next)

### Step 5: Configure Environment Variables (1 minute)

**Option A: Use Interactive Setup Script**
```bash
npm run setup
```
Follow the prompts and enter your Firebase config values.

**Option B: Manual Setup**
1. Open `.env.local` file in the project root
2. Replace the placeholder values with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (your actual key)
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### Step 6: Login to Firebase CLI (1 minute)

Open terminal in project directory and run:
```bash
firebase login
```

This will:
- Open your browser
- Ask you to sign in with Google
- Authorize Firebase CLI
- Return to terminal when done

### Step 7: Initialize Firestore (2 minutes)

Run:
```bash
firebase init firestore
```

When prompted:
1. **"What file should be used for Firestore Rules?"**
   - Type: `firestore.rules` (or press Enter if default)
   
2. **"What file should be used for Firestore indexes?"**
   - Type: `firestore.indexes.json` (or press Enter if default)

3. **"Do you want to proceed?"**
   - Type: `Y`

4. **"Please select an option:"**
   - Select: **"Use an existing project"**
   - Choose your project from the list

### Step 8: Deploy Firestore Rules (1 minute)

```bash
firebase deploy --only firestore:rules
```

You should see:
```
✔  Deploy complete!
```

### Step 9: Seed Sample Data (Optional, 1 minute)

**First, update `scripts/seed-data.ts`:**
- Open `scripts/seed-data.ts`
- Replace the placeholder Firebase config (lines 7-13) with your actual values

**Then run:**
```bash
npm run seed
```

This creates:
- Admin: `admin@hospital.com` / `admin123`
- Doctor: `doctor@hospital.com` / `doctor123`
- Patient: `patient@hospital.com` / `patient123`

### Step 10: Verify Setup

```bash
npm run check-setup
```

This will verify:
- ✅ Environment variables are set
- ✅ Firestore rules file exists
- ✅ Firebase config exists

### Step 11: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎯 Quick Command Reference

```bash
# Interactive setup
npm run setup

# Check setup status
npm run check-setup

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Seed sample data
npm run seed

# Start dev server
npm run dev
```

## ❓ Troubleshooting

### "Failed to authenticate, have you run firebase login?"
- Run: `firebase login`
- Make sure browser opens and you authorize

### "Permission denied" in Firestore
- Make sure rules are deployed: `firebase deploy --only firestore:rules`
- Check that you selected the correct project

### "Firebase: Error (auth/configuration-not-found)"
- Check `.env.local` exists and has correct values
- Restart dev server after updating `.env.local`

### Can't find project in firebase init
- Make sure you're logged in: `firebase login`
- Check project exists in Firebase Console

## ✅ Success Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore database created
- [ ] Firebase config copied to `.env.local`
- [ ] Firebase CLI logged in
- [ ] Firestore initialized
- [ ] Firestore rules deployed
- [ ] Sample data seeded (optional)
- [ ] Dev server running
- [ ] Can log in with demo credentials

---

**Total Time: ~15-20 minutes**

Once complete, you'll have a fully functional Hospital Management System! 🎉



