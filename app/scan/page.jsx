"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import jsQR from 'jsqr';

const QRCodeScanner = ({ onScan, onClose }) => {
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError('Camera access denied or unavailable');
      }
    };

    const scanQR = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        onScan(code.data);
      } else {
        requestAnimationFrame(scanQR);
      }
    };

    startCamera();
    const intervalId = setInterval(scanQR, 500);

    return () => {
      clearInterval(intervalId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col items-center justify-center">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:bg-gray-700 p-2 rounded-full"
      >
        <X size={24} />
      </button>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="relative w-full max-w-md aspect-video">
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover rounded-lg" 
          playsInline 
        />
        <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none"></div>
      </div>

      <canvas 
        ref={canvasRef} 
        className="hidden" 
      />

      <div className="mt-4 text-white flex items-center">
        <Camera className="mr-2" />
        <p>Scan QR Code</p>
      </div>
    </div>
  );
};

export default QRCodeScanner;