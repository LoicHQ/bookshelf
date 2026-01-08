export type WidgetType =
  | 'recent_books'
  | 'reading_stats'
  | 'reading_goals'
  | 'friends_activity'
  | 'book_recommendations'
  | 'favorite_books';

export interface Widget {
  id: string;
  userId: string;
  widgetType: WidgetType;
  position: number;
  column: number;
  config?: WidgetConfig;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WidgetConfig {
  title?: string;
  limit?: number;
  showRating?: boolean;
  showProgress?: boolean;
  theme?: 'default' | 'compact' | 'detailed';
  [key: string]: unknown;
}

export interface WidgetDefinition {
  type: WidgetType;
  name: string;
  description: string;
  icon: string;
  defaultConfig: WidgetConfig;
  minWidth?: number;
  minHeight?: number;
}

export const WIDGET_DEFINITIONS: Record<WidgetType, WidgetDefinition> = {
  recent_books: {
    type: 'recent_books',
    name: 'Livres récents',
    description: 'Affiche vos derniers livres ajoutés',
    icon: 'BookOpen',
    defaultConfig: { limit: 5, showRating: true },
  },
  reading_stats: {
    type: 'reading_stats',
    name: 'Statistiques',
    description: 'Vos statistiques de lecture',
    icon: 'BarChart3',
    defaultConfig: { showProgress: true },
  },
  reading_goals: {
    type: 'reading_goals',
    name: 'Objectifs',
    description: 'Suivez vos objectifs de lecture',
    icon: 'Target',
    defaultConfig: {},
  },
  friends_activity: {
    type: 'friends_activity',
    name: 'Activité des amis',
    description: "Voyez ce que lisent vos amis",
    icon: 'Users',
    defaultConfig: { limit: 10 },
  },
  book_recommendations: {
    type: 'book_recommendations',
    name: 'Recommandations',
    description: 'Livres recommandés pour vous',
    icon: 'Sparkles',
    defaultConfig: { limit: 6 },
  },
  favorite_books: {
    type: 'favorite_books',
    name: 'Favoris',
    description: 'Vos livres favoris',
    icon: 'Heart',
    defaultConfig: { limit: 8 },
  },
};
