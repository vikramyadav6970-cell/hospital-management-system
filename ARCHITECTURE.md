# System Architecture

## Overview

This Hospital Management System is built with a **QR-based, episode-centric** architecture where:
- Each patient has a **permanent QR code** containing only their patient ID
- Every hospital visit is tracked as an **episode**
- Medical data is stored securely in Firestore, never in QR codes
- Role-based access control ensures data security

## System Flow

```
┌─────────────┐
│   Patient   │
│  (QR Code)  │
└──────┬──────┘
       │
       │ Scan QR
       ▼
┌─────────────┐
│    Admin    │ ────► Create Episode ────► Assign Doctor
└─────────────┘
       │
       ▼
┌─────────────┐
│   Doctor    │ ────► Add Medical Records ────► Complete Episode
└─────────────┘
       │
       ▼
┌─────────────┐
│   Patient   │ ────► View Episode History & Records (Read-only)
└─────────────┘
```

## Database Schema

### Collections Structure

```
Firestore
├── users/
│   └── {uid}/
│       ├── uid: string
│       ├── email: string
│       ├── role: 'admin' | 'doctor' | 'patient'
│       ├── name: string
│       └── createdAt: Timestamp
│
├── patients/
│   └── {patient_id}/
│       ├── patient_id: string (same as uid)
│       ├── name: string
│       ├── email: string
│       ├── phone: string
│       ├── hospital_id: string
│       ├── qr_code_data: string (patient_id only)
│       └── created_at: Timestamp
│
├── doctors/
│   └── {doctor_id}/
│       ├── doctor_id: string (same as uid)
│       ├── name: string
│       ├── email: string
│       ├── phone: string
│       ├── specialization: string
│       ├── is_available: boolean
│       └── created_at: Timestamp
│
├── episodes/
│   └── {episode_id}/
│       ├── episode_id: string (auto-generated)
│       ├── patient_id: string (reference to patients)
│       ├── episode_type: 'OPD' | 'Emergency'
│       ├── assigned_doctor_id: string (reference to doctors)
│       ├── status: 'pending' | 'in_progress' | 'completed'
│       ├── admin_notes: string
│       ├── created_at: Timestamp
│       ├── updated_at: Timestamp
│       └── completed_at: Timestamp (optional)
│
└── medical_records/
    └── {record_id}/
        ├── record_id: string (auto-generated)
        ├── episode_id: string (reference to episodes)
        ├── patient_id: string (reference to patients)
        ├── diagnosis: string
        ├── prescription: string
        ├── notes: string
        ├── created_by: string (doctor_id)
        └── created_at: Timestamp
```

## Security Model

### Firestore Security Rules

1. **Users Collection**
   - Read: Own data or Admin
   - Write: Admin only

2. **Patients Collection**
   - Read: Admin, Doctor, or own patient data
   - Write: Admin only

3. **Doctors Collection**
   - Read: All authenticated users
   - Write: Admin only

4. **Episodes Collection**
   - Read: Admin, Doctor, or own patient episodes
   - Create: Admin only
   - Update: Admin or assigned Doctor

5. **Medical Records Collection**
   - Read: Admin, Doctor, or own patient records
   - Create: Doctor only
   - Update: Doctor who created it
   - Delete: Admin only

## QR Code Security

### What's in the QR Code
```json
{
  "patient_id": "abc123xyz"
}
```

### What's NOT in the QR Code
- ❌ Medical records
- ❌ Diagnosis
- ❌ Prescription
- ❌ Personal information
- ❌ Episode history

### QR Code Flow
1. Patient receives permanent QR code (contains only patient_id)
2. Admin scans QR code at hospital
3. System extracts patient_id from QR
4. System queries Firestore for patient profile
5. Admin creates episode linked to patient_id
6. All medical data stored in Firestore, never in QR

## Role-Based Access Control

### Admin Role
**Permissions:**
- ✅ Full read/write access to all collections
- ✅ Create episodes
- ✅ Assign doctors
- ✅ View all patient data
- ✅ Manage doctors and patients

**Restrictions:**
- ❌ Cannot create medical records (doctors only)
- ❌ Cannot edit past medical records

