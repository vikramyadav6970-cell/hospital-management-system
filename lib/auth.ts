// Authentication utilities with role-based access control
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
  hospitalId?: string;
  createdAt: any;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign up new user (Admin only for creating doctors/admins)
 * For patients, use phone/OTP flow (simplified here as email)
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole,
  phone?: string,
  hospitalId?: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore
  const userData: UserData = {
    uid: user.uid,
    email,
    role,
    name,
    phone,
    hospitalId,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', user.uid), userData);

  // Create role-specific document
  if (role === 'patient') {
    await setDoc(doc(db, 'patients', user.uid), {
      patient_id: user.uid,
      name,
      email,
      phone: phone || '',
      hospital_id: hospitalId || '',
      qr_code_data: user.uid, // QR stores only patient_id
      created_at: serverTimestamp(),
    });
  } else if (role === 'doctor') {
    await setDoc(doc(db, 'doctors', user.uid), {
      doctor_id: user.uid,
      name,
      email,
      phone: phone || '',
      specialization: '',
      is_available: true,
      created_at: serverTimestamp(),
    });
  }

  return user;
}

/**
 * Get user data with role
 */
export async function getUserData(uid: string): Promise<UserData | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  }
  return null;
}

/**
 * Get current user's role
 */
export async function getUserRole(uid: string): Promise<UserRole | null> {
  const userData = await getUserData(uid);
  return userData?.role || null;
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}



