import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ChangePasswordService } from '../../services/change-password.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-change-password-form',
  standalone: false,
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent implements OnInit {
  faSpinner = faSpinner;
  faCheckCircle = faCheckCircle; // Icona di successo

  public form!: FormGroup;
  public loading: boolean = false;
  public formErrors: { [campo: string]: string } = {};
  public successMessageVisible: boolean = false; // Variabile per mostrare il messaggio di successo

  private csrfToken: string | null = null;

  constructor(
    private changePasswordService: ChangePasswordService,
    public authService: AuthService,
    private router: Router
  ) {}

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        emailAccount: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmNewPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator } // Validatore personalizzato
    );

    this.csrfToken = this.getCsrfTokenFromCookie(); // Legge il token CSRF

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  /**
   * Validatore personalizzato per verificare che le password corrispondano.
   */
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmNewPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  /**
   * Legge il token CSRF dai cookie.
   */
  private getCsrfTokenFromCookie(): string | null {
    const csrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('p2s_tde_csrf_token='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  }

  /**
   * Aggiorna gli errori del modulo.
   */
  public updateFormErrors() {
    if (!this.form) {
      return;
    }

    for (const field in this.form.controls) {
      const control = this.form.get(field);
      if (control && control.invalid && control.touched) {
        this.formErrors[field] = control.hasError('required')
          ? `${field} è obbligatorio.`
          : control.hasError('email')
          ? `Inserisci un'email valida.`
          : control.hasError('minlength')
          ? `La password deve contenere almeno 8 caratteri.`
          : '';
      } else {
        this.formErrors[field] = '';
      }
    }

    if (this.form.hasError('passwordMismatch')) {
      this.formErrors['confirmNewPassword'] =
        'Le nuove password non corrispondono.';
    }
  }

  /**
   * Invia i dati del modulo per il cambio password.
   */
  public submit(): void {
    if (this.form.valid && this.csrfToken) {
      this.loading = true;

      const email = this.form.get('emailAccount')?.value;
      const oldPassword = this.form.get('oldPassword')?.value;
      const newPassword = this.form.get('newPassword')?.value;

      this.changePasswordService
        .changePassword$(email, oldPassword, newPassword, this.csrfToken)
        .subscribe({
          next: () => {
            this.loading = false;
            this.form.reset(); // Resetta il modulo
            this.successMessageVisible = true; // Mostra il messaggio di successo
            //this.router.navigate(['/user/profile']);
          },
          error: (error) => {
            this.loading = false;
            this.formErrors['form'] =
              error.message || 'Errore durante il cambio password.';
          },
        });
    } else {
      this.formErrors['form'] = this.csrfToken
        ? 'Il modulo è incompleto o contiene errori.'
        : 'Token CSRF mancante. Aggiorna la pagina.';
    }
  }

  /**
   * Logout e reindirizzamento alla pagina di login.
   */
  // Funzione di logout. Toglie il token.
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
