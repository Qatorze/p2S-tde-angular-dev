// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UserComponent } from './user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { InternalNotFoundPageComponent } from '../../shared/components/internal-not-found-page/internal-not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: '**', component: InternalNotFoundPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
