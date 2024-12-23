import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InternalNotFoundPageComponent } from './components/internal-not-found-page/internal-not-found-page.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ClickOutsideModalDirective } from './directives/click-outside-modal.directive';
import { ToggleSearchSectionDirective } from './directives/toggle-search-section.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputEmailComponent } from './components/form-input-email/form-input-email.component';
import { LogoutConfirmModalComponent } from './components/logout-confirm-modal/logout-confirm-modal.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    InternalNotFoundPageComponent,
    SearchBarComponent,
    ClickOutsideModalDirective,
    ToggleSearchSectionDirective,
    FormInputEmailComponent,
    LogoutConfirmModalComponent,
    ChangePasswordFormComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  // Exporte les composants pour les rendre disponibles dans les autres modules qui en aurons besoins
  exports: [
    HeaderComponent,
    FooterComponent,
    InternalNotFoundPageComponent,
    SearchBarComponent,
    FormInputEmailComponent,
    ChangePasswordFormComponent,
  ],
})
export class SharedModule {}
