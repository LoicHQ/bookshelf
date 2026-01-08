'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen } from 'lucide-react';
import type { BookSearchResult, UserBook } from '@/types';

interface BookCardProps {
  book: BookSearchResult | (UserBook & { book: BookSearchResult });
  onClick?: () => void;
  showRating?: boolean;
  showStatus?: boolean;
}

const STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  TO_READ: { label: 'À lire', variant: 'outline' },
  READING: { label: 'En cours', variant: 'default' },
  COMPLETED: { label: 'Lu', variant: 'secondary' },
  ABANDONED: { label: 'Abandonné', variant: 'outline' },
  ON_HOLD: { label: 'En pause', variant: 'outline' },
};

export function BookCard({ book, onClick, showRating = true, showStatus = true }: BookCardProps) {
  // Déterminer si c'est un UserBook ou un BookSearchResult
  const isUserBook = 'status' in book;
  const bookData = isUserBook ? (book as UserBook & { book: BookSearchResult }).book : book;
  const userBookData = isUserBook ? (book as UserBook) : null;

  const coverImage = bookData.coverImage || bookData.thumbnail;
  const authors = Array.isArray(bookData.authors) 
    ? bookData.authors.join(', ') 
    : bookData.author || 'Auteur inconnu';

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Cover Image */}
          <div className="relative flex-shrink-0 w-20 h-28 bg-muted rounded overflow-hidden">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={bookData.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="font-semibold text-sm line-clamp-2">{bookData.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{authors}</p>

            {/* Status Badge */}
            {showStatus && userBookData && (
              <Badge variant={STATUS_LABELS[userBookData.status]?.variant || 'outline'}>
                {STATUS_LABELS[userBookData.status]?.label || userBookData.status}
              </Badge>
            )}

            {/* Rating */}
            {showRating && userBookData?.rating && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= userBookData.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Categories */}
            {bookData.categories && bookData.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {bookData.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="outline" className="text-xs px-1.5 py-0">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookCard;
