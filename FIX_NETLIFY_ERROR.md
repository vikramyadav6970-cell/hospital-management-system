# 🔧 Fix Netlify Firebase API Key Error

## ❌ Error: "auth/api-key-not-valid"

This error means Netlify can't read your Firebase environment variables. Here's how to fix it:

## ✅ Solution: Verify Environment Variables in Netlify

### Step 1: Check Environment Variables

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Environment Variables**
   - Go to: **Site settings** → **Environment variables**
   - Or: **Site settings** → **Build & deploy** → **Environment**

3. **Verify All 6 Variables Are Set**

   Make sure these exact variable names exist (case-sensitive):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   ```

4. **Check Values Are Correct**

   Verify the values match your Firebase config:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = cursormedi.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = cursormedi
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = cursormedi.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 276906495326
   NEXT_PUBLIC_FIREBASE_APP_ID = 1:276906495326:web:8ca0b2d409573aee8c53cf
   ```

### Step 2: Common Issues to Check

#### Issue 1: Missing "NEXT_PUBLIC_" Prefix
❌ Wrong: `FIREBASE_API_KEY`
✅ Correct: `NEXT_PUBLIC_FIREBASE_API_KEY`

Next.js only exposes environment variables that start with `NEXT_PUBLIC_` to the browser.

#### Issue 2: Extra Spaces
❌ Wrong: `NEXT_PUBLIC_FIREBASE_API_KEY = AIza...` (space before =)
✅ Correct: `NEXT_PUBLIC_FIREBASE_API_KEY=AIza...` (no space)

#### Issue 3: Quotes Around Values
❌ Wrong: `NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."`
✅ Correct: `NEXT_PUBLIC_FIREBASE_API_KEY=AIza...` (no quotes needed)

#### Issue 4: Variables Not Applied
After adding/editing variables, you **must** trigger a new deploy.

### Step 3: Trigger New Deploy

1. **Go to Deploys Tab**
   - Click **"Deploys"** in top menu
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Wait for build to complete (2-3 minutes)

2. **Or Push a New Commit**
   ```bash
   git commit --allow-empty -m "Trigger Netlify rebuild"
   git push
   ```

### Step 4: Verify Build Logs

1. **Check Build Logs**
   - Go to **Deploys** → Click on latest deploy
   - Check **"Build log"**
   - Look for any errors about environment variables

2. **Verify Variables Are Available**
   - In build log, search for "NEXT_PUBLIC"
   - Variables should be available during build

## 🔍 Debugging Steps

### Check 1: Verify API Key in Firebase Console

1. Go to: https://console.firebase.google.com
2. Select your project: **cursormedi**
3. Go to: **Project settings** (gear icon)
4. Scroll to **"Your apps"**
5. Click on your web app
6. Verify the API key matches: `AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc`

### Check 2: Test Locally

1. **Verify `.env.local` exists** (for local testing)
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Test login** - if it works locally, the issue is Netlify config

### Check 3: Add Debug Logging (Temporary)

Add this to `lib/firebase.ts` temporarily to debug:

```typescript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
});
```

Check browser console to see if variables are loaded.

## 📝 Step-by-Step Fix

### If Variables Are Missing:

1. **Add Each Variable**
   - Go to: **Site settings** → **Environment variables**
   - Click **"Add variable"**
   - Enter name: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Enter value: `AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc`
   - Click **"Save"**
   - Repeat for all 6 variables

2. **Trigger New Deploy**
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**

### If Variables Exist But Wrong:

1. **Edit Each Variable**
   - Click on variable name
   - Update value
   - Click **"Save"**

2. **Trigger New Deploy**

## ✅ Quick Checklist

- [ ] All 6 environment variables exist in Netlify
- [ ] Variable names start with `NEXT_PUBLIC_`
- [ ] No spaces around `=` sign
- [ ] No quotes around values
- [ ] Values match Firebase Console
- [ ] New deploy triggered after adding/editing variables
- [ ] Build completed successfully
- [ ] Site reloaded after deployment

## 🎯 Most Common Fix

**90% of the time, the issue is:**
1. Environment variables weren't added to Netlify
2. Or a new deploy wasn't triggered after adding them

**Solution:**
1. Add all 6 variables in Netlify dashboard
2. Trigger a new deploy
3. Wait for build to complete
4. Test again

## 🆘 Still Not Working?

If it still doesn't work:

1. **Double-check API key** in Firebase Console
2. **Check build logs** for any errors
3. **Try redeploying** from a new commit
4. **Verify** the API key restrictions in Firebase Console (should allow your Netlify domain)

---

**After fixing, your site should work! 🎉**

