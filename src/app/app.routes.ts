import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users-route').then(m => m.USERS_ROUTES)},
  {
    path: '**',
    redirectTo: 'users'
  }
];