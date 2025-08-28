# 🧭 Guide de Navigation - Template ERP MIF Maroc

## 🔐 Comptes de Test

Le template inclut 4 comptes de test avec des niveaux d'accès différents :

| Rôle | Nom d'utilisateur | Mot de passe | Accès |
|------|-------------------|--------------|-------|
| 👨‍💼 **Administrateur** | `admin` | `admin` | Accès complet à tous les modules |
| 👨‍🔧 **Responsable** | `responsable` | `responsable` | Gestion maintenance + équipements |
| 🔧 **Technicien** | `technicien` | `technicien` | Interventions + équipements (lecture) |
| 👤 **Client** | `client` | `client` | Tableau de bord uniquement |

## 📋 Modules Disponibles

### 🏠 Tableau de Bord
- **Accès :** Tous les rôles
- **Fonctionnalités :**
  - KPIs des interventions
  - Graphiques de tendances
  - Interventions récentes
  - Actions rapides

### 🔧 Interventions
- **Accès :** Admin, Responsable, Technicien
- **Fonctionnalités :**
  - Liste avec filtres avancés
  - Création/modification d'interventions
  - Gestion des statuts (workflow)
  - Vue détaillée avec onglets
  - Historique des modifications

### 📅 Planification
- **Accès :** Admin, Responsable
- **Fonctionnalités :**
  - Vue calendrier et liste
  - Maintenance préventive
  - Programmation automatique
  - Gestion des fréquences

### ⚙️ Équipements
- **Accès :** Admin, Responsable (écriture), Technicien (lecture)
- **Fonctionnalités :**
  - Inventaire des équipements
  - Statuts et emplacements
  - Historique de maintenance
  - Statistiques

### 👷 Techniciens
- **Accès :** Admin, Responsable
- **Fonctionnalités :**
  - Gestion des profils
  - Compétences et spécialisations
  - Disponibilité
  - Statistiques de performance

### 👥 Utilisateurs
- **Accès :** Admin uniquement
- **Fonctionnalités :**
  - CRUD des comptes utilisateurs
  - Gestion des rôles
  - Activation/désactivation
  - Filtres et recherche

### 📄 Documents
- **Accès :** Admin, Responsable, Technicien
- **Fonctionnalités :**
  - Upload par glisser-déposer
  - Association aux interventions
  - Validation des types de fichiers
  - Téléchargement et visualisation

## 🎯 Tests Recommandés

### 1. Test des Permissions
1. Connectez-vous avec chaque rôle
2. Vérifiez que seuls les modules autorisés sont visibles
3. Testez les restrictions d'édition

### 2. Test du Workflow Interventions
1. Connectez-vous en tant qu'admin
2. Créez une nouvelle intervention
3. Assignez-la à un technicien
4. Changez les statuts : Ouverte → Affectée → En cours → Terminée

### 3. Test de la Planification
1. Connectez-vous en tant que responsable
2. Créez un planning de maintenance préventive
3. Visualisez dans le calendrier
4. Modifiez les fréquences

### 4. Test des Documents
1. Testez l'upload de fichiers (PDF, images)
2. Associez des documents aux interventions
3. Vérifiez les restrictions de taille et type

## 🎨 Fonctionnalités UI

### Mode Sombre
- Bouton de basculement dans le header
- Sauvegarde de la préférence

### Notifications
- Compteur dans le header
- Dropdown avec historique
- Notifications contextuelles (toast)

### Responsive Design
- Interface adaptée mobile/tablette/desktop
- Sidebar collapsible
- Grilles adaptatives

## 🧪 Données de Test

Le template inclut des données mock réalistes pour :
- ✅ 15+ interventions avec différents statuts
- ✅ 10+ équipements avec historique
- ✅ 5+ techniciens avec compétences
- ✅ Plusieurs utilisateurs par rôle
- ✅ Documents d'exemple
- ✅ Planning de maintenance

## 🎁 Bonus Features

- **Filtres avancés** sur toutes les listes
- **Recherche globale** dans les modules
- **Graphiques interactifs** avec Recharts
- **Calendrier intégré** pour la planification
- **Glisser-déposer** pour les documents
- **Validation des formulaires** en temps réel
- **Loading states** et animations
- **Toast notifications** pour le feedback

## 🚀 Prêt pour Production

Ce template est conçu pour être facilement étendu avec :
- API REST backend
- Base de données PostgreSQL
- Authentification JWT
- Upload de fichiers réel
- Notifications en temps réel
- Rapports et exports

---

**💡 Astuce :** Utilisez les boutons de connexion rapide sur la page de login pour switcher rapidement entre les rôles et tester les différentes permissions !