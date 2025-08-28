import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Calendar, Search, Plus, Filter, Eye, Edit, Play, Pause, CheckCircle, X, Clock, AlertCircle, User, Settings, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Intervention {
  id: string;
  title: string;
  description: string;
  status: 'ouverte' | 'affectee' | 'en_cours' | 'en_attente' | 'cloturee' | 'annulee' | 'archivee';
  priority: 'low' | 'medium' | 'high';
  urgency: 'low' | 'medium' | 'high';
  type: 'corrective' | 'preventive';
  technician: string;
  equipment: string;
  created_date: string;
  scheduled_date?: string;
  completed_date?: string;
  estimated_cost?: number;
  actual_cost?: number;
}

const mockInterventions: Intervention[] = [
  {
    id: 'INT-001',
    title: 'Maintenance compresseur A1',
    description: 'Révision complète du compresseur principal avec remplacement des filtres',
    status: 'en_cours',
    priority: 'high',
    urgency: 'high',
    type: 'corrective',
    technician: 'Mohammed Alami',
    equipment: 'Compresseur A1',
    created_date: '2025-08-25',
    scheduled_date: '2025-08-28',
    estimated_cost: 2500
  },
  {
    id: 'INT-002',
    title: 'Révision préventive machine B3',
    description: 'Maintenance préventive programmée selon le planning',
    status: 'affectee',
    priority: 'medium',
    urgency: 'low',
    type: 'preventive',
    technician: 'Fatima Bennani',
    equipment: 'Machine B3',
    created_date: '2025-08-26',
    scheduled_date: '2025-08-30',
    estimated_cost: 1200
  },
  {
    id: 'INT-003',
    title: 'Réparation urgente ligne C',
    description: 'Panne sur la ligne de production C nécessitant une intervention immédiate',
    status: 'ouverte',
    priority: 'high',
    urgency: 'high',
    type: 'corrective',
    technician: '',
    equipment: 'Ligne C',
    created_date: '2025-08-28',
    estimated_cost: 3000
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'ouverte': { label: 'Ouverte', className: 'bg-gray-500' },
    'affectee': { label: 'Affectée', className: 'bg-indigo-500' },
    'en_cours': { label: 'En cours', className: 'bg-blue-500' },
    'en_attente': { label: 'En attente', className: 'bg-yellow-500' },
    'cloturee': { label: 'Terminée', className: 'bg-green-500' },
    'annulee': { label: 'Annulée', className: 'bg-red-500' },
    'archivee': { label: 'Archivée', className: 'bg-slate-500' },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || { label: status, className: 'bg-gray-500' };
  return <Badge className={config.className}>{config.label}</Badge>;
};

const getPriorityBadge = (priority: string) => {
  const priorityConfig = {
    'low': { label: 'Faible', className: 'bg-green-100 text-green-800' },
    'medium': { label: 'Moyenne', className: 'bg-yellow-100 text-yellow-800' },
    'high': { label: 'Élevée', className: 'bg-red-100 text-red-800' },
  };
  
  const config = priorityConfig[priority as keyof typeof priorityConfig] || { label: priority, className: 'bg-gray-100 text-gray-800' };
  return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
};

const getStatusActions = (status: string) => {
  const actions = {
    'ouverte': [
      { action: 'assign', label: 'Affecter', icon: User, color: 'indigo' },
    ],
    'affectee': [
      { action: 'start', label: 'Démarrer', icon: Play, color: 'blue' },
      { action: 'cancel', label: 'Annuler', icon: X, color: 'red' },
    ],
    'en_cours': [
      { action: 'pause', label: 'Suspendre', icon: Pause, color: 'yellow' },
      { action: 'complete', label: 'Terminer', icon: CheckCircle, color: 'green' },
    ],
    'en_attente': [
      { action: 'resume', label: 'Reprendre', icon: Play, color: 'blue' },
      { action: 'cancel', label: 'Annuler', icon: X, color: 'red' },
    ],
  };
  
  return actions[status as keyof typeof actions] || [];
};

export function InterventionsPage() {
  const [interventions, setInterventions] = useState<Intervention[]>(mockInterventions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intervention.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || intervention.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || intervention.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  const handleStatusChange = (interventionId: string, newStatus: string) => {
    setInterventions(interventions.map(intervention => 
      intervention.id === interventionId 
        ? { ...intervention, status: newStatus as any }
        : intervention
    ));
    toast.success(`Statut mis à jour vers "${newStatus}"`);
  };

  const InterventionDetails = ({ intervention }: { intervention: Intervention }) => (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Résumé</TabsTrigger>
        <TabsTrigger value="assignment">Affectation</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="summary" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {intervention.title}
              <div className="flex gap-2">
                {getPriorityBadge(intervention.priority)}
                {getStatusBadge(intervention.status)}
              </div>
            </CardTitle>
            <CardDescription>{intervention.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <p className="capitalize">{intervention.type}</p>
              </div>
              <div>
                <Label>Urgence</Label>
                <p className="capitalize">{intervention.urgency}</p>
              </div>
              <div>
                <Label>Date de création</Label>
                <p>{new Date(intervention.created_date).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <Label>Date programmée</Label>
                <p>{intervention.scheduled_date ? new Date(intervention.scheduled_date).toLocaleDateString('fr-FR') : 'Non programmée'}</p>
              </div>
              <div>
                <Label>Coût estimé</Label>
                <p>{intervention.estimated_cost ? `${intervention.estimated_cost} MAD` : 'Non défini'}</p>
              </div>
              <div>
                <Label>Coût réel</Label>
                <p>{intervention.actual_cost ? `${intervention.actual_cost} MAD` : 'En attente'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="assignment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Affectation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Technicien assigné</Label>
              <p>{intervention.technician || 'Non assigné'}</p>
            </div>
            <div>
              <Label>Équipement</Label>
              <p>{intervention.equipment}</p>
            </div>
            <div className="flex gap-2">
              {getStatusActions(intervention.status).map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(intervention.id, action.action)}
                  className="flex items-center gap-2"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Historique des modifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Intervention créée</span>
                  <Badge variant="outline">Admin</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(intervention.created_date).toLocaleString('fr-FR')}
                </p>
              </div>
              
              {intervention.status !== 'ouverte' && (
                <div className="border-l-2 border-indigo-500 pl-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Intervention affectée</span>
                    <Badge variant="outline">{intervention.technician}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Il y a 2 heures
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>
              Documents liés à cette intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>rapport_maintenance_A1.pdf</span>
                </div>
                <Button variant="outline" size="sm">Télécharger</Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucun autre document</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Interventions</h1>
          <p className="text-muted-foreground">
            Gestion des interventions de maintenance
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle intervention
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label>Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="ouverte">Ouverte</SelectItem>
                  <SelectItem value="affectee">Affectée</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="cloturee">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priorité</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="corrective">Corrective</SelectItem>
                  <SelectItem value="preventive">Préventive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setTypeFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interventions List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des interventions</CardTitle>
          <CardDescription>
            {filteredInterventions.length} intervention(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Technicien</TableHead>
                <TableHead>Équipement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterventions.map((intervention) => (
                <TableRow key={intervention.id}>
                  <TableCell className="font-mono">{intervention.id}</TableCell>
                  <TableCell className="font-medium">{intervention.title}</TableCell>
                  <TableCell>{getStatusBadge(intervention.status)}</TableCell>
                  <TableCell>{getPriorityBadge(intervention.priority)}</TableCell>
                  <TableCell className="capitalize">{intervention.type}</TableCell>
                  <TableCell>{intervention.technician || 'Non assigné'}</TableCell>
                  <TableCell>{intervention.equipment}</TableCell>
                  <TableCell>{new Date(intervention.created_date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedIntervention(intervention)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Intervention Details Dialog */}
      <Dialog open={!!selectedIntervention} onOpenChange={() => setSelectedIntervention(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails de l'intervention</DialogTitle>
            <DialogDescription>
              {selectedIntervention?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedIntervention && <InterventionDetails intervention={selectedIntervention} />}
        </DialogContent>
      </Dialog>

      {/* Create Intervention Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle intervention</DialogTitle>
            <DialogDescription>
              Créer une nouvelle intervention de maintenance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Input placeholder="Titre de l'intervention" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Description détaillée" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrective">Corrective</SelectItem>
                    <SelectItem value="preventive">Préventive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priorité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              setShowCreateDialog(false);
              toast.success('Intervention créée avec succès');
            }}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}