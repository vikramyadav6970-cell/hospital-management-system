# Deployment Guide

## Firebase Hosting Deployment

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase (if not already done)
```bash
firebase init
```

Select:
- ✅ Hosting
- ✅ Firestore

### Step 4: Configure Next.js for Static Export

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
}
module.exports = nextConfig
```

### Step 5: Build the Application
```bash
npm run build
```

This will create an `out` directory with static files.

### Step 6: Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Step 7: Deploy to Hosting
```bash
firebase deploy --only hosting
```

### Step 8: Set Environment Variables

For production, you have two options:

**Option A: Use Firebase Hosting Environment Variables**
Add to `firebase.json`:
```json
{
  "hosting": {
    "rewrites": [...],
    "env": {
      "NEXT_PUBLIC_FIREBASE_API_KEY": "your-api-key",
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN": "your-project.firebaseapp.com",
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID": "your-project-id",
      "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET": "your-project.appspot.com",
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID": "123456789",
      "NEXT_PUBLIC_FIREBASE_APP_ID": "your-app-id"
    }
  }
}
```

**Option B: Hardcode in `lib/firebase.ts`** (for demo only, not recommended for production)

### Step 9: Verify Deployment
Visit your Firebase Hosting URL (shown after deployment)

## Alternative: Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

### Step 3: Set Environment Variables
In Vercel dashboard, add all `NEXT_PUBLIC_FIREBASE_*` variables.

## Post-Deployment Checklist

- [ ] Verify authentication works
- [ ] Test QR scanner (requires HTTPS)
- [ ] Check Firestore rules are active
- [ ] Verify all three roles can log in
- [ ] Test episode creation flow
- [ ] Verify medical records are saved correctly
- [ ] Check patient QR code display

## Troubleshooting

### Build Fails
- Check for TypeScript errors: `npm run build`
- Verify all dependencies are installed
- Clear `.next` folder and rebuild

### QR Scanner Not Working
- Ensure site is served over HTTPS
- Check browser console for camera permission errors
- Test on different browsers

### Firestore Permission Denied
- Verify rules are deployed: `firebase deploy --only firestore:rules`
- Check user role in Firestore `users` collection
- Review Firestore rules in Firebase Console

### Environment Variables Not Working
- For static export, variables must be available at build time
- Consider using Firebase Functions for server-side operations
- Or hardcode config for demo purposes



