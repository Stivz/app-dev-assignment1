import { Routes } from '@angular/router';
// import { authGuard } from './auth.guard';
export const routes: Routes = [
  
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // canActivate: [authGuard]
  },
  
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage),
    // canActivate: [authGuard]
    
  },
 
  {
    path: 'data',
    loadComponent: () => import('./data/data.page').then( m => m.DataPage),
    // canActivate: [authGuard]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
    // canActivate: [authGuard]
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then( m => m.MapPage)
    // canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
    // canActivate: [authGuard]
  },
  
  // {
  //   path: 'favorites/:id',
  //   loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  // },
  
];
