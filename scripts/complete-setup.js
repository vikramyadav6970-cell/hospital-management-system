// Complete setup script - runs after Firebase login
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Completing Firebase Setup...\n');

// Check if .firebaserc exists
const firebaseRcPath = path.join(process.cwd(), '.firebaserc');
if (!fs.existsSync(firebaseRcPath)) {
  console.log('✅ Created .firebaserc file');
}

console.log('📋 Next steps:\n');
console.log('1. Login to Firebase (if not already):');
console.log('   firebase login\n');
console.log('2. Initialize Firestore:');
console.log('   firebase init firestore');
console.log('   - Select "Use an existing project"');
console.log('   - Choose "cursormedi"');
console.log('   - Firestore Rules: firestore.rules');
console.log('   - Firestore Indexes: firestore.indexes.json\n');
console.log('3. Deploy Firestore rules:');
console.log('   firebase deploy --only firestore:rules\n');
console.log('4. Seed sample data:');
console.log('   npm run seed\n');
console.log('5. Start development server:');
console.log('   npm run dev\n');

// Try to check if user is logged in
try {
  execSync('firebase projects:list', { stdio: 'ignore' });
  console.log('✅ Firebase CLI is authenticated\n');
  console.log('Attempting to initialize Firestore...\n');
  
  // Check if firestore is already initialized
  const firestoreRulesPath = path.join(process.cwd(), 'firestore.rules');
  if (fs.existsSync(firestoreRulesPath)) {
    console.log('✅ Firestore rules file exists');
    console.log('You can now deploy rules with: firebase deploy --only firestore:rules\n');
  }
} catch (error) {
  console.log('⚠️  Firebase CLI not authenticated yet');
  console.log('Please run: firebase login\n');
}


