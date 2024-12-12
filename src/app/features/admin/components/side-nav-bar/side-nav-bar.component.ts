import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-nav-bar',
  standalone: false,

  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss',
})
export class SideNavBarComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;

  showModal = false;
  showConfirmLogoutModal = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  toggleSearchModal(): void {
    if (!this.showConfirmLogoutModal) {
      this.showConfirmLogoutModal = false;
    }
    this.showModal = !this.showModal;
  }

  closeSearchModal(): void {
    this.showModal = false;
  }

  toggleConfirmLogoutModal(): void {
    if (!this.showModal) {
      this.showModal = false;
    }
    this.showConfirmLogoutModal = !this.showConfirmLogoutModal;
  }

  closeConfirmLogoutModal(): void {
    this.showConfirmLogoutModal = false;
  }

  private checkAuthentication(): void {
    this.authService.isAuthenticated;
  }

  logout(): void {
    this.authService.logout();
  }
}
