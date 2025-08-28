import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Plus, Search, Edit, Trash2, User, Wrench, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Technician {
  id: string;
  user_id: string;
  name: string;
  email: string;
  team: string;
  specialization: string;
  competencies: string[];
  availability: 'available' | 'busy' | 'unavailable';
  active_interventions: number;
  completed_interventions: number;
  rating: number;
  phone?: string;
  hire_date: string;
}

const mockTechnicians: Technician[] = [
  {
    id: 'TECH-001',
    user_id: '2',
    name: 'Mohammed Alami',
    email: 'mohammed.alami@mif.ma',
    team: 'Équipe A',
    specialization: 'Mécanique industrielle',
    competencies: ['Compresseurs', 'Hydraulique', 'Pneumatique', 'Soudure'],
    availability: 'busy',
    active_interventions: 2,
    completed_interventions: 45,
    rating: 4.8,
    phone: '0661234567',
    hire_date: '2022-03-15'
  },
  {
    id: 'TECH-002',
    user_id: '3',
    name: 'Fatima Bennani',
    email: 'fatima.bennani@mif.ma',
    team: 'Équipe B',
    specialization: 'Électricité industrielle',
    competencies: ['Automatisme', 'Électronique', 'Câblage', 'API'],
    availability: 'available',
    active_interventions: 1,
    completed_interventions: 38,
    rating: 4.9,
    phone: '0662345678',
    hire_date: '2021-09-10'
  },
  {
    id: 'TECH-003',
    user_id: '4',
    name: 'Youssef Khalil',
    email: 'youssef.khalil@mif.ma',
    team: 'Équipe A',
    specialization: 'Maintenance préventive',
    competencies: ['Lubrification', 'Alignement', 'Vibration', 'Thermographie'],
    availability: 'unavailable',
    active_interventions: 0,
    completed_interventions: 28,
    rating: 4.6,
    phone: '0663456789',
    hire_date: '2023-01-20'
  }
];

const getAvailabilityBadge = (availability: string) => {
  const availabilityConfig = {
    'available': { label: 'Disponible', className: 'bg-green-500' },
    'busy': { label: 'Occupé', className: 'bg-yellow-500' },
    'unavailable': { label: 'Indisponible', className: 'bg-red-500' },
  };
  
  const config = availabilityConfig[availability as keyof typeof availabilityConfig] || { label: availability, className: 'bg-gray-500' };
  return <Badge className={config.className}>{config.label}</Badge>;
};

export function TechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredTechnicians = technicians.filter(technician => {
    const matchesSearch = technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technician.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technician.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === 'all' || technician.team === teamFilter;
    const matchesAvailability = availabilityFilter === 'all' || technician.availability === availabilityFilter;
    
    return matchesSearch && matchesTeam && matchesAvailability;
  });

  const TechnicianForm = ({ technician }: { technician?: Technician }) => {
    const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>(
      technician?.competencies || []
    );

    const allCompetencies = [
      'Compresseurs', 'Hydraulique', 'Pneumatique', 'Soudure',
      'Automatisme', 'Électronique', 'Câblage', 'API',
      'Lubrification', 'Alignement', 'Vibration', 'Thermographie',
      'Usinage', 'Mécanique générale', 'Climatisation'
    ];

    return (
      <div className="space-y-4">
        <div>
          <Label>Utilisateur lié</Label>
          <Select defaultValue={technician?.user_id}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un utilisateur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Mohammed Alami</SelectItem>
              <SelectItem value="3">Fatima Bennani</SelectItem>
              <SelectItem value="4">Youssef Khalil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Équipe</Label>
            <Select defaultValue={technician?.team}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Équipe A">Équipe A</SelectItem>
                <SelectItem value="Équipe B">Équipe B</SelectItem>
                <SelectItem value="Équipe C">Équipe C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Spécialisation</Label>
            <Select defaultValue={technician?.specialization}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mécanique industrielle">Mécanique industrielle</SelectItem>
                <SelectItem value="Électricité industrielle">Électricité industrielle</SelectItem>
                <SelectItem value="Maintenance préventive">Maintenance préventive</SelectItem>
                <SelectItem value="Automatisme">Automatisme</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Téléphone</Label>
          <Input placeholder="0661234567" defaultValue={technician?.phone} />
        </div>

        <div>
          <Label>Compétences</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {allCompetencies.map((competency) => (
              <label key={competency} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCompetencies.includes(competency)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCompetencies([...selectedCompetencies, competency]);
                    } else {
                      setSelectedCompetencies(selectedCompetencies.filter(c => c !== competency));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">{competency}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label>Date d'embauche</Label>
          <Input type="date" defaultValue={technician?.hire_date} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des techniciens</h1>
          <p className="text-muted-foreground">
            Gérer les techniciens, leurs compétences et disponibilités
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau technicien
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total techniciens</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicians.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {technicians.filter(t => t.availability === 'available').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interventions actives</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {technicians.reduce((sum, t) => sum + t.active_interventions, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(technicians.reduce((sum, t) => sum + t.rating, 0) / technicians.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom, email, spécialisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label>Équipe</Label>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les équipes</SelectItem>
                  <SelectItem value="Équipe A">Équipe A</SelectItem>
                  <SelectItem value="Équipe B">Équipe B</SelectItem>
                  <SelectItem value="Équipe C">Équipe C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Disponibilité</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="busy">Occupé</SelectItem>
                  <SelectItem value="unavailable">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setTeamFilter('all');
                  setAvailabilityFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technicians List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des techniciens</CardTitle>
          <CardDescription>
            {filteredTechnicians.length} technicien(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technicien</TableHead>
                <TableHead>Équipe</TableHead>
                <TableHead>Spécialisation</TableHead>
                <TableHead>Compétences</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead>Interventions</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnicians.map((technician) => (
                <TableRow key={technician.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {technician.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{technician.name}</div>
                        <div className="text-sm text-muted-foreground">{technician.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{technician.team}</TableCell>
                  <TableCell>{technician.specialization}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {technician.competencies.slice(0, 2).map((comp) => (
                        <Badge key={comp} variant="outline" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                      {technician.competencies.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{technician.competencies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getAvailabilityBadge(technician.availability)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Actives: {technician.active_interventions}</div>
                      <div className="text-muted-foreground">Total: {technician.completed_interventions}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{technician.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTechnician(technician);
                          setShowCreateDialog(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTechnicians(technicians.filter(t => t.id !== technician.id));
                          toast.success('Technicien supprimé');
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTechnician ? 'Modifier le technicien' : 'Nouveau technicien'}
            </DialogTitle>
            <DialogDescription>
              {selectedTechnician ? 'Modifier les informations du technicien' : 'Ajouter un nouveau technicien au système'}
            </DialogDescription>
          </DialogHeader>
          <TechnicianForm technician={selectedTechnician || undefined} />
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCreateDialog(false);
              setSelectedTechnician(null);
            }}>
              Annuler
            </Button>
            <Button onClick={() => {
              setShowCreateDialog(false);
              setSelectedTechnician(null);
              toast.success(selectedTechnician ? 'Technicien modifié avec succès' : 'Technicien créé avec succès');
            }}>
              {selectedTechnician ? 'Sauvegarder' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}