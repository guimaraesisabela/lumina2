import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoteamentoCardComponent, Loteamento } from '../../shared/components/loteamento-card/loteamento-card';

type StatusFilter = 'todos' | 'ativo' | 'em-lancamento' | 'concluido';

@Component({
  selector: 'app-land-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, LoteamentoCardComponent],
  templateUrl: './land-registration.html',
  styleUrl: './land-registration.scss'
})
export class LandRegistrationComponent {
  searchTerm: string = '';
  selectedStatus: StatusFilter = 'todos';

  loteamentos: Loteamento[] = [
    {
      id: '1',
      nome: 'Reserva do Bosque',
      cidade: 'Campinas',
      estado: 'SP',
      quadras: 12,
      lotes: 340,
      imagemUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Jardins da Serra',
      cidade: 'Indaiatuba',
      estado: 'SP',
      quadras: 8,
      lotes: 156,
      imagemUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      status: 'em-lancamento'
    },
    {
      id: '3',
      nome: 'Vila Imperial',
      cidade: 'Sorocaba',
      estado: 'SP',
      quadras: 15,
      lotes: 420,
      imagemUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      status: 'concluido'
    },
    {
      id: '4',
      nome: 'Eco Village II',
      cidade: 'Valinhos',
      estado: 'SP',
      quadras: 6,
      lotes: 98,
      imagemUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      status: 'ativo'
    },
    {
      id: '5',
      nome: 'Horizonte Azul',
      cidade: 'Itu',
      estado: 'SP',
      quadras: 18,
      lotes: 510,
      imagemUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      status: 'em-lancamento'
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

  onStatusFilterChange(status: StatusFilter): void {
    this.selectedStatus = status;
  }

  onAdicionarLoteamento(): void {
    console.log('Adicionar novo loteamento');
  }

  onGerenciar(id: string): void {
    this.router.navigate(['/loteamentos', id, 'management']);
  }

  onNovoLoteamento(): void {
    console.log('Criar novo loteamento');
  }
}