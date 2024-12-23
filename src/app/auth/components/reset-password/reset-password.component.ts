import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  // Icona per il caricamento
  faSpinner = faSpinner;
  form: FormGroup;
  token: string | null = null; // Variabile per il token
  loading = false; // Stato di caricamento
  formErrors: any = {}; // Gestione degli errori del modulo

  constructor(
    private route: ActivatedRoute, // Per accedere ai parametri dell'URL
    private fb: FormBuilder, // Per creare il modulo
    private authService: AuthService, // Servizio per il reset della password
    private router: Router // Per navigare tra le pagine
  ) {
    // Inizializzazione del form
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Recupera il token dalla query string nell'URL
    this.token = this.route.snapshot.queryParamMap.get('token');

    // Se il token non è presente, reindirizza l'utente
    if (!this.token) {
      this.router.navigate(['/auth/password-reset-request']);
    }

    // Precompila il form con il token (opzionale)
    if (this.token) {
      this.form.addControl('token', this.fb.control(this.token));
    }
  }

  // Funzione di submit del modulo
  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { newPassword, confirmNewPassword, token } = this.form.value;

    // Verifica che le password coincidano
    if (newPassword !== confirmNewPassword) {
      this.formErrors['form'] = { message: 'Le password non corrispondono.' };
      return;
    }

    // Invia la richiesta al servizio per il reset della password
    this.loading = true;
    this.authService.resetPassword(token, newPassword).subscribe(
      (response) => {
        // Successo: Reindirizza l'utente al login
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        // Gestione degli errori
        this.formErrors['form'] = {
          message: 'Errore durante il reset della password.',
        };
        this.loading = false;
      }
    );
  }
}
