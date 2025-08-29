# ERP MIF Maroc - Frontend Application

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Une application frontend moderne et complète pour le système ERP (Enterprise Resource Planning) de MIF Maroc, développée avec les technologies les plus récentes pour une expérience utilisateur optimale.

## 🚀 Fonctionnalités

### Gestion des Utilisateurs
- **Authentification multi-rôles** : Admin, Responsable, Technicien, Client
- **Gestion des profils** : Création, modification et suppression des utilisateurs
- **Contrôle d'accès** basé sur les rôles

### Modules Principaux
- **📊 Dashboard** : Vue d'ensemble des métriques et statistiques
- **👥 Gestion des Utilisateurs** : Administration complète des comptes utilisateur
- **🔧 Interventions** : Suivi et gestion des interventions techniques
- **📅 Planning** : Organisation et planification des tâches
- **⚙️ Équipement** : Gestion du parc matériel et équipements
- **👷 Techniciens** : Gestion des ressources techniques
- **📄 Documents** : Archivage et gestion documentaire
- **👤 Profil** : Gestion du profil utilisateur
- **❓ Aide** : Centre d'aide et documentation

### Fonctionnalités Techniques
- **Authentification flexible** : Backend first avec fallback vers démo
- **Interface responsive** : Optimisée pour desktop et mobile
- **Thème sombre/clair** : Support des thèmes dynamiques
- **Notifications temps réel** : Système de notifications intégré
- **Composants UI modernes** : Bibliothèque shadcn/ui avec Radix UI

## 🛠️ Stack Technologique

### Frontend
- **Framework** : React 18.3.1 avec TypeScript
- **Build Tool** : Vite 6.3.5
- **Styling** : Tailwind CSS avec shadcn/ui
- **UI Components** : Radix UI primitives
- **Icons** : Lucide React
- **Forms** : React Hook Form
- **Charts** : Recharts
- **Themes** : next-themes

### Développement
- **Language** : TypeScript
- **Package Manager** : npm
- **Plugin React** : SWC pour des builds ultra-rapides

## 📋 Prérequis

- **Node.js** : Version 18.0.0 ou supérieure
- **npm** : Version 8.0.0 ou supérieure
- **Backend API** : Serveur ERP MIF Maroc (optionnel pour le mode démo)

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Rochdi112/VITE-FRONTEND-ERP-MIF-MAROC.git
   cd VITE-FRONTEND-ERP-MIF-MAROC
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   ```bash
   # Copier le fichier d'exemple d'environnement
   cp .env.example .env
   ```

4. **Modifier la configuration** (dans `.env`)
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

## ⚙️ Configuration

### Variables d'Environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `VITE_API_BASE_URL` | URL de base de l'API backend | `http://localhost:8000` |

### Comptes de Démo

Si le backend n'est pas disponible, l'application bascule automatiquement en mode démo avec ces comptes :

| Rôle | Utilisateur | Mot de passe |
|------|-------------|--------------|
| Administrateur | `admin` | `admin` |
| Responsable | `responsable` | `responsable` |
| Technicien | `technicien` | `technicien` |
| Client | `client` | `client` |

## 📜 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire l'application pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 🏗️ Structure du Projet

```
src/
├── components/           # Composants React
│   ├── AuthPage.tsx     # Page d'authentification
│   ├── DashboardPage.tsx# Dashboard principal
│   ├── UsersPage.tsx    # Gestion des utilisateurs
│   ├── InterventionsPage.tsx
│   ├── PlanningPage.tsx
│   ├── EquipmentPage.tsx
│   ├── TechniciansPage.tsx
│   ├── DocumentsPage.tsx
│   ├── ProfilePage.tsx
│   ├── HelpPage.tsx
│   └── ui/              # Composants UI réutilisables
├── lib/
│   ├── api.ts          # Configuration API
│   └── utils.ts        # Utilitaires
├── config/
│   └── config.ts       # Configuration application
├── styles/
│   └── globals.css     # Styles globaux
└── main.tsx            # Point d'entrée
```

## 🎨 Personnalisation UI

L'application utilise **shadcn/ui** qui fournit :

- Composants accessibles et modernes
- Thème cohérent avec Tailwind CSS
- Support du mode sombre/clair
- Composants hautement personnalisables

## 🔌 API Integration

### Endpoints Utilisés
- `POST /api/v1/auth/login` - Authentification
- `GET /api/v1/auth/me` - Informations utilisateur
- `GET /api/v1/users` - Liste des utilisateurs
- `GET /api/v1/interventions` - Interventions
- `GET /api/v1/equipment` - Équipement
- `GET /api/v1/documents` - Documents

### Gestion des Erreurs
- Fallback automatique vers le mode démo
- Messages d'erreur utilisateur-friendly
- Logging des erreurs en développement

## 🌐 Déploiement

### Build de Production
```bash
npm run build
```

Les fichiers de build seront générés dans le dossier `dist/`.

### Serveurs Recommandés
- **Vercel** : Déploiement automatique depuis Git
- **Netlify** : Support SPA avec configuration simple
- **nginx/Apache** : Serveur traditionnel avec SPA fallback

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- Utiliser TypeScript strict
- Suivre les conventions ESLint
- Écrire des tests pour les nouvelles fonctionnalités
- Maintenir la documentation à jour

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation dans le dossier `guidelines/`

## 🔗 Liens Utiles

- [Design Figma Original](https://www.figma.com/design/1mmDvhVNNGLSbQFFLCvb59/ERP-MIF-Maroc-Complete-UI-Application)
- [Documentation React](https://reactjs.org/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation shadcn/ui](https://ui.shadcn.com/)

---

**Développé avec ❤️ pour MIF Maroc**
  
