// Modules
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Components
import { FeedComponent } from './pages/feed/feed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user.component';
import { PasswordUpdateComponent } from './pages/password-update/password-update.component';

@NgModule({
  declarations: [UserComponent, FeedComponent, ProfileComponent, PasswordUpdateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class UserModule {}
