import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [HomepageComponent, OverviewComponent, LandingPageComponent],
  imports: [CommonModule, HomepageRoutingModule, SharedModule],
})
export class HomepageModule {}
