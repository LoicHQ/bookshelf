# BookShelf 📚

Votre bibliothèque personnelle - Gérez, notez et partagez vos lectures.

## Fonctionnalités

- **Gestion de bibliothèque** - Ajoutez, organisez et notez vos livres
- **Scanner de livres** - Scannez les codes-barres ISBN pour ajouter rapidement des livres
- **Interface personnalisable** - Widgets drag & drop pour personnaliser votre espace
- **Chat communautaire** - Discutez avec d'autres lecteurs

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Base de données**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **UI**: Tailwind CSS + shadcn/ui
- **Tests**: Vitest + Testing Library

## Prérequis

- Node.js 20+
- npm ou yarn
- Compte Supabase (pour la base de données)

## Installation

1. **Cloner le repository**

```bash
git clone https://github.com/LoicHQ/bookshelf.git
cd bookshelf
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

```bash
cp .env.example .env.local
```

Remplissez les valeurs dans `.env.local` :
- Créez un projet sur [Supabase](https://supabase.com)
- Récupérez les credentials de la base de données
- Générez un secret NextAuth : `openssl rand -base64 32`

4. **Initialiser la base de données**

```bash
npm run db:push
```

5. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Démarrer en production |
| `npm run lint` | Linter ESLint |
| `npm run type-check` | Vérification des types TypeScript |
| `npm run format` | Formater avec Prettier |
| `npm run test` | Lancer les tests |
| `npm run db:studio` | Ouvrir Prisma Studio |

## Structure du projet

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── (auth)/             # Pages d'authentification
│   ├── (main)/             # Pages principales
│   └── api/                # Routes API
├── components/             # Composants React
│   ├── ui/                 # Composants shadcn/ui
│   ├── books/              # Composants livres
│   ├── chat/               # Composants chat
│   └── customizable/       # Widgets personnalisables
├── lib/                    # Utilitaires et configurations
├── hooks/                  # Custom React hooks
├── types/                  # Types TypeScript
└── services/               # Services et API
```

## Déploiement

### Vercel (recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez !

### PWA sur iOS

L'application est configurée comme Progressive Web App :
1. Ouvrez l'app sur Safari iOS
2. Appuyez sur "Partager" → "Sur l'écran d'accueil"

## Licence

MIT
