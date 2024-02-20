import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    // guards
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'prospectos',
    // guards
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./prospectos/prospectos.module').then( m => m.ProspectosModule)
  },
  {
    path: 'dashboard',
    // guards
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
