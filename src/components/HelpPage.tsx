import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  User, 
  Shield, 
  Wrench, 
  Calendar, 
  Settings, 
  FileText, 
  Users,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

export function HelpPage() {
  const accounts = [
    {
      role: 'Administrateur',
      username: 'admin',
      password: 'admin',
      icon: Shield,
      color: 'bg-purple-500',
      description: 'Accès complet à tous les modules'
    },
    {
      role: 'Responsable',
      username: 'responsable',
      password: 'responsable',
      icon: User,
      color: 'bg-blue-500',
      description: 'Gestion maintenance et équipements'
    },
    {
      role: 'Technicien',
      username: 'technicien',
      password: 'technicien',
      icon: Wrench,
      color: 'bg-green-500',
      description: 'Interventions et consultation équipements'
    },
    {
      role: 'Client',
      username: 'client',
      password: 'client',
      icon: User,
      color: 'bg-orange-500',
      description: 'Tableau de bord uniquement'
    }
  ];

  const modules = [
    {
      name: 'Tableau de Bord',
      icon: HelpCircle,
      access: ['admin', 'responsible', 'technician', 'client'],
      features: ['KPIs temps réel', 'Graphiques', 'Actions rapides']
    },
    {
      name: 'Interventions',
      icon: Wrench,
      access: ['admin', 'responsible', 'technician'],
      features: ['CRUD complet', 'Workflow statuts', 'Filtres avancés']
    },
    {
      name: 'Planification',
      icon: Calendar,
      access: ['admin', 'responsible'],
      features: ['Vue calendrier', 'Maintenance préventive', 'Automatisation']
    },
    {
      name: 'Équipements',
      icon: Settings,
      access: ['admin', 'responsible', 'technician'],
      features: ['Inventaire', 'Historique', 'Statuts temps réel']
    },
    {
      name: 'Techniciens',
      icon: User,
      access: ['admin', 'responsible'],
      features: ['Profils', 'Compétences', 'Disponibilité']
    },
    {
      name: 'Utilisateurs',
      icon: Users,
      access: ['admin'],
      features: ['Gestion comptes', 'Rôles', 'Permissions']
    },
    {
      name: 'Documents',
      icon: FileText,
      access: ['admin', 'responsible', 'technician'],
      features: ['Upload/Download', 'Association interventions', 'Validation']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1>🆘 Centre d'Aide</h1>
        <p className="text-muted-foreground">
          Guide complet pour naviguer dans le template ERP MIF Maroc
        </p>
      </div>

      {/* Alert Info */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Template de Démonstration</h4>
              <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                Ce template utilise des données fictives pour la démonstration. 
                Toutes les fonctionnalités sont simulées et aucune donnée n'est persistée.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comptes de Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Comptes de Test Disponibles
          </CardTitle>
          <CardDescription>
            Utilisez ces comptes pour tester les différents niveaux d'accès
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <div key={account.username} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${account.color}`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{account.role}</h4>
                    <p className="text-sm text-muted-foreground">{account.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">👤 {account.username}</Badge>
                  <Badge variant="outline">🔑 {account.password}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modules et Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Modules et Permissions
          </CardTitle>
          <CardDescription>
            Aperçu des modules disponibles selon les rôles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.name} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <module.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {module.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {['admin', 'responsible', 'technician', 'client'].map((role) => (
                      <div
                        key={role}
                        className={`w-3 h-3 rounded-full ${
                          module.access.includes(role)
                            ? 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        title={`${role}: ${module.access.includes(role) ? 'Accès' : 'Pas d\'accès'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Accès :</strong> {module.access.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités Clés */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Fonctionnalités Incluses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Authentification multi-rôles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Interface responsive (mobile/desktop)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Mode sombre/clair
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Filtres et recherche avancés
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Graphiques interactifs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Workflow de validation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Upload de fichiers par glisser-déposer
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Notifications temps réel
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Instructions de Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
                <span>Testez chaque compte pour voir les différences de permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
                <span>Créez une intervention et suivez son workflow complet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                <span>Testez l'upload de documents (PDF, images)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">4</span>
                <span>Explorez la planification en vue calendrier et liste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">5</span>
                <span>Utilisez les filtres pour rechercher des données spécifiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">6</span>
                <span>Testez le mode sombre et la responsivité mobile</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Informations Techniques */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Informations Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium mb-2">Technologies</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• Shadcn/ui Components</li>
                <li>• Recharts pour les graphiques</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Structure</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Architecture modulaire</li>
                <li>• Composants réutilisables</li>
                <li>• Context API pour l'état</li>
                <li>• Local Storage pour la persistance</li>
                <li>• Mock data réaliste</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Prêt pour</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Integration API REST</li>
                <li>• Base de données PostgreSQL</li>
                <li>• Authentification JWT</li>
                <li>• Upload de fichiers réel</li>
                <li>• Notifications WebSocket</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}