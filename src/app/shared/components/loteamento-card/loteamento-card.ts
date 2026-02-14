import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Loteamento {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  quadras: number;
  lotes: number;
  imagemUrl: string;
  status: 'ativo' | 'em-lancamento' | 'concluido';
}

@Component({
  selector: 'app-loteamento-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loteamento-card.html',
  styleUrl: './loteamento-card.scss'
})
export class LoteamentoCardComponent {
  @Input() loteamento!: Loteamento;
  @Input() isNewCard: boolean = false;
  @Output() gerenciarClick = new EventEmitter<string>();
  @Output() novoLoteamentoClick = new EventEmitter<void>();

  onGerenciarClick(): void {
    this.gerenciarClick.emit(this.loteamento.id);
  }

  onNovoLoteamentoClick(): void {
    this.novoLoteamentoClick.emit();
  }

  getStatusLabel(): string {
    const statusMap = {
      'ativo': 'Ativo',
      'em-lancamento': 'Em lançamento',
      'concluido': 'Concluído'
    };
    return statusMap[this.loteamento?.status] || '';
  }
}