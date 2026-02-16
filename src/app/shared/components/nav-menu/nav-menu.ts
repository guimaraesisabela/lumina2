import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-menu.html',
  styleUrls: ['./nav-menu.scss']
})
export class NavMenuComponent {
  menuItems: MenuItem[] = [
    { label: 'Mapas', route: '/mapas' },
    { label: 'Loteamentos', route: '/loteamentos' },
    { label: 'Usuários', route: '/usuarios' },
    { label: 'Relatórios', route: '/relatorios-financeiros' },
    { label: 'Vendas', route: '/vendas' },
    { label: 'Configurações', route: '/configuracoes' }
  ];
}