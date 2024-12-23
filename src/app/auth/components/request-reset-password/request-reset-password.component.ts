import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-request-reset-password',
  standalone: false,

  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.scss',
})
export class RequestResetPasswordComponent {
  // Icona per il caricamento
  faSpinner = faSpinner;

  public form: FormGroup;
  public loading: boolean = false;
  public message: string = '';
  public success: boolean = false;

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.loading = true; // Mostra il loader
      this.message = ''; // Resetta eventuali messaggi precedenti

      const email = this.form.get('email')?.value;

      // Chiama il metodo del servizio
      this.authService.requestPasswordReset$(email).subscribe({
        next: (response) => {
          // Successo: aggiorna il messaggio e disattiva il loader
          this.message = response.message; // Accedi alla proprietà message della risposta
          this.success = true;
          this.loading = false;
        },
        error: (error) => {
          // Errore: mostra il messaggio di errore
          this.message =
            error.message || 'An error occurred. Please try again.';
          this.success = false;
          this.loading = false;
        },
      });
    } else {
      // Form non valido: mostra un messaggio di errore
      this.message = 'Please enter a valid email address.';
      this.success = false;
    }
  }
}
