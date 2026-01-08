'use client';

import { useState, useCallback } from 'react';
import { fetchBookByISBN } from '@/lib/books-api';
import type { BookSearchResult } from '@/types';

interface UseScannerOptions {
  onBookFound?: (book: BookSearchResult) => void;
  onError?: (error: string) => void;
}

interface UseScannerReturn {
  isSearching: boolean;
  scannedBook: BookSearchResult | null;
  error: string | null;
  handleScan: (isbn: string) => Promise<void>;
  reset: () => void;
}

export function useScanner(options: UseScannerOptions = {}): UseScannerReturn {
  const [isSearching, setIsSearching] = useState(false);
  const [scannedBook, setScannedBook] = useState<BookSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback(
    async (isbn: string) => {
      setIsSearching(true);
      setError(null);
      setScannedBook(null);

      try {
        const book = await fetchBookByISBN(isbn);

        if (book) {
          setScannedBook(book);
          options.onBookFound?.(book);
        } else {
          const errorMsg = `Aucun livre trouvé pour l'ISBN : ${isbn}`;
          setError(errorMsg);
          options.onError?.(errorMsg);
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : 'Erreur lors de la recherche du livre';
        setError(errorMsg);
        options.onError?.(errorMsg);
      } finally {
        setIsSearching(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setScannedBook(null);
    setError(null);
    setIsSearching(false);
  }, []);

  return {
    isSearching,
    scannedBook,
    error,
    handleScan,
    reset,
  };
}

export default useScanner;
