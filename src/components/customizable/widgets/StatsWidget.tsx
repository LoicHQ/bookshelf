'use client';

import { BookOpen, BookCheck, Clock, Star } from 'lucide-react';
import type { WidgetConfig } from '@/types';

interface StatsWidgetProps {
  config?: WidgetConfig;
}

// Données de démonstration
const DEMO_STATS = {
  totalBooks: 42,
  booksRead: 28,
  booksReading: 3,
  averageRating: 4.2,
};

export function StatsWidget({ config }: StatsWidgetProps) {
  const showProgress = config?.showProgress ?? true;
  const stats = DEMO_STATS;
  const progressPercent = Math.round((stats.booksRead / stats.totalBooks) * 100);

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BookOpen className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <p className="text-lg font-bold">{stats.totalBooks}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <BookCheck className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-lg font-bold">{stats.booksRead}</p>
            <p className="text-xs text-muted-foreground">Lus</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
          <div>
            <p className="text-lg font-bold">{stats.booksReading}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
          <div>
            <p className="text-lg font-bold">{stats.averageRating}</p>
            <p className="text-xs text-muted-foreground">Note moy.</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsWidget;
