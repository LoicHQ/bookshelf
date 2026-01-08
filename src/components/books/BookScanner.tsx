'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff, Loader2, BookOpen } from 'lucide-react';

interface BookScannerProps {
  onScan: (isbn: string) => void;
  onError?: (error: string) => void;
}

export function BookScanner({ onScan, onError }: BookScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isValidISBN = (code: string): boolean => {
    // ISBN-10: 10 chiffres (le dernier peut être X)
    // ISBN-13: 13 chiffres commençant par 978 ou 979
    const cleanCode = code.replace(/[-\s]/g, '');
    
    if (/^97[89]\d{10}$/.test(cleanCode)) {
      return true; // ISBN-13
    }
    if (/^\d{9}[\dX]$/.test(cleanCode)) {
      return true; // ISBN-10
    }
    return false;
  };

  const handleScanSuccess = useCallback(
    (decodedText: string) => {
      const cleanCode = decodedText.replace(/[-\s]/g, '');
      
      // Éviter les scans en double
      if (cleanCode === lastScanned) {
        return;
      }

      if (isValidISBN(cleanCode)) {
        setLastScanned(cleanCode);
        setError(null);
        onScan(cleanCode);
      }
    },
    [lastScanned, onScan]
  );

  const startScanner = async () => {
    if (!containerRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const scanner = new Html5Qrcode('book-scanner');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.5,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        handleScanSuccess,
        () => {} // Ignorer les erreurs de scan (normal pendant la recherche)
      );

      setIsScanning(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Impossible d'accéder à la caméra";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
    setLastScanned(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Scanner un livre
        </CardTitle>
        <CardDescription>
          Scannez le code-barres ISBN au dos du livre pour l&apos;ajouter à votre bibliothèque
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scanner viewport */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[3/2] bg-muted rounded-lg overflow-hidden"
        >
          <div id="book-scanner" className="w-full h-full" />

          {!isScanning && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Appuyez sur le bouton pour scanner</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Last scanned ISBN */}
        {lastScanned && (
          <div className="p-3 bg-green-500/10 text-green-700 dark:text-green-400 rounded-lg text-sm">
            ISBN détecté : <span className="font-mono font-bold">{lastScanned}</span>
          </div>
        )}

        {/* Controls */}
        <Button
          onClick={isScanning ? stopScanner : startScanner}
          disabled={isLoading}
          className="w-full"
          variant={isScanning ? 'destructive' : 'default'}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : isScanning ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" />
              Arrêter le scan
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Démarrer le scan
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default BookScanner;
