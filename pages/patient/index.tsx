// Patient Dashboard with QR Code and Episode History
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth';
import Layout from '@/components/Layout';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import {
  getPatientEpisodes,
  getEpisodeMedicalRecords,
  getPatient,
  Episode,
  MedicalRecord,
  Patient,
} from '@/lib/firestore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        if (role !== 'patient') {
          router.push('/login');
        } else {
          setUser(user);
          loadPatientData();
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadPatientData = async () => {
    if (!user) return;
    try {
      const [patientData, episodeList] = await Promise.all([
        getPatient(user.uid),
        getPatientEpisodes(user.uid),
      ]);
      setPatient(patientData);
      setEpisodes(episodeList);
    } catch (error: any) {
      toast.error('Error loading data: ' + error.message);
    }
  };

  const handleSelectEpisode = async (episode: Episode) => {
    try {
      const records = await getEpisodeMedicalRecords(episode.episode_id);
      setSelectedEpisode(episode);
      setMedicalRecords(records);
    } catch (error: any) {
      toast.error('Error loading episode details: ' + error.message);
    }
  };

  if (!user || !patient) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate billing summary (simplified)
  const completedEpisodes = episodes.filter((e) => e.status === 'completed');
  const totalBilling = completedEpisodes.length * 500; // Simplified: 500 per episode

  return (
    <Layout role="patient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Patient Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Section */}
          <div className="lg:col-span-1">
            <QRCodeDisplay patientId={user.uid} />
            
            {/* Billing Summary */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Episodes:</span>
                  <span className="font-medium">{episodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium">{completedEpisodes.length}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-semibold text-blue-600">₹{totalBilling}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Episode History</h2>
              <div className="space-y-3">
                {episodes.length === 0 ? (
                  <p className="text-gray-500">No episodes found</p>
                ) : (
                  episodes.map((episode) => (
                    <button
                      key={episode.episode_id}
                      onClick={() => handleSelectEpisode(episode)}
                      className={`w-full text-left p-4 border rounded-lg transition-colors ${
                        selectedEpisode?.episode_id === episode.episode_id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Episode #{episode.episode_id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {episode.episode_type} | {episode.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(episode.created_at.toDate(), 'PPp')}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            episode.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : episode.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {episode.status}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Episode Details */}
            {selectedEpisode && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Episode Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Episode ID</p>
                    <p className="font-mono text-sm">{selectedEpisode.episode_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{selectedEpisode.episode_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{selectedEpisode.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">
                      {format(selectedEpisode.created_at.toDate(), 'PPp')}
                    </p>
                  </div>

                  {/* Medical Records */}
                  {medicalRecords.length > 0 ? (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3">Medical Records</h3>
                      <div className="space-y-4">
                        {medicalRecords.map((record) => (
                          <div key={record.record_id} className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-3">
                              {format(record.created_at.toDate(), 'PPp')}
                            </p>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Diagnosis:
                                </p>
                                <p className="text-sm text-gray-900">{record.diagnosis}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Prescription:
                                </p>
                                <p className="text-sm text-gray-900 whitespace-pre-line">
                                  {record.prescription}
                                </p>
                              </div>
                              {record.notes && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">
                                    Notes:
                                  </p>
                                  <p className="text-sm text-gray-900">{record.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-4">
                      <p className="text-gray-500">No medical records available yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

