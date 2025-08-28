import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { FileText, Upload, Download, Search, Filter, Trash2, Eye, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  nom_fichier: string;
  chemin: string;
  taille: number;
  type_mime: string;
  intervention_id?: string;
  intervention_title?: string;
  uploaded_by: string;
  upload_date: string;
  description?: string;
}

const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    nom_fichier: 'rapport_maintenance_A1.pdf',
    chemin: '/static/uploads/a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf',
    taille: 2048576, // 2MB
    type_mime: 'application/pdf',
    intervention_id: 'INT-001',
    intervention_title: 'Maintenance compresseur A1',
    uploaded_by: 'Mohammed Alami',
    upload_date: '2025-08-25T14:30:00Z',
    description: 'Rapport de maintenance préventive du compresseur A1'
  },
  {
    id: 'DOC-002',
    nom_fichier: 'photo_avant_reparation.jpg',
    chemin: '/static/uploads/b2c3d4e5-f6g7-8901-bcde-f23456789012.jpg',
    taille: 1536000, // 1.5MB
    type_mime: 'image/jpeg',
    intervention_id: 'INT-002',
    intervention_title: 'Révision machine B3',
    uploaded_by: 'Fatima Bennani',
    upload_date: '2025-08-26T09:15:00Z',
    description: 'Photo de l\'état de la machine avant réparation'
  },
  {
    id: 'DOC-003',
    nom_fichier: 'facture_pieces_detachees.pdf',
    chemin: '/static/uploads/c3d4e5f6-g7h8-9012-cdef-345678901234.pdf',
    taille: 512000, // 512KB
    type_mime: 'application/pdf',
    intervention_id: 'INT-001',
    intervention_title: 'Maintenance compresseur A1',
    uploaded_by: 'Admin',
    upload_date: '2025-08-27T16:45:00Z',
    description: 'Facture des pièces détachées utilisées'
  }
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return '🖼️';
  } else if (mimeType === 'application/pdf') {
    return '📄';
  } else if (mimeType.includes('document') || mimeType.includes('word')) {
    return '📝';
  } else if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
    return '📊';
  }
  return '📁';
};

const getFileTypeBadge = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return <Badge variant="outline" className="bg-blue-100 text-blue-800">Image</Badge>;
  } else if (mimeType === 'application/pdf') {
    return <Badge variant="outline" className="bg-red-100 text-red-800">PDF</Badge>;
  } else if (mimeType.includes('document')) {
    return <Badge variant="outline" className="bg-blue-100 text-blue-800">Document</Badge>;
  }
  return <Badge variant="outline">Fichier</Badge>;
};

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [interventionFilter, setInterventionFilter] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.nom_fichier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.intervention_title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || document.type_mime.startsWith(typeFilter);
    const matchesIntervention = interventionFilter === 'all' || document.intervention_id === interventionFilter;
    
    return matchesSearch && matchesType && matchesIntervention;
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(`Type de fichier non supporté: ${file.name}`);
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(`Fichier trop volumineux: ${file.name} (max 10MB)`);
        return false;
      }
      
      return true;
    });
    
    setUploadedFiles(validFiles);
    if (validFiles.length > 0) {
      setShowUploadDialog(true);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileUpload = () => {
    // Simulation d'upload pour le template
    uploadedFiles.forEach(file => {
      const newDocument: Document = {
        id: `DOC-${Date.now()}`,
        nom_fichier: file.name,
        chemin: `/uploads/${crypto.randomUUID()}.${file.name.split('.').pop()}`,
        taille: file.size,
        type_mime: file.type,
        uploaded_by: 'Utilisateur actuel',
        upload_date: new Date().toISOString(),
        description: `Document uploadé: ${file.name}`
      };
      
      setDocuments(prev => [newDocument, ...prev]);
    });
    
    toast.success(`${uploadedFiles.length} fichier(s) uploadé(s) avec succès`);
    setUploadedFiles([]);
    setShowUploadDialog(false);
  };

  const handleDownload = (document: Document) => {
    // Simulation de téléchargement pour le template
    toast.success(`Téléchargement de ${document.nom_fichier} démarré`);
  };

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    toast.success('Document supprimé avec succès');
  };

  const DropZone = () => (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
      <p className="text-lg font-medium mb-2">Glissez-déposez vos fichiers ici</p>
      <p className="text-sm text-muted-foreground mb-4">
        ou cliquez pour sélectionner
      </p>
      <Button variant="outline">
        Parcourir les fichiers
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Formats supportés: PDF, JPG, PNG, GIF (max 10MB)
      </p>
    </div>
  );

  const UploadDialog = () => (
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload de documents</DialogTitle>
          <DialogDescription>
            Confirmer l'upload des fichiers sélectionnés
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Intervention liée (optionnel)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une intervention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INT-001">INT-001 - Maintenance compresseur A1</SelectItem>
                <SelectItem value="INT-002">INT-002 - Révision machine B3</SelectItem>
                <SelectItem value="INT-003">INT-003 - Réparation ligne C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Fichiers à uploader</Label>
            <div className="space-y-2 mt-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <span>{getFileIcon(file.type)}</span>
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
            Annuler
          </Button>
          <Button onClick={handleFileUpload}>
            Upload {uploadedFiles.length} fichier(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des documents</h1>
          <p className="text-muted-foreground">
            Gérer les documents liés aux interventions
          </p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload documents
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taille totale</CardTitle>
            <div className="h-4 w-4 rounded bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFileSize(documents.reduce((sum, doc) => sum + doc.taille, 0))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents PDF</CardTitle>
            <div className="h-4 w-4 rounded bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => doc.type_mime === 'application/pdf').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
            <div className="h-4 w-4 rounded bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => doc.type_mime.startsWith('image/')).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Upload de documents</CardTitle>
          <CardDescription>
            Glissez-déposez vos fichiers ou cliquez pour les sélectionner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropZone />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label>Type de fichier</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="application/pdf">PDF</SelectItem>
                  <SelectItem value="image/">Images</SelectItem>
                  <SelectItem value="application/">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Intervention</Label>
              <Select value={interventionFilter} onValueChange={setInterventionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les interventions</SelectItem>
                  <SelectItem value="INT-001">INT-001 - Compresseur A1</SelectItem>
                  <SelectItem value="INT-002">INT-002 - Machine B3</SelectItem>
                  <SelectItem value="INT-003">INT-003 - Ligne C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setInterventionFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fichier</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Intervention</TableHead>
                <TableHead>Uploadé par</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getFileIcon(document.type_mime)}</span>
                      <div>
                        <div className="font-medium">{document.nom_fichier}</div>
                        {document.description && (
                          <div className="text-sm text-muted-foreground">
                            {document.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getFileTypeBadge(document.type_mime)}</TableCell>
                  <TableCell>{formatFileSize(document.taille)}</TableCell>
                  <TableCell>
                    {document.intervention_title ? (
                      <div>
                        <Badge variant="outline">{document.intervention_id}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {document.intervention_title}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Non lié</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="text-sm">{document.uploaded_by}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">
                        {new Date(document.upload_date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(document)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document.id)}
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

      <UploadDialog />
    </div>
  );
}