// Script to check if Firebase is properly configured
import * as fs from 'fs';
import * as path from 'path';

console.log('🔍 Checking Firebase Setup...\n');

// Check for .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  let allSet = true;
  requiredVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      const value = envContent
        .split('\n')
        .find((line) => line.startsWith(varName))
        ?.split('=')[1]
        ?.trim();
      if (value && !value.includes('your-') && value !== '') {
        console.log(`  ✅ ${varName} is set`);
      } else {
        console.log(`  ⚠️  ${varName} needs to be configured`);
        allSet = false;
      }
    } else {
      console.log(`  ❌ ${varName} is missing`);
      allSet = false;
    }
  });

  if (allSet) {
    console.log('\n✅ All environment variables are configured!');
  } else {
    console.log('\n⚠️  Please update .env.local with your Firebase credentials');
    console.log('   See FIREBASE_SETUP.md for instructions');
  }
} else {
  console.log('❌ .env.local file not found');
  console.log('   Create .env.local with your Firebase config');
  console.log('   See FIREBASE_SETUP.md for instructions');
}

// Check for firestore.rules
const rulesPath = path.join(process.cwd(), 'firestore.rules');
if (fs.existsSync(rulesPath)) {
  console.log('\n✅ firestore.rules file exists');
} else {
  console.log('\n❌ firestore.rules file not found');
}

// Check for firebase.json
const firebaseJsonPath = path.join(process.cwd(), 'firebase.json');
if (fs.existsSync(firebaseJsonPath)) {
  console.log('✅ firebase.json file exists');
} else {
  console.log('❌ firebase.json file not found');
}

console.log('\n📝 Next steps:');
console.log('   1. Configure .env.local with Firebase credentials');
console.log('   2. Run: firebase login');
console.log('   3. Run: firebase init firestore');
console.log('   4. Run: firebase deploy --only firestore:rules');
console.log('   5. Run: npx ts-node scripts/seed-data.ts (optional)');
console.log('   6. Run: npm run dev');



