# 🏥 Hospital Management System

A modern, QR-based, episode-centric Hospital Management Web Application built with Next.js and Firebase.

## ✨ Features

- **Role-Based Access Control**: Admin, Doctor, and Patient dashboards
- **QR Code System**: Permanent QR codes for patient identification
- **Episode Management**: Track hospital visits as episodes
- **Medical Records**: Secure storage of diagnosis, prescriptions, and notes
- **Real-time Updates**: Firebase Firestore for live data synchronization

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Tailwind CSS
- **QR Codes**: qrcode.react, html5-qrcode

## 📋 Prerequisites

- Node.js 18+
- Firebase account
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd techsprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create `.env.local` file
   - Add your Firebase configuration:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. **Deploy Firestore Rules**
   ```bash
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```

5. **Seed Sample Data (Optional)**
   ```bash
   npm run seed
   ```

6. **Run Development Server**
   ```bash
   npm run dev
   ```

## 👥 Demo Credentials

After seeding data:
- **Admin**: admin@hospital.com / admin123
- **Doctor**: doctor@hospital.com / doctor123
- **Patient**: patient@hospital.com / patient123

## 📚 Documentation

- `QUICK_START.md` - Quick setup guide
- `FIREBASE_QUICK_SETUP.md` - Firebase setup instructions
- `NETLIFY_DEPLOYMENT.md` - Netlify deployment guide
- `ARCHITECTURE.md` - System architecture

## 🚀 Deployment

### Netlify (Recommended)
See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

Quick deploy:
1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Deploy!

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 📝 License

This project is created for hackathon/demo purposes.

## 🤝 Contributing

This is a hackathon MVP. For production use, consider:
- Adding input validation
- Implementing proper error handling
- Adding unit tests
- Enhancing security rules

---

**Built with ❤️ for Healthcare Management**

