# Hospital Management System - QR-Based Episode Management

A modern, episode-centric Hospital Management Web Application built with Next.js and Firebase. This system uses QR codes for patient identification and manages hospital visits as episodes.

## 🎯 Core Features

- **Role-Based Access Control**: Three distinct user roles (Admin, Doctor, Patient)
- **QR Code System**: Each patient has a permanent QR code containing only their patient ID
- **Episode-Centric Design**: Every hospital visit is tracked as an episode
- **Secure Data Storage**: Medical records stored in Firestore, never in QR codes
- **Real-time Updates**: Firebase Firestore for live data synchronization

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 with React 18
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **QR Codes**: `qrcode.react` for generation, `html5-qrcode` for scanning
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast

### Database Schema

#### Collections:
1. **users** - User authentication and role data
2. **patients** - Patient profiles with QR code data
3. **doctors** - Doctor profiles and availability
4. **episodes** - Hospital visit episodes (OPD/Emergency)
5. **medical_records** - Diagnosis, prescriptions, and notes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account and project
- Modern web browser with camera access (for QR scanning)

### Installation

1. **Clone the repository**
   ```bash
   cd techsprint
   npm install
   ```

2. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config

3. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Seed Sample Data** (Optional)
   ```bash
   # Update firebase config in scripts/seed-data.ts first
   npx ts-node scripts/seed-data.ts
   ```

6. **Run Development Server**
   ```bash
   npm run dev
   ```

7. **Open in Browser**
   Navigate to `http://localhost:3000`

## 👥 User Roles & Features

### Admin (Hospital Management)
- **QR Scanner**: Scan patient QR codes to fetch patient profiles
- **Episode Management**: Create new episodes (OPD/Emergency)
- **Doctor Assignment**: Assign doctors to episodes
- **Dashboard**: View today's episodes and doctor availability
- **Access**: Full system access

### Doctor
- **Episode Workbench**: Unified screen for treating patients
- **Patient Summary**: View patient information and medical history
- **Medical Records**: Add diagnosis, prescriptions, and notes
- **Today's Episodes**: View assigned episodes for the day
- **Access**: Can only edit current assigned episodes

### Patient
- **QR Code Display**: View and download permanent QR code
- **Episode History**: View all past and current episodes
- **Medical Records**: Read-only access to diagnosis and prescriptions
- **Billing Summary**: View episode-based billing information
- **Access**: Read-only access to own data

## 🔐 Security Features

- **Role-Based Access Control**: Firestore security rules enforce role permissions
- **QR Code Security**: QR codes contain only patient IDs, never medical data
- **Data Isolation**: Patients can only view their own records
- **Secure Authentication**: Firebase Authentication with email/password

## 📱 QR Code Workflow

1. **Patient Registration**: System generates permanent QR code with patient ID
2. **Admin Scans QR**: Admin uses dashboard scanner to read patient QR
3. **Patient Lookup**: System fetches patient profile using patient ID
4. **Episode Creation**: Admin creates new episode linked to patient
5. **Doctor Assignment**: Admin assigns doctor to episode
6. **Treatment**: Doctor adds medical records to episode
7. **Patient View**: Patient can view episode details and records

## 🗄️ Database Structure

### Users Collection
```typescript
{
  uid: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  name: string;
  phone?: string;
  hospitalId?: string;
  createdAt: Timestamp;
}
```

### Episodes Collection
```typescript
{
  episode_id: string;
  patient_id: string;
  episode_type: 'OPD' | 'Emergency';
  assigned_doctor_id?: string;
  status: 'pending' | 'in_progress' | 'completed';
  admin_notes?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  completed_at?: Timestamp;
}
```

### Medical Records Collection
```typescript
{
  record_id: string;
  episode_id: string;
  patient_id: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  created_by: string; // doctor_id
  created_at: Timestamp;
}
```

## 🚢 Deployment

### Firebase Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Initialize Firebase** (if not done)
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Environment Variables
Make sure to set environment variables in Firebase Hosting or use Firebase Functions config.

## 📝 Demo Credentials

After seeding data:
- **Admin**: `admin@hospital.com` / `admin123`
- **Doctor**: `doctor@hospital.com` / `doctor123`
- **Patient**: `patient@hospital.com` / `patient123`

## 🛠️ Development

### Project Structure
```
techsprint/
├── components/          # React components
│   ├── Layout.tsx       # Main layout with navigation
│   ├── QRCodeDisplay.tsx # Patient QR code display
│   └── QRScanner.tsx    # Admin QR scanner
├── lib/                 # Utility libraries
│   ├── firebase.ts      # Firebase configuration
│   ├── auth.ts          # Authentication utilities
│   ├── firestore.ts    # Firestore operations
│   └── qr.ts           # QR code utilities
├── pages/              # Next.js pages
│   ├── login.tsx       # Login page
│   ├── admin/         # Admin dashboard
│   ├── doctor/        # Doctor dashboard
│   └── patient/       # Patient dashboard
├── scripts/            # Utility scripts
│   └── seed-data.ts   # Sample data seeder
├── styles/             # Global styles
└── firestore.rules     # Firestore security rules
```

## 🔧 Troubleshooting

### QR Scanner Not Working
- Ensure camera permissions are granted
- Use HTTPS in production (required for camera access)
- Check browser compatibility

### Authentication Issues
- Verify Firebase config in `.env.local`
- Check Firestore rules are deployed
- Ensure Authentication is enabled in Firebase Console

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📄 License

This project is created for hackathon/demo purposes.

## 🤝 Contributing

This is a hackathon MVP. For production use, consider:
- Adding input validation
- Implementing proper error handling
- Adding unit tests
- Enhancing security rules
- Adding audit logging
- Implementing proper billing system

## 📞 Support

For issues or questions, please refer to the Firebase documentation or Next.js documentation.

---

**Built with ❤️ for Healthcare Management**



