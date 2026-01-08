import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Scan, LayoutDashboard, MessageCircle, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue sur <span className="text-primary">BookShelf</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Votre bibliothèque personnelle numérique. Gérez, notez et partagez vos lectures avec une
          communauté de passionnés.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/login">
              Commencer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/discover">Découvrir</Link>
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Tout ce dont vous avez besoin pour gérer vos lectures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-2">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Bibliothèque complète</CardTitle>
              <CardDescription>
                Organisez tous vos livres en un seul endroit. Filtrez par statut, genre ou note.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-2">
                <Scan className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-lg">Scanner ISBN</CardTitle>
              <CardDescription>
                Ajoutez des livres en un instant en scannant le code-barres avec votre caméra.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-2">
                <LayoutDashboard className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-lg">Interface personnalisable</CardTitle>
              <CardDescription>
                Arrangez votre tableau de bord avec des widgets drag & drop selon vos préférences.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="p-3 bg-orange-500/10 rounded-lg w-fit mb-2">
                <MessageCircle className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-lg">Communauté</CardTitle>
              <CardDescription>
                Discutez avec d&apos;autres lecteurs, partagez vos avis et découvrez de nouveaux livres.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">∞</p>
                <p className="text-primary-foreground/80">Livres à découvrir</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">
                  <Star className="inline h-8 w-8" />
                </p>
                <p className="text-primary-foreground/80">Notes détaillées</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">📱</p>
                <p className="text-primary-foreground/80">PWA pour iOS</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">💬</p>
                <p className="text-primary-foreground/80">Chat en temps réel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} BookShelf. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
