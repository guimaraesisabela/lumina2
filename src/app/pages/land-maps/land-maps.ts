import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type ViewMode = 'grid' | 'list';
type FileCategory = 'implantacao' | 'tecnico' | 'aerea' | 'topografia' | 'marketing';

interface MapFile {
  id: string;
  name: string;
  category: FileCategory;
  date: Date;
  size: string;
  previewUrl?: string;
  fileType: 'pdf' | 'dwg' | 'jpg' | 'png';
}

@Component({
  selector: 'app-land-maps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './land-maps.html',
  styleUrl: './land-maps.scss'
})
export class LandMapsComponent {
  loteamentoNome: string = 'Reserva do Bosque';
  viewMode: ViewMode = 'grid';
  isDragging: boolean = false;

  files: MapFile[] = [
    {
      id: '1',
      name: 'Masterplan Fase 1.pdf',
      category: 'implantacao',
      date: new Date('2023-10-24'),
      size: '4.2 MB',
      previewUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
      fileType: 'pdf'
    },
    {
      id: '2',
      name: 'Planta de Drenagem.dwg',
      category: 'tecnico',
      date: new Date('2023-10-10'),
      size: '12.5 MB',
      fileType: 'dwg'
    },
    {
      id: '3',
      name: 'Vista Aérea Demarcada.jpg',
      category: 'aerea',
      date: new Date('2023-09-05'),
      size: '8.1 MB',
      previewUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
      fileType: 'jpg'
    },
    {
      id: '4',
      name: 'Levantamento Topo.pdf',
      category: 'topografia',
      date: new Date('2023-09-01'),
      size: '1.8 MB',
      previewUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400',
      fileType: 'pdf'
    },
    {
      id: '5',
      name: 'Mapa de Vendas.png',
      category: 'marketing',
      date: new Date('2023-08-15'),
      size: '5.5 MB',
      previewUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      fileType: 'png'
    }
  ];

  getCategoryLabel(category: FileCategory): string {
    const labels = {
      'implantacao': 'IMPLANTAÇÃO',
      'tecnico': 'TÉCNICO',
      'aerea': 'AÉREA',
      'topografia': 'TOPOGRAFIA',
      'marketing': 'MARKETING'
    };
    return labels[category];
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList): void {
    console.log('Arquivos selecionados:', files);
  }

  onGerenciarPastas(): void {
    console.log('Gerenciar pastas');
  }

  onVisualizar(file: MapFile): void {
    console.log('Visualizar arquivo:', file);
  }

  onSubstituir(file: MapFile): void {
    console.log('Substituir arquivo:', file);
  }

  onDeletar(file: MapFile): void {
    console.log('Deletar arquivo:', file);
  }

  onBaixar(file: MapFile): void {
    console.log('Baixar arquivo:', file);
  }
}