import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadComponent: () => 
      import('./pages/user-management/user-management').then(m => m.UserManagementComponent)
  },
  {
    path: '**',
    redirectTo: '/usuarios'
  }
];