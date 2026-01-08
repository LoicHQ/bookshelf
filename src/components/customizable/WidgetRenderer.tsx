'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical, BookOpen, BarChart3, Target, Users, Sparkles, Heart } from 'lucide-react';
import type { Widget, WidgetType } from '@/types';

// Import des widgets spécifiques
import { RecentBooksWidget } from './widgets/RecentBooksWidget';
import { StatsWidget } from './widgets/StatsWidget';
import { GoalsWidget } from './widgets/GoalsWidget';

interface WidgetRendererProps {
  widget: Widget;
  dragHandleProps?: Record<string, unknown>;
  isDragging?: boolean;
}

const WIDGET_ICONS: Record<WidgetType, React.ReactNode> = {
  recent_books: <BookOpen className="h-4 w-4" />,
  reading_stats: <BarChart3 className="h-4 w-4" />,
  reading_goals: <Target className="h-4 w-4" />,
  friends_activity: <Users className="h-4 w-4" />,
  book_recommendations: <Sparkles className="h-4 w-4" />,
  favorite_books: <Heart className="h-4 w-4" />,
};

const WIDGET_TITLES: Record<WidgetType, string> = {
  recent_books: 'Livres récents',
  reading_stats: 'Statistiques',
  reading_goals: 'Objectifs de lecture',
  friends_activity: 'Activité des amis',
  book_recommendations: 'Recommandations',
  favorite_books: 'Mes favoris',
};

export function WidgetRenderer({ widget, dragHandleProps, isDragging }: WidgetRendererProps) {
  const renderWidgetContent = () => {
    switch (widget.widgetType) {
      case 'recent_books':
        return <RecentBooksWidget config={widget.config} />;
      case 'reading_stats':
        return <StatsWidget config={widget.config} />;
      case 'reading_goals':
        return <GoalsWidget config={widget.config} />;
      case 'friends_activity':
        return (
          <div className="text-center text-muted-foreground py-4">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Fonctionnalité à venir</p>
          </div>
        );
      case 'book_recommendations':
        return (
          <div className="text-center text-muted-foreground py-4">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Recommandations personnalisées</p>
          </div>
        );
      case 'favorite_books':
        return (
          <div className="text-center text-muted-foreground py-4">
            <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Vos livres favoris</p>
          </div>
        );
      default:
        return <p className="text-muted-foreground">Widget inconnu</p>;
    }
  };

  return (
    <Card
      className={`h-full transition-shadow ${
        isDragging ? 'shadow-xl ring-2 ring-primary' : 'hover:shadow-md'
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {WIDGET_ICONS[widget.widgetType as WidgetType]}
            {widget.config?.title || WIDGET_TITLES[widget.widgetType as WidgetType]}
          </CardTitle>
          {dragHandleProps && (
            <button
              className="p-1 rounded hover:bg-muted cursor-grab active:cursor-grabbing touch-none"
              {...dragHandleProps}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  );
}

export default WidgetRenderer;
