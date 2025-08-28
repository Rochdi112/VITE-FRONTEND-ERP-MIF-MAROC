import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../App';
import { toast } from 'sonner';

export function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        toast.success('Connexion réussie', { description: 'Bienvenue dans ERP MIF Maroc' });
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
        toast.error('Échec de la connexion', { description: 'Vérifiez vos identifiants et réessayez.' });
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ERP MIF Maroc</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder au système de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom d'utilisateur"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin');
                }}
              >
                👨‍💼 Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername('responsable');
                  setPassword('responsable');
                }}
              >
                👨‍🔧 Responsable
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername('technicien');
                  setPassword('technicien');
                }}
              >
                🔧 Technicien
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername('client');
                  setPassword('client');
                }}
              >
                👤 Client
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-3">🔑 Comptes de test disponibles :</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span><strong>👨‍💼 Administrateur:</strong></span>
                <code className="bg-background px-2 py-1 rounded">admin / admin</code>
              </div>
              <div className="flex justify-between">
                <span><strong>👨‍🔧 Responsable:</strong></span>
                <code className="bg-background px-2 py-1 rounded">responsable / responsable</code>
              </div>
              <div className="flex justify-between">
                <span><strong>🔧 Technicien:</strong></span>
                <code className="bg-background px-2 py-1 rounded">technicien / technicien</code>
              </div>
              <div className="flex justify-between">
                <span><strong>👤 Client:</strong></span>
                <code className="bg-background px-2 py-1 rounded">client / client</code>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
              💡 <strong>Astuce:</strong> Chaque rôle a des permissions différentes. Testez tous les comptes pour voir l'ensemble des fonctionnalités.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}