import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { User, Mail, Shield, Calendar, Edit, Save, X, Key } from 'lucide-react';
import { useAuth } from '../App';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) return null;

  const handleSave = () => {
    // Simulation de sauvegarde pour le template
    toast.success('Profil mis à jour avec succès');
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Simulation de changement de mot de passe pour le template
    toast.success('Mot de passe modifié avec succès');
    setIsChangingPassword(false);
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1>Mon profil</h1>
        <p className="text-muted-foreground">
          Gérer vos informations personnelles et paramètres de compte
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-2">
                  {getRoleBadge(user.role)}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4" />
                  Annuler
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Modifier
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Informations personnelles
            </CardTitle>
            <CardDescription>
              Vos informations de base
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nom complet</Label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom complet"
                />
              ) : (
                <p className="mt-1">{user.name}</p>
              )}
            </div>

            <div>
              <Label>Adresse email</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                />
              ) : (
                <p className="mt-1">{user.email}</p>
              )}
            </div>

            <div>
              <Label>Nom d'utilisateur</Label>
              <p className="mt-1 text-muted-foreground">{user.username}</p>
            </div>

            <div>
              <Label>Rôle</Label>
              <div className="mt-1">
                {getRoleBadge(user.role)}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Paramètres de sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mot de passe</Label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted-foreground">••••••••</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="flex items-center gap-2"
                >
                  <Key className="h-3 w-3" />
                  {isChangingPassword ? 'Annuler' : 'Modifier'}
                </Button>
              </div>
            </div>

            {isChangingPassword && (
              <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
                <div>
                  <Label>Mot de passe actuel</Label>
                  <Input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="Mot de passe actuel"
                  />
                </div>
                
                <div>
                  <Label>Nouveau mot de passe</Label>
                  <Input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                
                <div>
                  <Label>Confirmer le mot de passe</Label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirmer le mot de passe"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePasswordChange} size="sm">
                    Modifier le mot de passe
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            <div>
              <Label>Dernière connexion</Label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Aujourd'hui à 10:30
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Préférences</CardTitle>
          <CardDescription>
            Personnalisez votre expérience utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications par email pour les nouvelles interventions
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications push</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications push dans le navigateur
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Mode sombre automatique</Label>
              <p className="text-sm text-muted-foreground">
                Activer automatiquement le mode sombre selon l'heure
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary (for technicians) */}
      {user.role === 'technician' && (
        <Card>
          <CardHeader>
            <CardTitle>Résumé d'activité</CardTitle>
            <CardDescription>
              Votre activité récente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-muted-foreground">Interventions actives</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-muted-foreground">Interventions terminées</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-muted-foreground">Note moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}