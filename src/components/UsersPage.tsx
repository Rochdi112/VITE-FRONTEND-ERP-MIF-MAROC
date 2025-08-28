import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar';
import { Plus, Search, Edit, Trash2, User, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../App';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'responsible' | 'technician' | 'client';
  active: boolean;
  created_date: string;
  last_login?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mif.ma',
    name: 'Administrateur',
    role: 'admin',
    active: true,
    created_date: '2025-01-01',
    last_login: '2025-08-28T10:30:00Z'
  },
  {
    id: '2',
    username: 'malami',
    email: 'mohammed.alami@mif.ma',
    name: 'Mohammed Alami',
    role: 'technician',
    active: true,
    created_date: '2025-02-15',
    last_login: '2025-08-27T14:20:00Z'
  },
  {
    id: '3',
    username: 'fbennani',
    email: 'fatima.bennani@mif.ma',
    name: 'Fatima Bennani',
    role: 'responsible',
    active: true,
    created_date: '2025-03-10',
    last_login: '2025-08-28T09:15:00Z'
  },
  {
    id: '4',
    username: 'ykhalil',
    email: 'youssef.khalil@mif.ma',
    name: 'Youssef Khalil',
    role: 'technician',
    active: false,
    created_date: '2025-04-20',
    last_login: '2025-08-20T16:45:00Z'
  }
];

const getRoleBadge = (role: string) => {
  const roleConfig = {
    'admin': { label: 'Administrateur', className: 'bg-purple-500' },
    'responsible': { label: 'Responsable', className: 'bg-blue-500' },
    'technician': { label: 'Technicien', className: 'bg-green-500' },
    'client': { label: 'Client', className: 'bg-orange-500' },
  };
  
  const config = roleConfig[role as keyof typeof roleConfig] || { label: role, className: 'bg-gray-500' };
  return <Badge className={config.className}>{config.label}</Badge>;
};

export function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Check if current user is admin
  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="text-center p-6">
          <CardHeader>
            <CardTitle>Accès restreint</CardTitle>
            <CardDescription>
              Seuls les administrateurs peuvent accéder à cette section.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.active) ||
                         (statusFilter === 'inactive' && !user.active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleActive = (userId: string, active: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active } : user
    ));
    toast.success(`Utilisateur ${active ? 'activé' : 'désactivé'} avec succès`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('Utilisateur supprimé avec succès');
  };

  const UserForm = ({ user, isEdit = false }: { user?: User; isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nom complet</Label>
          <Input placeholder="Nom complet" defaultValue={user?.name} />
        </div>
        <div>
          <Label>Nom d'utilisateur</Label>
          <Input placeholder="username" defaultValue={user?.username} disabled={isEdit} />
        </div>
      </div>
      
      <div>
        <Label>Email</Label>
        <Input type="email" placeholder="email@example.com" defaultValue={user?.email} />
      </div>
      
      <div>
        <Label>Rôle</Label>
        <Select defaultValue={user?.role}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="responsible">Responsable</SelectItem>
            <SelectItem value="technician">Technicien</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {!isEdit && (
        <div>
          <Label>Mot de passe</Label>
          <Input type="password" placeholder="Mot de passe" />
        </div>
      )}
      
      {isEdit && (
        <div className="flex items-center space-x-2">
          <Switch defaultChecked={user?.active} />
          <Label>Compte actif</Label>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérer les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvel utilisateur
        </Button>
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
                  placeholder="Nom, email, username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label>Rôle</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="responsible">Responsable</SelectItem>
                  <SelectItem value="technician">Technicien</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>
            {filteredUsers.length} utilisateur(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.active}
                        onCheckedChange={(checked) => handleToggleActive(user.id, checked)}
                      />
                      <span className="text-sm">
                        {user.active ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.last_login 
                      ? new Date(user.last_login).toLocaleDateString('fr-FR')
                      : 'Jamais connecté'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
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

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Créer un nouveau compte utilisateur
            </DialogDescription>
          </DialogHeader>
          <UserForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              setShowCreateDialog(false);
              toast.success('Utilisateur créé avec succès');
            }}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifier les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          {selectedUser && <UserForm user={selectedUser} isEdit />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              setShowEditDialog(false);
              toast.success('Utilisateur modifié avec succès');
            }}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}