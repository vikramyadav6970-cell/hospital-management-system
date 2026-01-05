// QR Code Scanner component for Admin
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { parseQRData } from '@/lib/qr';
import toast from 'react-hot-toast';

interface QRScannerProps {
  onScanSuccess: (patientId: string) => void;
  onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startScanning = () => {
    if (!scannerElementRef.current) return;

    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        const patientId = parseQRData(decodedText);
        if (patientId) {
          scanner.clear();
          setIsScanning(false);
          onScanSuccess(patientId);
          toast.success('QR Code scanned successfully!');
        } else {
          toast.error('Invalid QR code format');
          if (onScanError) {
            onScanError('Invalid QR code format');
          }
        }
      },
      (errorMessage) => {
        // Ignore scanning errors (they're frequent during scanning)
      }
    );

    scannerRef.current = scanner;
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Scan Patient QR Code</h3>
        
        <div id="qr-reader" ref={scannerElementRef} className="mb-4"></div>
        
        <div className="flex gap-2">
          {!isScanning ? (
            <button
              onClick={startScanning}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Start Scanner
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
            >
              Stop Scanner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

