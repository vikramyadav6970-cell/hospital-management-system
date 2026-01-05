# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project" or select existing project
3. Follow the setup wizard
4. Enable Google Analytics (optional)

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Email/Password**
3. Enable it and click **Save**

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode** (we'll deploy rules)
4. Choose a location (closest to your users)
5. Click **Enable**

## Step 4: Get Firebase Config

1. In Firebase Console, click the **gear icon** (⚙️) > **Project settings**
2. Scroll down to **Your apps** section
3. If no web app exists, click the **Web icon** (`</>`)
4. Register app with nickname (e.g., "Hospital Management")
5. Copy the `firebaseConfig` values

## Step 5: Configure Environment Variables

Create a file named `.env.local` in the project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase config.

## Step 6: Deploy Firestore Rules

After setting up Firebase CLI and logging in:

```bash
firebase login
firebase init firestore
# Select your project when prompted
# Use existing firestore.rules file when asked
firebase deploy --only firestore:rules
```

## Step 7: Seed Sample Data (Optional)

Update the Firebase config in `scripts/seed-data.ts` with your values, then:

```bash
npx ts-node scripts/seed-data.ts
```

This creates demo users:
- Admin: admin@hospital.com / admin123
- Doctor: doctor@hospital.com / doctor123
- Patient: patient@hospital.com / patient123

## Quick Test

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Try logging in with demo credentials (after seeding)



