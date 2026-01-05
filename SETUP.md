# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable **Email/Password**
4. Create **Firestore Database**:
   - Go to Firestore Database
   - Create database in **production mode** (we'll deploy rules)
   - Choose a location

### 3. Get Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web** icon (`</>`) to add a web app
4. Copy the config values

### 4. Configure Environment

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`

### 5. Deploy Firestore Rules

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select Firestore when prompted)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

### 6. Seed Sample Data (Optional)

Update Firebase config in `scripts/seed-data.ts` with your credentials, then:

```bash
npx ts-node scripts/seed-data.ts
```

This creates:
- Admin: `admin@hospital.com` / `admin123`
- Doctor: `doctor@hospital.com` / `doctor123`
- Patient: `patient@hospital.com` / `patient123`

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore database created
- [ ] Environment variables set in `.env.local`
- [ ] Firestore rules deployed
- [ ] Sample data seeded (optional)
- [ ] Development server running
- [ ] Can log in with demo credentials

## 🔧 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check `.env.local` file exists and has correct values
- Restart dev server after changing env variables

### "Permission denied" in Firestore
- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Check rules file exists: `firestore.rules`

### QR Scanner not working
- Camera permissions required
- Works best on HTTPS (localhost is OK for dev)
- Try different browser if issues persist

### Build errors
- Clear cache: `rm -rf .next node_modules && npm install`
- Check TypeScript errors: `npm run build`

## 📱 Testing the Application

1. **Login as Admin**
   - Scan patient QR code
   - Create new episode
   - Assign doctor

2. **Login as Doctor**
   - View assigned episodes
   - Add diagnosis and prescription
   - Mark episode as completed

3. **Login as Patient**
   - View QR code
   - Check episode history
   - View medical records

## 🎯 Next Steps

- Customize UI colors/branding
- Add more sample data
- Configure Firebase Hosting for deployment
- Set up custom domain (optional)

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)



