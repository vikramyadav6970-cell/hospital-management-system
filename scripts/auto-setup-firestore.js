// Script to help with Firestore initialization
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Firestore Setup Helper\n');

// Check if .firebaserc exists
const firebaseRcPath = path.join(process.cwd(), '.firebaserc');
const firebaseJsonPath = path.join(process.cwd(), 'firebase.json');

if (!fs.existsSync(firebaseRcPath)) {
  console.log('📝 To initialize Firestore:');
  console.log('   1. Run: firebase login');
  console.log('   2. Run: firebase init firestore');
  console.log('   3. When prompted:');
  console.log('      - Select "Use an existing project"');
  console.log('      - Choose your project');
  console.log('      - Firestore Rules file: firestore.rules');
  console.log('      - Firestore indexes file: firestore.indexes.json');
  console.log('   4. Run: firebase deploy --only firestore:rules\n');
} else {
  console.log('✅ Firebase project is initialized');
  console.log('\n📋 To deploy Firestore rules, run:');
  console.log('   firebase deploy --only firestore:rules\n');
  
  // Check if user wants to deploy now
  try {
    console.log('Attempting to deploy Firestore rules...\n');
    execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
    console.log('\n✅ Firestore rules deployed successfully!');
  } catch (error) {
    console.log('\n⚠️  Could not deploy automatically. Please run manually:');
    console.log('   firebase deploy --only firestore:rules\n');
  }
}



