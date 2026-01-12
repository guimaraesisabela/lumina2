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
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Imóveis', route: '/imoveis' },
    { label: 'Usuários', route: '/usuarios' },
    { label: 'Financeiro', route: '/financeiro' },
    { label: 'Configurações', route: '/configuracoes' }
  ];
}