import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServicesOverviewComponent } from './pages/services-overview/services-overview.component';
import { LogementsOverviewComponent } from './pages/logements-overview/logements-overview.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

@NgModule({
  declarations: [
    HomepageComponent,
    OverviewComponent,
    LandingPageComponent,
    ServicesOverviewComponent,
    LogementsOverviewComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
})
export class HomepageModule {}
