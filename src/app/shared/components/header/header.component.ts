import { Component, OnInit } from '@angular/core';
import {
  faSignInAlt,
  faSearch,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faHeart = faHeart;
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;

  showModal = false;
  showConfirmLogoutModal = false;

  public userRole!: string | null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadClienteData();
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

  // Ottieni il link per la navigazione in base allo stato di autenticazione e ai dati del cliente
  public getRouterLink(): string[] {
    // Controlla se l'utente è autenticato e se i dati del cliente sono disponibili
    return this.authService.isAuthenticated() && this.userRole
      ? ['/', this.userRole]
      : ['/homepage'];
  }

  // Funzione che carica i dati del cliente dal servizio AuthService
  private loadClienteData(): void {
    this.userRole = this.authService.getUserRole() || null;
  }

  private checkAuthentication(): void {
    this.authService.isAuthenticated;
  }

  // Funzione di logout. Toglie il token.
  logout(): void {
    this.authService.logout();
  }
}
