import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/eventos',
    pathMatch: 'full',
  },
  {
    path: 'eventos',
    loadComponent: () =>
      import('./pages/eventos/eventos').then((m) => m.EventosComponent),
  },
  {
    path: 'espacos',
    loadComponent: () =>
      import('./pages/espacos/espacos').then((m) => m.EspacosComponent),
  },
  {
    path: 'atracoes',
    loadComponent: () =>
      import('./pages/atracoes/atracoes').then((m) => m.AtracoesComponent),
  },
  {
    path: 'ingressos',
    loadComponent: () =>
      import('./pages/ingressos/ingressos').then((m) => m.IngressosComponent),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/user-management/user-management').then((m) => m.UserManagementComponent),
  },
  {
    path: 'relatorios',
    loadComponent: () =>
      import('./pages/relatorios/relatorios').then((m) => m.RelatoriosComponent),
  },
  {
    path: '**',
    redirectTo: '/eventos',
  },
];