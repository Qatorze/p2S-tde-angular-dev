import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { HomepageComponent } from './homepage.component';
import { InternalNotFoundPageComponent } from '../shared/components/internal-not-found-page/internal-not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'overview', component: OverviewComponent },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: InternalNotFoundPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
