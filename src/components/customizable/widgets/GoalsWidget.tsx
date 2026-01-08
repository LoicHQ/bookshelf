'use client';

import { Target, TrendingUp } from 'lucide-react';
import type { WidgetConfig } from '@/types';

interface GoalsWidgetProps {
  config?: WidgetConfig;
}

// Données de démonstration
const DEMO_GOALS = {
  yearlyGoal: 24,
  booksReadThisYear: 18,
  monthlyGoal: 2,
  booksReadThisMonth: 1,
};

export function GoalsWidget({ config }: GoalsWidgetProps) {
  const goals = DEMO_GOALS;
  const yearlyProgress = Math.round((goals.booksReadThisYear / goals.yearlyGoal) * 100);
  const monthlyProgress = Math.round((goals.booksReadThisMonth / goals.monthlyGoal) * 100);

  return (
    <div className="space-y-4">
      {/* Yearly Goal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Objectif annuel</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {goals.booksReadThisYear} / {goals.yearlyGoal}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(yearlyProgress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {yearlyProgress >= 100
            ? '🎉 Objectif atteint !'
            : `${goals.yearlyGoal - goals.booksReadThisYear} livres restants`}
        </p>
      </div>

      {/* Monthly Goal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Ce mois-ci</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {goals.booksReadThisMonth} / {goals.monthlyGoal}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default GoalsWidget;
