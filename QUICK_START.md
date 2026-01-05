# 🚀 Quick Start Guide

## ✅ Completed Steps

1. ✅ Project structure created
2. ✅ Dependencies installed
3. ✅ Firebase CLI installed
4. ✅ Configuration files created

## 📋 Remaining Manual Steps

### Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Enter project name (e.g., "hospital-management")
4. Follow the wizard (disable Google Analytics if you want)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** in left menu
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** and click **"Save"**

### Step 3: Create Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll deploy rules)
4. Choose a location (select closest to you)
5. Click **"Enable"**

### Step 4: Get Firebase Config

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register app with nickname: "Hospital Management"
6. **Copy the config values** (you'll see a `firebaseConfig` object)

### Step 5: Update .env.local

Open `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (your actual key)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 6: Deploy Firestore Rules

Open terminal in project directory and run:

```bash
firebase login
```

Then:

```bash
firebase init firestore
```

When prompted:
- ✅ Use an existing project → Select your project
- ✅ What file should be used for Firestore Rules? → `firestore.rules`
- ✅ What file should be used for Firestore indexes? → `firestore.indexes.json`

Then deploy:

```bash
firebase deploy --only firestore:rules
```

### Step 7: Seed Sample Data (Optional but Recommended)

Update Firebase config in `scripts/seed-data.ts` (lines 7-13) with your values, then:

```bash
npx ts-node scripts/seed-data.ts
```

This creates:
- **Admin**: admin@hospital.com / admin123
- **Doctor**: doctor@hospital.com / doctor123  
- **Patient**: patient@hospital.com / patient123

### Step 8: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎯 Test the Application

1. **Login as Admin** (`admin@hospital.com` / `admin123`)
   - Test QR scanner (you'll need a patient QR code)
   - Create a new episode
   - Assign a doctor

2. **Login as Doctor** (`doctor@hospital.com` / `doctor123`)
   - View assigned episodes
   - Add diagnosis and prescription
   - Mark episode as completed

3. **Login as Patient** (`patient@hospital.com` / `patient123`)
   - View your QR code
   - Check episode history
   - View medical records

## 🔍 Verify Setup

Run the setup checker:

```bash
npx ts-node scripts/check-setup.ts
```

This will verify:
- ✅ Environment variables are set
- ✅ Firestore rules file exists
- ✅ Firebase config exists

## ❓ Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure `.env.local` exists and has correct values
- Restart dev server after updating `.env.local`

### "Permission denied" in Firestore
- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Check that rules file exists: `firestore.rules`

### QR Scanner not working
- Camera permissions required
- Works on HTTPS or localhost
- Try different browser

### Build errors
- Clear cache: `rm -rf .next node_modules && npm install`
- Check TypeScript: `npm run build`

## 📚 Need Help?

- See `FIREBASE_SETUP.md` for detailed Firebase setup
- See `README.md` for full documentation
- See `ARCHITECTURE.md` for system design

---

**You're almost there! Just complete Steps 1-6 above and you'll be ready to demo! 🎉**



