// QR Code utilities
// QR code stores only patient_id, never medical data

/**
 * Generate QR code data for a patient
 * @param patientId - The patient's unique ID
 * @returns JSON string containing only patient_id
 */
export function generateQRData(patientId: string): string {
  return JSON.stringify({ patient_id: patientId });
}

/**
 * Parse QR code data
 * @param qrData - The scanned QR code data
 * @returns Patient ID if valid, null otherwise
 */
export function parseQRData(qrData: string): string | null {
  try {
    const data = JSON.parse(qrData);
    if (data.patient_id && typeof data.patient_id === 'string') {
      return data.patient_id;
    }
    return null;
  } catch (error) {
    // If parsing fails, try direct string (for backward compatibility)
    if (typeof qrData === 'string' && qrData.length > 0) {
      return qrData;
    }
    return null;
  }
}



