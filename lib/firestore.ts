// Firestore database operations
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ==================== TYPES ====================

export interface Patient {
  patient_id: string;
  name: string;
  email: string;
  phone: string;
  hospital_id: string;
  qr_code_data: string;
  created_at: Timestamp;
}

export interface Doctor {
  doctor_id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  is_available: boolean;
  created_at: Timestamp;
}

export interface Episode {
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

export interface MedicalRecord {
  record_id: string;
  episode_id: string;
  patient_id: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  created_by: string; // doctor_id
  created_at: Timestamp;
}

// ==================== PATIENT OPERATIONS ====================

export async function getPatient(patientId: string): Promise<Patient | null> {
  const patientDoc = await getDoc(doc(db, 'patients', patientId));
  if (patientDoc.exists()) {
    return { ...patientDoc.data(), patient_id: patientDoc.id } as Patient;
  }
  return null;
}

export async function getAllPatients(): Promise<Patient[]> {
  const snapshot = await getDocs(collection(db, 'patients'));
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    patient_id: doc.id,
  })) as Patient[];
}

// ==================== DOCTOR OPERATIONS ====================

export async function getDoctor(doctorId: string): Promise<Doctor | null> {
  const doctorDoc = await getDoc(doc(db, 'doctors', doctorId));
  if (doctorDoc.exists()) {
    return { ...doctorDoc.data(), doctor_id: doctorDoc.id } as Doctor;
  }
  return null;
}

export async function getAllDoctors(): Promise<Doctor[]> {
  const snapshot = await getDocs(collection(db, 'doctors'));
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    doctor_id: doc.id,
  })) as Doctor[];
}

export async function getAvailableDoctors(): Promise<Doctor[]> {
  const q = query(
    collection(db, 'doctors'),
    where('is_available', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    doctor_id: doc.id,
  })) as Doctor[];
}

// ==================== EPISODE OPERATIONS ====================

export async function createEpisode(
  patientId: string,
  episodeType: 'OPD' | 'Emergency',
  adminNotes?: string
): Promise<string> {
  const episodeRef = doc(collection(db, 'episodes'));
  const episodeData: Omit<Episode, 'episode_id'> = {
    patient_id: patientId,
    episode_type: episodeType,
    status: 'pending',
    admin_notes: adminNotes || '',
    created_at: serverTimestamp() as Timestamp,
    updated_at: serverTimestamp() as Timestamp,
  };
  await setDoc(episodeRef, episodeData);
  return episodeRef.id;
}

export async function getEpisode(episodeId: string): Promise<Episode | null> {
  const episodeDoc = await getDoc(doc(db, 'episodes', episodeId));
  if (episodeDoc.exists()) {
    return { ...episodeDoc.data(), episode_id: episodeDoc.id } as Episode;
  }
  return null;
}

export async function getPatientEpisodes(patientId: string): Promise<Episode[]> {
  const q = query(
    collection(db, 'episodes'),
    where('patient_id', '==', patientId),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    episode_id: doc.id,
  })) as Episode[];
}

export async function getTodayEpisodes(): Promise<Episode[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const q = query(
    collection(db, 'episodes'),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  
  // Filter by today (client-side for simplicity)
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        ...data,
        episode_id: doc.id,
        created_at: data.created_at as Timestamp,
        updated_at: data.updated_at as Timestamp,
        completed_at: data.completed_at as Timestamp | undefined,
      } as Episode;
    })
    .filter((episode) => {
      const episodeDate = episode.created_at.toDate();
      return episodeDate >= today;
    });
}

export async function getDoctorEpisodes(doctorId: string): Promise<Episode[]> {
  const q = query(
    collection(db, 'episodes'),
    where('assigned_doctor_id', '==', doctorId),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    episode_id: doc.id,
  })) as Episode[];
}

export async function getDoctorTodayEpisodes(doctorId: string): Promise<Episode[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const q = query(
    collection(db, 'episodes'),
    where('assigned_doctor_id', '==', doctorId),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        ...data,
        episode_id: doc.id,
        created_at: data.created_at as Timestamp,
        updated_at: data.updated_at as Timestamp,
        completed_at: data.completed_at as Timestamp | undefined,
      } as Episode;
    })
    .filter((episode) => {
      const episodeDate = episode.created_at.toDate();
      return episodeDate >= today;
    });
}

export async function assignDoctorToEpisode(
  episodeId: string,
  doctorId: string
): Promise<void> {
  await updateDoc(doc(db, 'episodes', episodeId), {
    assigned_doctor_id: doctorId,
    status: 'in_progress',
    updated_at: serverTimestamp(),
  });
}

export async function completeEpisode(episodeId: string): Promise<void> {
  await updateDoc(doc(db, 'episodes', episodeId), {
    status: 'completed',
    completed_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
}

// ==================== MEDICAL RECORD OPERATIONS ====================

export async function createMedicalRecord(
  episodeId: string,
  patientId: string,
  doctorId: string,
  diagnosis: string,
  prescription: string,
  notes: string
): Promise<string> {
  const recordRef = doc(collection(db, 'medical_records'));
  const recordData: Omit<MedicalRecord, 'record_id'> = {
    episode_id: episodeId,
    patient_id: patientId,
    diagnosis,
    prescription,
    notes,
    created_by: doctorId,
    created_at: serverTimestamp() as Timestamp,
  };
  await setDoc(recordRef, recordData);
  return recordRef.id;
}

export async function getEpisodeMedicalRecords(episodeId: string): Promise<MedicalRecord[]> {
  const q = query(
    collection(db, 'medical_records'),
    where('episode_id', '==', episodeId),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    record_id: doc.id,
  })) as MedicalRecord[];
}

export async function getPatientMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
  const q = query(
    collection(db, 'medical_records'),
    where('patient_id', '==', patientId),
    orderBy('created_at', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    record_id: doc.id,
  })) as MedicalRecord[];
}

