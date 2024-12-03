// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { preventLoggedInGuard } from './core/guards/prevent-logged-in.guard';
import { authGuard } from './core/guards/auth.guard';
// Components
import { GlobalNotFoundPageComponent } from './shared/components/global-not-found-page/global-not-found-page.component';

const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule),
    canActivate: [preventLoggedInGuard], //Empèche de sortir d'aller à la page principale de l'application si le user est connecté.
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [preventLoggedInGuard],
  },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule),
  },
  { path: '**', component: GlobalNotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
