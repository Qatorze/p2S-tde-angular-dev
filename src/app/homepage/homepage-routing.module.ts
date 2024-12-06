import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { HomepageComponent } from './homepage.component';
import { InternalNotFoundPageComponent } from '../shared/components/internal-not-found-page/internal-not-found-page.component';
import { ServicesOverviewComponent } from './pages/services-overview/services-overview.component';
import { LogementsOverviewComponent } from './pages/logements-overview/logements-overview.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'nos-services', component: ServicesOverviewComponent },
      { path: 'nos-logements', component: LogementsOverviewComponent },
      { path: 'about-us-P2S-tde', component: AboutUsComponent },
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
