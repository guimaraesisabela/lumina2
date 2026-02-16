import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Vencimento {
  data: Date;
  cliente: string;
  lote: string;
  empreendimento: string;
  valor: number;
}

interface ResumoVenda {
  empreendimento: string;
  quadraLote: string;
  cliente: string;
  valor: number;
}

interface Estoque {
  empreendimento: string;
  disponiveis: number;
  total: number;
}

interface Inadimplencia {
  diasAtraso: number;
  cliente: string;
  lote: string;
  valorAberto: number;
}

@Component({
  selector: 'app-reports-financial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports-financial.html',
  styleUrl: './reports-financial.scss'
})
export class ReportsFinancialComponent {
  mesAtual: string = 'Janeiro 2024';
  valorTotalReceber: number = 1245600.00;
  variacao: number = 12;

  vencimentos: Vencimento[] = [
    {
      data: new Date('2024-01-15'),
      cliente: 'Ricardo Silveira Matos',
      lote: 'Q-05 / L-12',
      empreendimento: 'Residencial Aurora',
      valor: 2450.00
    },
    {
      data: new Date('2024-01-18'),
      cliente: 'Mariana Costa',
      lote: 'Q-02 / L-01',
      empreendimento: 'Condomínio Terra Nova',
      valor: 1890.00
    },
    {
      data: new Date('2024-01-20'),
      cliente: 'João Pedro Oliveira',
      lote: 'Q-08 / L-34',
      empreendimento: 'Residencial Aurora',
      valor: 3100.00
    }
  ];

  resumoVendas: ResumoVenda[] = [
    {
      empreendimento: 'Eco Park II',
      quadraLote: 'A - 04',
      cliente: 'Felipe Alencar',
      valor: 145000.00
    },
    {
      empreendimento: 'Residencial Aurora',
      quadraLote: 'B - 12',
      cliente: 'Beatriz Mendes',
      valor: 182500.00
    },
    {
      empreendimento: 'Terra Nova',
      quadraLote: 'C - 09',
      cliente: 'Carlos Eduardo',
      valor: 98400.00
    },
    {
      empreendimento: 'Eco Park II',
      quadraLote: 'D - 21',
      cliente: 'Sofia Rocha',
      valor: 132000.00
    }
  ];

  estoques: Estoque[] = [
    {
      empreendimento: 'Residencial Aurora',
      disponiveis: 42,
      total: 100
    },
    {
      empreendimento: 'Eco Park II',
      disponiveis: 15,
      total: 80
    },
    {
      empreendimento: 'Terra Nova',
      disponiveis: 58,
      total: 60
    }
  ];

  inadimplencias: Inadimplencia[] = [
    {
      diasAtraso: 45,
      cliente: 'Anderson Soares Lima',
      lote: 'Q-12 / L-05',
      valorAberto: 5420.00
    },
    {
      diasAtraso: 12,
      cliente: 'Luciana Ferreira Santos',
      lote: 'Q-01 / L-15',
      valorAberto: 1250.00
    },
    {
      diasAtraso: 8,
      cliente: 'Marcos Paulo Silva',
      lote: 'Q-05 / L-22',
      valorAberto: 2900.00
    }
  ];

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getEstoquePercentage(estoque: Estoque): number {
    return (estoque.disponiveis / estoque.total) * 100;
  }

  getDiasAtrasoBadgeClass(dias: number): string {
    if (dias >= 30) return 'badge-danger';
    if (dias >= 15) return 'badge-warning';
    return 'badge-info';
  }

  onExportarPDF(): void {
    console.log('Exportar PDF');
  }

  onVerRelatorioCompleto(): void {
    console.log('Ver relatório completo');
  }

  onMapaDisponibilidade(): void {
    console.log('Ver mapa de disponibilidade');
  }

  onNotificarCliente(inadimplencia: Inadimplencia): void {
    console.log('Notificar cliente:', inadimplencia);
  }
}