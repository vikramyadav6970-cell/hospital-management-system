// Script to seed sample data for demo purposes
// Run with: npx ts-node scripts/seed-data.ts
// Make sure to set up Firebase config first

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXhy3pKgPA9erC7EvrJRGQd-hMiFc2Lwc",
  authDomain: "cursormedi.firebaseapp.com",
  projectId: "cursormedi",
  storageBucket: "cursormedi.firebasestorage.app",
  messagingSenderId: "276906495326",
  appId: "1:276906495326:web:8ca0b2d409573aee8c53cf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function seedData() {
  console.log('Starting data seeding...');

  try {
    // Create Admin User
    console.log('Creating admin user...');
    const adminCred = await createUserWithEmailAndPassword(
      auth,
      'admin@hospital.com',
      'admin123'
    );
    
    await setDoc(doc(db, 'users', adminCred.user.uid), {
      uid: adminCred.user.uid,
      email: 'admin@hospital.com',
      role: 'admin',
      name: 'Hospital Admin',
      createdAt: serverTimestamp(),
    });
    console.log('Admin created:', adminCred.user.uid);

    // Create Doctor User
    console.log('Creating doctor user...');
    const doctorCred = await createUserWithEmailAndPassword(
      auth,
      'doctor@hospital.com',
      'doctor123'
    );
    
    await setDoc(doc(db, 'users', doctorCred.user.uid), {
      uid: doctorCred.user.uid,
      email: 'doctor@hospital.com',
      role: 'doctor',
      name: 'Dr. John Smith',
      phone: '+1234567890',
      createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, 'doctors', doctorCred.user.uid), {
      doctor_id: doctorCred.user.uid,
      name: 'Dr. John Smith',
      email: 'doctor@hospital.com',
      phone: '+1234567890',
      specialization: 'General Medicine',
      is_available: true,
      created_at: serverTimestamp(),
    });
    console.log('Doctor created:', doctorCred.user.uid);

    // Create Patient User
    console.log('Creating patient user...');
    const patientCred = await createUserWithEmailAndPassword(
      auth,
      'patient@hospital.com',
      'patient123'
    );
    
    await setDoc(doc(db, 'users', patientCred.user.uid), {
      uid: patientCred.user.uid,
      email: 'patient@hospital.com',
      role: 'patient',
      name: 'Jane Doe',
      phone: '+0987654321',
      hospitalId: 'HOSP001',
      createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, 'patients', patientCred.user.uid), {
      patient_id: patientCred.user.uid,
      name: 'Jane Doe',
      email: 'patient@hospital.com',
      phone: '+0987654321',
      hospital_id: 'HOSP001',
      qr_code_data: patientCred.user.uid,
      created_at: serverTimestamp(),
    });
    console.log('Patient created:', patientCred.user.uid);

    // Create sample episodes
    console.log('Creating sample episodes...');
    const episode1Ref = doc(collection(db, 'episodes'));
    await setDoc(episode1Ref, {
      patient_id: patientCred.user.uid,
      episode_type: 'OPD',
      assigned_doctor_id: doctorCred.user.uid,
      status: 'completed',
      admin_notes: 'Regular checkup',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      completed_at: serverTimestamp(),
    });

    const episode2Ref = doc(collection(db, 'episodes'));
    await setDoc(episode2Ref, {
      patient_id: patientCred.user.uid,
      episode_type: 'Emergency',
      assigned_doctor_id: doctorCred.user.uid,
      status: 'in_progress',
      admin_notes: 'Emergency visit',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    // Create sample medical record
    console.log('Creating sample medical records...');
    const recordRef = doc(collection(db, 'medical_records'));
    await setDoc(recordRef, {
      episode_id: episode1Ref.id,
      patient_id: patientCred.user.uid,
      diagnosis: 'Common cold with mild fever',
      prescription: 'Paracetamol 500mg - 1 tablet every 6 hours for 3 days\nRest and plenty of fluids',
      notes: 'Patient should follow up if symptoms persist',
      created_by: doctorCred.user.uid,
      created_at: serverTimestamp(),
    });

    console.log('✅ Data seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin: admin@hospital.com / admin123');
    console.log('Doctor: doctor@hospital.com / doctor123');
    console.log('Patient: patient@hospital.com / patient123');
    
  } catch (error: any) {
    console.error('Error seeding data:', error.message);
    if (error.code === 'auth/email-already-in-use') {
      console.log('Users already exist. Skipping user creation.');
    }
  }
}

seedData().then(() => {
  console.log('Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});


