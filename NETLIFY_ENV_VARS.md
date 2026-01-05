# 🔑 Netlify Environment Variables - Exact Values

Copy and paste these **exactly** into Netlify Dashboard:

## 📋 Step-by-Step

1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Click **"Add variable"** for each one

## ✅ Variables to Add

### Variable 1:
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc
```

### Variable 2:
```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: cursormedi.firebaseapp.com
```

### Variable 3:
```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: cursormedi
```

### Variable 4:
```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: cursormedi.firebasestorage.app
```

### Variable 5:
```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 276906495326
```

### Variable 6:
```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:276906495326:web:8ca0b2d409573aee8c53cf
```

## ⚠️ Important Notes

1. **Variable names are case-sensitive** - must be exactly as shown
2. **No spaces** around the `=` sign
3. **No quotes** around values
4. **Must start with `NEXT_PUBLIC_`** for Next.js to expose them

## 🔄 After Adding Variables

1. **Go to Deploys tab**
2. **Click "Trigger deploy"** → **"Deploy site"**
3. **Wait 2-3 minutes** for build to complete
4. **Test your site** - the error should be fixed!

## ✅ Verification

After deployment, check:
- [ ] All 6 variables are listed
- [ ] Values match exactly
- [ ] New deploy completed successfully
- [ ] Site loads without API key error

---

**Copy these values exactly as shown above!**

