import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoteamentoCardComponent, Loteamento } from '../../shared/components/loteamento-card/loteamento-card';
import { ModalComponent } from '../../shared/components/modal/modal';

type StatusFilter = 'todos' | 'ativo' | 'em-lancamento' | 'concluido';

interface DocumentoAnexado {
  id: string;
  nome: string;
  url?: string;
}

interface LoteamentoDetalhes extends Loteamento {
  areaTotal: number;
  endereco: string;
  cep: string;
  documentos: DocumentoAnexado[];
}

@Component({
  selector: 'app-land-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, LoteamentoCardComponent, ModalComponent],
  templateUrl: './land-registration.html',
  styleUrl: './land-registration.scss'
})
export class LandRegistrationComponent {
  searchTerm: string = '';
  selectedStatus: StatusFilter = 'todos';
  isModalOpen: boolean = false;
  loteamentoEdit: LoteamentoDetalhes | null = null;

  loteamentos: LoteamentoDetalhes[] = [
    {
      id: '1',
      nome: 'Reserva do Bosque',
      cidade: 'Campinas',
      estado: 'SP',
      quadras: 12,
      lotes: 340,
      imagemUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      status: 'ativo',
      areaTotal: 45000,
      endereco: 'Rua das Palmeiras, 1500 - Jardim Planalto\nSão José dos Campos - SP, 12230-000',
      cep: '12230-000',
      documentos: [
        { id: '1', nome: 'Planta_Geral_Aprovada.pdf' },
        { id: '2', nome: 'Escritura_Terreno_SJC.docx' },
        { id: '3', nome: 'Memorial_Descritivo_V02.pdf' }
      ]
    },
    {
      id: '2',
      nome: 'Jardins da Serra',
      cidade: 'Indaiatuba',
      estado: 'SP',
      quadras: 8,
      lotes: 156,
      imagemUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      status: 'em-lancamento',
      areaTotal: 32000,
      endereco: 'Av. Principal, 800 - Centro\nIndaiatuba - SP, 13330-000',
      cep: '13330-000',
      documentos: []
    },
    {
      id: '3',
      nome: 'Vila Imperial',
      cidade: 'Sorocaba',
      estado: 'SP',
      quadras: 15,
      lotes: 420,
      imagemUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      status: 'concluido',
      areaTotal: 58000,
      endereco: 'Rua Imperial, 200 - Vila Augusta\nSorocaba - SP, 18015-000',
      cep: '18015-000',
      documentos: []
    },
    {
      id: '4',
      nome: 'Eco Village II',
      cidade: 'Valinhos',
      estado: 'SP',
      quadras: 6,
      lotes: 98,
      imagemUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      status: 'ativo',
      areaTotal: 28000,
      endereco: 'Estrada Municipal, km 5 - Zona Rural\nValinhos - SP, 13270-000',
      cep: '13270-000',
      documentos: []
    },
    {
      id: '5',
      nome: 'Horizonte Azul',
      cidade: 'Itu',
      estado: 'SP',
      quadras: 18,
      lotes: 510,
      imagemUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      status: 'em-lancamento',
      areaTotal: 65000,
      endereco: 'Rodovia Santos Dumont, km 12 - Distrito Industrial\nItu - SP, 13300-000',
      cep: '13300-000',
      documentos: []
    }
  ];

  constructor(private router: Router) {}

  get filteredLoteamentos(): Loteamento[] {
    return this.loteamentos.filter(loteamento => {
      const matchesSearch = !this.searchTerm || 
        loteamento.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        loteamento.cidade.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        loteamento.estado.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'todos' || loteamento.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get modalTitle(): string {
    return this.loteamentoEdit?.id ? this.loteamentoEdit.nome : 'Novo Loteamento';
  }

  get buttonSaveText(): string {
    return this.loteamentoEdit?.id ? 'SALVAR' : 'CRIAR';
  }

  onStatusFilterChange(status: StatusFilter): void {
    this.selectedStatus = status;
  }

  onAdicionarLoteamento(): void {
    this.loteamentoEdit = {
      id: '',
      nome: '',
      cidade: '',
      estado: '',
      quadras: 0,
      lotes: 0,
      imagemUrl: '',
      status: 'ativo',
      areaTotal: 0,
      endereco: '',
      cep: '',
      documentos: []
    };
    this.isModalOpen = true;
  }

  onGerenciar(id: string): void {
    this.router.navigate(['/loteamentos', id, 'management']);
  }

  onNovoLoteamento(): void {
    this.onAdicionarLoteamento();
  }

  onEditarLoteamento(id: string): void {
    const loteamento = this.loteamentos.find(l => l.id === id);
    if (loteamento) {
      this.loteamentoEdit = { ...loteamento };
      this.isModalOpen = true;
    }
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.loteamentoEdit = null;
  }

  onSaveModal(): void {
    if (this.loteamentoEdit) {
      if (this.loteamentoEdit.id) {
        const index = this.loteamentos.findIndex(l => l.id === this.loteamentoEdit!.id);
        if (index !== -1) {
          this.loteamentos[index] = { ...this.loteamentoEdit };
        }
        console.log('Loteamento editado:', this.loteamentoEdit);
      } else {
        const novoId = (this.loteamentos.length + 1).toString();
        const novoLoteamento = { 
          ...this.loteamentoEdit, 
          id: novoId,
          imagemUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        };
        this.loteamentos.push(novoLoteamento);
        console.log('Novo loteamento criado:', novoLoteamento);
      }
      this.onCloseModal();
    }
  }

  onVisualizarDoc(doc: DocumentoAnexado): void {
    console.log('Visualizar:', doc);
  }

  onBaixarDoc(doc: DocumentoAnexado): void {
    console.log('Baixar:', doc);
  }
}