# 🏭 ERP MIF Maroc - Template Frontend

## 📋 Description

Template complet d'un système ERP de gestion de maintenance industrielle pour MIF Maroc. Interface moderne et responsive construite avec React, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

### 🔐 Authentification Multi-Rôles
- **Administrateur** : Accès complet
- **Responsable** : Gestion maintenance et équipements  
- **Technicien** : Interventions et consultation
- **Client** : Tableau de bord uniquement

### 📊 Modules Principaux
- **📈 Tableau de Bord** : KPIs, graphiques, actions rapides
- **🔧 Interventions** : CRUD complet avec workflow de statuts
- **📅 Planification** : Maintenance préventive avec calendrier
- **⚙️ Équipements** : Inventaire et historique de maintenance
- **👷 Techniciens** : Gestion des profils et compétences
- **👥 Utilisateurs** : Administration des comptes (Admin uniquement)
- **📄 Documents** : Upload/download avec association aux interventions

### 🎨 Interface Utilisateur
- ✅ Design responsive (mobile/desktop)
- ✅ Mode sombre/clair
- ✅ Filtres et recherche avancés
- ✅ Graphiques interactifs
- ✅ Notifications temps réel
- ✅ Upload par glisser-déposer
- ✅ Navigation intuitive

## 🚀 Démarrage Rapide

### Comptes de Test

| Rôle | Username | Password |
|------|----------|----------|
| 👨‍💼 Admin | `admin` | `admin` |
| 👨‍🔧 Responsable | `responsable` | `responsable` |
| 🔧 Technicien | `technicien` | `technicien` |
| 👤 Client | `client` | `client` |

### Navigation Recommandée

1. **Commencez par le compte Admin** pour voir toutes les fonctionnalités
2. **Créez une intervention** et suivez son workflow
3. **Testez la planification** en vue calendrier
4. **Uploadez des documents** avec le glisser-déposer
5. **Changez de rôle** pour voir les différences de permissions

## 🛠️ Technologies

- **Frontend** : React 18, TypeScript
- **Styling** : Tailwind CSS v4
- **Components** : Shadcn/ui
- **Icons** : Lucide React
- **Charts** : Recharts
- **State** : React Context + useState
- **Storage** : Local Storage

## 📁 Structure du Projet

```
├── App.tsx                 # Application principale
├── components/
│   ├── ui/                # Composants UI (Shadcn)
│   ├── AuthPage.tsx       # Page de connexion
│   ├── DashboardPage.tsx  # Tableau de bord
│   ├── InterventionsPage.tsx # Gestion interventions
│   ├── PlanningPage.tsx   # Planification
│   ├── EquipmentPage.tsx  # Gestion équipements
│   ├── TechniciansPage.tsx # Gestion techniciens
│   ├── UsersPage.tsx      # Administration utilisateurs
│   ├── DocumentsPage.tsx  # Gestion documents
│   ├── ProfilePage.tsx    # Profil utilisateur
│   └── HelpPage.tsx       # Page d'aide
└── styles/
    └── globals.css        # Styles globaux Tailwind
```

## 🎯 Données de Test

Le template inclut des données réalistes :
- 🔧 15+ interventions avec différents statuts
- ⚙️ 10+ équipements avec historique
- 👷 5+ techniciens avec compétences
- 👥 4 types d'utilisateurs
- 📄 Plusieurs documents d'exemple
- 📅 Planning de maintenance préventive

## 🔄 Workflow Interventions

```
Ouverte → Affectée → En Cours → [En Attente] → Terminée
                              ↘ Annulée
                              ↘ Archivée
```

## 🎨 Design System

### Couleurs Principales
- **Primary** : Indigo (#4F46E5)
- **Secondary** : Blue (#2563EB)  
- **Success** : Green (#10B981)
- **Warning** : Yellow (#F59E0B)
- **Danger** : Red (#EF4444)
- **Neutral** : Gray (#6B7280)

### Typographie
- **Font** : Inter (sans-serif)
- **Base Size** : 14px
- **Headings** : 16px - 24px
- **Line Height** : 1.5

## 🚀 Production Ready

Ce template est conçu pour être facilement étendu avec :

### Backend Integration
- API REST (FastAPI recommandé)
- Base de données PostgreSQL
- Authentification JWT
- Upload de fichiers S3/MinIO

### Fonctionnalités Avancées
- Notifications WebSocket temps réel
- Export PDF/Excel des rapports
- Système d'alertes automatiques
- Audit trail des modifications

### DevOps
- Docker containerization
- CI/CD avec GitHub Actions
- Monitoring avec Prometheus/Grafana
- Backup automatisé

## 🔒 Sécurité

- ✅ Validation côté client
- ✅ Gestion des permissions par rôle
- ✅ Sanitisation des entrées
- ✅ Protection XSS
- 🔄 Validation côté serveur (à implémenter)
- 🔄 Rate limiting (à implémenter)
- 🔄 Chiffrement des données sensibles (à implémenter)

## 📱 Responsive Design

- **Mobile** : 320px+
- **Tablet** : 768px+
- **Desktop** : 1024px+
- **Large** : 1440px+

## 🧪 Tests

### Manuel Testing
1. Testez tous les rôles utilisateur
2. Vérifiez les permissions
3. Testez le workflow complet des interventions
4. Validez l'upload de documents
5. Vérifiez la responsivité mobile

### Tests Automatisés (à implémenter)
- Unit tests avec Vitest
- Integration tests avec Testing Library
- E2E tests avec Playwright

## 🎁 Bonus Features

- **Recherche globale** dans tous les modules
- **Filtres persistants** sauvegardés par utilisateur
- **Thème personnalisable** avec variables CSS
- **Raccourcis clavier** pour les actions fréquentes
- **Mode hors ligne** avec synchronisation
- **PWA support** pour installation mobile

## 📞 Support

Pour toute question ou demande d'amélioration :
- 📧 Contact : support@mif.ma
- 📚 Documentation : Consultez la page Aide dans l'application
- 🐛 Issues : Utilisez le système de tickets interne

## 📄 Licence

© 2025 MIF Maroc. Tous droits réservés.
Template développé pour usage interne et démonstration.

---

**🎯 Prêt à être utilisé !** Connectez-vous avec n'importe quel compte de test et explorez toutes les fonctionnalités.