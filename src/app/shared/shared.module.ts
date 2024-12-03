import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InternalNotFoundPageComponent } from './components/internal-not-found-page/internal-not-found-page.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    InternalNotFoundPageComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, RouterModule, FontAwesomeModule],
  // Exporte les composants pour les rendre disponibles dans les autres modules qui en aurons besoins
  exports: [HeaderComponent, FooterComponent, InternalNotFoundPageComponent],
})
export class SharedModule {}
