// Component to display patient QR code
import { QRCodeSVG } from 'qrcode.react';
import { generateQRData } from '@/lib/qr';

interface QRCodeDisplayProps {
  patientId: string;
  size?: number;
}

export default function QRCodeDisplay({ patientId, size = 256 }: QRCodeDisplayProps) {
  const qrData = generateQRData(patientId);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Patient QR Code</h3>
      <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
        <QRCodeSVG value={qrData} size={size} level="H" />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        This QR code contains only your patient ID
      </p>
      <p className="mt-2 text-xs text-gray-500 font-mono">{patientId}</p>
    </div>
  );
}



