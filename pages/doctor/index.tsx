// Doctor Dashboard with Episode Workbench
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth';
import Layout from '@/components/Layout';
import {
  getDoctorTodayEpisodes,
  getEpisode,
  getPatient,
  getPatientEpisodes,
  getEpisodeMedicalRecords,
  createMedicalRecord,
  completeEpisode,
  Patient,
  Episode,
  MedicalRecord,
} from '@/lib/firestore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function DoctorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [todayEpisodes, setTodayEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patientHistory, setPatientHistory] = useState<Episode[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        if (role !== 'doctor') {
          router.push('/login');
        } else {
          setUser(user);
          loadTodayEpisodes();
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadTodayEpisodes = async () => {
    if (!user) return;
    try {
      const episodes = await getDoctorTodayEpisodes(user.uid);
      setTodayEpisodes(episodes);
    } catch (error: any) {
      toast.error('Error loading episodes: ' + error.message);
    }
  };

  const handleSelectEpisode = async (episode: Episode) => {
    try {
      const [patientData, history, records] = await Promise.all([
        getPatient(episode.patient_id),
        getPatientEpisodes(episode.patient_id),
        getEpisodeMedicalRecords(episode.episode_id),
      ]);

      setSelectedEpisode(episode);
      setPatient(patientData);
      setPatientHistory(history);
      setMedicalRecords(records);
      
      // Pre-fill with existing record if any
      if (records.length > 0) {
        const latestRecord = records[0];
        setDiagnosis(latestRecord.diagnosis);
        setPrescription(latestRecord.prescription);
        setNotes(latestRecord.notes);
      } else {
        setDiagnosis('');
        setPrescription('');
        setNotes('');
      }
    } catch (error: any) {
      toast.error('Error loading episode details: ' + error.message);
    }
  };

  const handleSaveRecord = async () => {
    if (!selectedEpisode || !user) {
      toast.error('Please select an episode');
      return;
    }

    if (!diagnosis.trim() || !prescription.trim()) {
      toast.error('Please fill in diagnosis and prescription');
      return;
    }

    try {
      await createMedicalRecord(
        selectedEpisode.episode_id,
        selectedEpisode.patient_id,
        user.uid,
        diagnosis,
        prescription,
        notes
      );
      toast.success('Medical record saved successfully');
      
      // Reload records
      const records = await getEpisodeMedicalRecords(selectedEpisode.episode_id);
      setMedicalRecords(records);
    } catch (error: any) {
      toast.error('Error saving record: ' + error.message);
    }
  };

  const handleCompleteEpisode = async () => {
    if (!selectedEpisode) return;

    try {
      await completeEpisode(selectedEpisode.episode_id);
      toast.success('Episode marked as completed');
      await loadTodayEpisodes();
      setSelectedEpisode(null);
    } catch (error: any) {
      toast.error('Error completing episode: ' + error.message);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Layout role="doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Episodes List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Assigned Episodes</h2>
              <div className="space-y-3">
                {todayEpisodes.length === 0 ? (
                  <p className="text-gray-500">No episodes assigned today</p>
                ) : (
                  todayEpisodes.map((episode) => (
                    <button
                      key={episode.episode_id}
                      onClick={() => handleSelectEpisode(episode)}
                      className={`w-full text-left p-4 border rounded-lg transition-colors ${
                        selectedEpisode?.episode_id === episode.episode_id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-medium">
                        Episode #{episode.episode_id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {episode.episode_type} | {episode.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(episode.created_at.toDate(), 'h:mm a')}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Episode Workbench */}
          <div className="lg:col-span-2">
            {selectedEpisode ? (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Episode Workbench</h2>
                    <p className="text-sm text-gray-600">
                      Episode #{selectedEpisode.episode_id.slice(0, 8)} |{' '}
                      {selectedEpisode.episode_type} | {selectedEpisode.status}
                    </p>
                  </div>
                  {selectedEpisode.status !== 'completed' && (
                    <button
                      onClick={handleCompleteEpisode}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>

                {/* Patient Summary */}
                {patient && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3">Patient Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {patient.name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {patient.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {patient.phone}
                      </div>
                      <div>
                        <span className="font-medium">Hospital ID:</span> {patient.hospital_id}
                      </div>
                    </div>
                  </div>
                )}

                {/* Medical History */}
                {patientHistory.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3">Medical History</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {patientHistory.map((ep) => (
                        <div
                          key={ep.episode_id}
                          className="p-3 bg-gray-50 rounded text-sm"
                        >
                          <p className="font-medium">
                            {ep.episode_type} - {ep.status} ({format(ep.created_at.toDate(), 'PP')})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diagnosis & Prescription Form */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-3">Add Medical Record</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diagnosis *
                      </label>
                      <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Enter diagnosis..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prescription *
                      </label>
                      <textarea
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Enter prescription details..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Additional notes..."
                      />
                    </div>
                    <button
                      onClick={handleSaveRecord}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Save Medical Record
                    </button>
                  </div>
                </div>

                {/* Previous Records (Read-only) */}
                {medicalRecords.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3">Previous Records</h3>
                    <div className="space-y-4">
                      {medicalRecords.map((record) => (
                        <div key={record.record_id} className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-2">
                            {format(record.created_at.toDate(), 'PPp')}
                          </p>
                          <p className="font-medium mb-1">Diagnosis:</p>
                          <p className="text-sm mb-3">{record.diagnosis}</p>
                          <p className="font-medium mb-1">Prescription:</p>
                          <p className="text-sm mb-3">{record.prescription}</p>
                          {record.notes && (
                            <>
                              <p className="font-medium mb-1">Notes:</p>
                              <p className="text-sm">{record.notes}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                Select an episode to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

