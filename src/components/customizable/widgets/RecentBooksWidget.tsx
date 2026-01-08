'use client';

import { BookOpen } from 'lucide-react';
import type { WidgetConfig } from '@/types';

interface RecentBooksWidgetProps {
  config?: WidgetConfig;
}

// Données de démonstration (à remplacer par des données réelles)
const DEMO_BOOKS = [
  { id: '1', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
  { id: '2', title: '1984', author: 'George Orwell' },
  { id: '3', title: 'Dune', author: 'Frank Herbert' },
];

export function RecentBooksWidget({ config }: RecentBooksWidgetProps) {
  const limit = config?.limit || 5;
  const books = DEMO_BOOKS.slice(0, limit);

  if (books.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Aucun livre récent</p>
        <p className="text-xs mt-1">Ajoutez votre premier livre !</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
        >
          <div className="w-8 h-10 bg-muted rounded flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{book.title}</p>
            <p className="text-xs text-muted-foreground truncate">{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentBooksWidget;