### Doctor Role
**Permissions:**
- ✅ Read assigned episodes
- ✅ Read patient profiles
- ✅ Create medical records for assigned episodes
- ✅ Update own medical records
- ✅ Mark episodes as completed

**Restrictions:**
- ❌ Cannot create episodes
- ❌ Cannot assign themselves to episodes
- ❌ Cannot edit past episodes
- ❌ Cannot view other doctors' patients (unless assigned)

### Patient Role
**Permissions:**
- ✅ Read own patient profile
- ✅ Read own episodes
- ✅ Read own medical records
- ✅ View QR code

**Restrictions:**
- ❌ No write access (read-only)
- ❌ Cannot view other patients' data
- ❌ Cannot create or edit episodes
- ❌ Cannot create medical records

## Episode Lifecycle

```
1. PENDING
   └─ Created by Admin
   └─ No doctor assigned yet

2. IN_PROGRESS
   └─ Doctor assigned by Admin
   └─ Doctor can add medical records

3. COMPLETED
   └─ Marked complete by Doctor
   └─ No further edits allowed
   └─ Patient can view final records
```

## Data Flow Examples

### Creating an Episode
```
Admin scans QR → Extract patient_id → 
Fetch patient from Firestore → 
Create episode document → 
Assign doctor (optional) → 
Notify doctor (future enhancement)
```

### Adding Medical Record
```
Doctor selects episode → 
Fetch patient history → 
Add diagnosis/prescription → 
Create medical_record document → 
Link to episode_id
```

### Patient Viewing Records
```
Patient logs in → 
Fetch own episodes → 
Select episode → 
Fetch medical_records for episode → 
Display (read-only)
```

## Scalability Considerations

### Current Design (MVP)
- Suitable for single hospital
- Handles hundreds of patients
- Real-time updates via Firestore

### Future Enhancements
- Multi-hospital support (add `hospital_id` to all collections)
- Pagination for large episode lists
- Caching layer for frequently accessed data
- Offline support with Firestore offline persistence
- Push notifications for episode assignments
- Advanced search and filtering

## Technology Choices

### Why Next.js?
- Server-side rendering for better SEO
- Easy deployment options
- Built-in routing
- TypeScript support

### Why Firebase?
- Real-time database (Firestore)
- Built-in authentication
- Easy hosting
- Scalable infrastructure
- Security rules at database level

### Why QR Codes?
- Fast patient identification
- No manual data entry
- Works offline (QR can be printed)
- Secure (only ID, no sensitive data)

## API Structure

### Firestore Queries

**Get Today's Episodes:**
```typescript
query(
  collection(db, 'episodes'),
  orderBy('created_at', 'desc')
)
// Filter by date client-side
```

**Get Patient Episodes:**
```typescript
query(
  collection(db, 'episodes'),
  where('patient_id', '==', patientId),
  orderBy('created_at', 'desc')
)
```

**Get Doctor Episodes:**
```typescript
query(
  collection(db, 'episodes'),
  where('assigned_doctor_id', '==', doctorId),
  orderBy('created_at', 'desc')
)
```

## Error Handling

### Authentication Errors
- Invalid credentials → Show error message
- Unauthorized access → Redirect to login
- Role mismatch → Redirect to appropriate dashboard

### Firestore Errors
- Permission denied → Check security rules
- Network errors → Show retry option
- Missing data → Show appropriate message

### QR Scanner Errors
- Invalid QR format → Show error, allow rescan
- Camera permission denied → Show instructions
- Patient not found → Show error message

## Performance Optimizations

1. **Indexed Queries**: Firestore indexes for common queries
2. **Client-side Filtering**: Filter today's episodes client-side
3. **Lazy Loading**: Load episode details on demand
4. **Caching**: Firebase SDK caches data automatically

## Future Enhancements

1. **OTP Authentication**: For patient login (phone-based)
2. **Push Notifications**: Notify doctors of new assignments
3. **File Uploads**: Prescription images, lab reports
4. **Analytics Dashboard**: Episode statistics, doctor workload
5. **Billing Integration**: Real billing system
6. **Multi-language Support**: i18n for global use
7. **Mobile App**: React Native version
8. **Offline Mode**: Full offline support with sync



