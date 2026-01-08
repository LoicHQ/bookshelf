export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  totalBooks: number;
  booksRead: number;
  booksReading: number;
  booksToRead: number;
  totalPages: number;
  averageRating: number;
  favoriteGenres: string[];
}
