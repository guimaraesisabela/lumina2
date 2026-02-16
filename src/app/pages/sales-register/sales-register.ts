import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type PaymentType = 'parcelado' | 'avista' | 'financiamento';

interface Cliente {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: string;
}

interface Corretor {
  id: string;
  nome: string;
  creci: string;
  avatarUrl: string;
}

interface DadosLote {
  loteamento: string;
  quadra: string;
  numeroLote: string;
  area: string;
  valorTotal: number;
}

interface Pagamento {
  tipo: PaymentType;
  entrada: number;
  parcelamento: string;
}

@Component({
  selector: 'app-sales-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sales-register.html',
  styleUrl: './sales-register.scss'
})
export class SalesRegisterComponent {
  cliente: Cliente = {
    nome: '',
    cpfCnpj: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  corretor: Corretor = {
    id: '1',
    nome: 'Ricardo Mendes',
    creci: 'CRECI 12345-F',
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  };

  dadosLote: DadosLote = {
    loteamento: '',
    quadra: '',
    numeroLote: '',
    area: '',
    valorTotal: 0
  };

  pagamento: Pagamento = {
    tipo: 'parcelado',
    entrada: 0,
    parcelamento: ''
  };

  loteamentos: string[] = [
    'Residencial Jardim das Oliveiras',
    'Reserva do Bosque',
    'Jardins da Serra',
    'Vila Imperial',
    'Eco Village II'
  ];

  parcelamentos: string[] = [
    '6x fixas',
    '12x fixas',
    '18x fixas',
    '24x fixas',
    '36x fixas',
    '48x fixas',
    '60x fixas'
  ];

  get valorBase(): number {
    return this.dadosLote.valorTotal || 0;
  }

  get entrada(): number {
    return this.pagamento.entrada || 0;
  }

  get valorFinanciado(): number {
    return this.valorBase - this.entrada;
  }

  get valorMensalEstimado(): number {
    if (this.pagamento.tipo === 'avista') return 0;
    if (this.pagamento.tipo === 'financiamento') return this.valorFinanciado / 240;
    
    const parcelas = parseInt(this.pagamento.parcelamento) || 1;
    return this.valorFinanciado / parcelas;
  }

  onPaymentTypeChange(tipo: PaymentType): void {
    this.pagamento.tipo = tipo;
  }

  onEditarCorretor(): void {
    console.log('Editar corretor');
  }

  onConfirmarVenda(): void {
    console.log('Confirmar venda', {
      cliente: this.cliente,
      corretor: this.corretor,
      dadosLote: this.dadosLote,
      pagamento: this.pagamento
    });
  }

  onGerarContrato(): void {
    console.log('Gerar contrato PDF');
  }

  onSalvarSimulacao(): void {
    console.log('Salvar como simulação');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}