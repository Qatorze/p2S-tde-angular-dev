import { Component, OnInit } from '@angular/core';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  faCopyright = faCopyright;

  public userRole!: string | null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadClienteData();
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
}
