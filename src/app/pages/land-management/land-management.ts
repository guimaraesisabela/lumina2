import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface HubOption {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  route: string;
}

@Component({
  selector: 'app-land-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './land-management.html',
  styleUrl: './land-management.scss'
})
export class LandManagementComponent implements OnInit {
  loteamentoNome: string = 'Residencial Quinta das Flores';
  loteamentoId: string = '';
  ultimaAtualizacao: string = '';

  options: HubOption[] = [
    {
      icon: 'grid_view',
      title: 'Status dos Lotes',
      description: 'Visualize a disponibilidade das unidades, detalhes técnicos por lote e gestão de estoque em tempo real com mapa interativo.',
      buttonText: 'Acessar Mapa',
      route: '/loteamentos/mapas'
    },
    {
      icon: 'handshake',
      title: 'Vendas e Simulações',
      description: 'Acesse o funil de vendas, realize simulações de financiamento personalizadas e acompanhe propostas pendentes de aprovação.',
      buttonText: 'Gerenciar Propostas',
      route: '/vendas'
    },
    {
      icon: 'folder_open',
      title: 'Documentos',
      description: 'Gerencie plantas humanizadas, registros cartorários, minutas de contrato, licenças ambientais e arquivos técnicos do projeto.',
      buttonText: 'Abrir Repositório',
      route: '/loteamentos/mapas'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loteamentoId = params['id'];
    });
    
    this.updateTimestamp();
  }

  updateTimestamp(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.ultimaAtualizacao = `hoje às ${hours}:${minutes}`;
  }

  onNavigate(route: string): void {
    console.log('Navegando para:', route);
  }

  onVoltarProjetos(): void {
    console.log('Voltar aos projetos');
  }
}