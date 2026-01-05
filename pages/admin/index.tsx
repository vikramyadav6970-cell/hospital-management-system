// Admin Dashboard - Hospital Management
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth';
import Layout from '@/components/Layout';
import QRScanner from '@/components/QRScanner';
import {
  getPatient,
  getTodayEpisodes,
  getAllDoctors,
  createEpisode,
  assignDoctorToEpisode,
  getEpisode,
  Patient,
  Doctor,
  Episode,
} from '@/lib/firestore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [scannedPatientId, setScannedPatientId] = useState<string | null>(null);
  const [scannedPatient, setScannedPatient] = useState<Patient | null>(null);
  const [todayEpisodes, setTodayEpisodes] = useState<Episode[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [episodeType, setEpisodeType] = useState<'OPD' | 'Emergency'>('OPD');
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        if (role !== 'admin') {
          router.push('/login');
        } else {
          setUser(user);
          loadData();
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadData = async () => {
    try {
      const [episodes, doctorsList] = await Promise.all([
        getTodayEpisodes(),
        getAllDoctors(),
      ]);
      setTodayEpisodes(episodes);
      setDoctors(doctorsList);
    } catch (error: any) {
      toast.error('Error loading data: ' + error.message);
    }
  };

  const handleQRScan = async (patientId: string) => {
    try {
      const patient = await getPatient(patientId);
      if (patient) {
        setScannedPatientId(patientId);
        setScannedPatient(patient);
        toast.success('Patient found: ' + patient.name);
      } else {
        toast.error('Patient not found');
      }
    } catch (error: any) {
      toast.error('Error fetching patient: ' + error.message);
    }
  };

  const handleCreateEpisode = async () => {
    if (!scannedPatientId) {
      toast.error('Please scan a patient QR code first');
      return;
    }

    try {
      const episodeId = await createEpisode(scannedPatientId, episodeType, adminNotes);
      toast.success('Episode created successfully');
      setShowEpisodeForm(false);
      setAdminNotes('');
      await loadData();
      
      // Auto-assign doctor if selected
      if (selectedDoctorId) {
        await assignDoctorToEpisode(episodeId, selectedDoctorId);
        toast.success('Doctor assigned successfully');
        await loadData();
      }
    } catch (error: any) {
      toast.error('Error creating episode: ' + error.message);
    }
  };

  const handleAssignDoctor = async (episodeId: string) => {
    if (!selectedDoctorId) {
      toast.error('Please select a doctor');
      return;
    }

    try {
      await assignDoctorToEpisode(episodeId, selectedDoctorId);
      toast.success('Doctor assigned successfully');
      await loadData();
      setSelectedDoctorId('');
    } catch (error: any) {
      toast.error('Error assigning doctor: ' + error.message);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Layout role="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Scanner Section */}
          <div>
            <QRScanner onScanSuccess={handleQRScan} />
            
            {scannedPatient && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Scanned Patient</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {scannedPatient.name}</p>
                  <p><span className="font-medium">Email:</span> {scannedPatient.email}</p>
                  <p><span className="font-medium">Phone:</span> {scannedPatient.phone}</p>
                  <p><span className="font-medium">Hospital ID:</span> {scannedPatient.hospital_id}</p>
                </div>
                
                <button
                  onClick={() => setShowEpisodeForm(!showEpisodeForm)}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {showEpisodeForm ? 'Cancel' : 'Create New Episode'}
                </button>

                {showEpisodeForm && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Episode Type
                      </label>
                      <select
                        value={episodeType}
                        onChange={(e) => setEpisodeType(e.target.value as 'OPD' | 'Emergency')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="OPD">OPD</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes
                      </label>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assign Doctor (Optional)
                      </label>
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.doctor_id} value={doctor.doctor_id}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleCreateEpisode}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Create Episode
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Today's Episodes Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Episodes</h2>
              <div className="space-y-4">
                {todayEpisodes.length === 0 ? (
                  <p className="text-gray-500">No episodes today</p>
                ) : (
                  todayEpisodes.map((episode) => (
                    <div
                      key={episode.episode_id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Episode #{episode.episode_id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Type: {episode.episode_type} | Status: {episode.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(episode.created_at.toDate(), 'PPp')}
                          </p>
                          {episode.admin_notes && (
                            <p className="text-sm text-gray-700 mt-2">
                              Notes: {episode.admin_notes}
                            </p>
                          )}
                        </div>
                        {episode.status === 'pending' && (
                          <div className="flex flex-col gap-2">
                            <select
                              value={selectedDoctorId}
                              onChange={(e) => setSelectedDoctorId(e.target.value)}
                              className="text-sm px-2 py-1 border border-gray-300 rounded"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="">Assign Doctor</option>
                              {doctors.map((doctor) => (
                                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                  {doctor.name}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssignDoctor(episode.episode_id)}
                              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Assign
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Doctor Availability */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Doctor Availability</h2>
              <div className="space-y-2">
                {doctors.length === 0 ? (
                  <p className="text-gray-500">No doctors available</p>
                ) : (
                  doctors.map((doctor) => (
                    <div
                      key={doctor.doctor_id}
                      className="flex justify-between items-center p-2 border border-gray-200 rounded"
                    >
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          doctor.is_available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {doctor.is_available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

