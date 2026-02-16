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
    path: 'loteamentos',
    loadComponent: () => 
      import('./pages/land-registration/land-registration').then(m => m.LandRegistrationComponent)
  },
  {
    path: 'mapas',
    loadComponent: () => 
      import('./pages/land-maps/land-maps').then(m => m.LandMapsComponent)
  },
  {
    path: 'vendas',
    loadComponent: () => 
      import('./pages/sales-register/sales-register').then(m => m.SalesRegisterComponent)
  },
  {
    path: '**',
    redirectTo: '/usuarios'
  }
];