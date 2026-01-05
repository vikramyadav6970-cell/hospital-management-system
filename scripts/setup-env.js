// Script to create .env.local from template
const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local already exists');
  process.exit(0);
}

let template = `# Firebase Configuration
# Get these values from Firebase Console > Project Settings > Your apps

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
`;

try {
  fs.writeFileSync(envLocalPath, template);
  console.log('✅ Created .env.local file');
  console.log('⚠️  Please update .env.local with your Firebase credentials');
  console.log('   See FIREBASE_SETUP.md for instructions');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
}



