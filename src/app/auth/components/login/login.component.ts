import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { emailValidator } from '../../../core/Validators/email.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Icone
  faSpinner = faSpinner;

  public form!: FormGroup;
  public loading: boolean = false; // Stato di caricamento durante l'interazione con il backend

  // Oggetto per la gestione degli errori del form
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  public subscription: Subscription = new Subscription();

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectUser(); // Se l'utente è autenticato, reindirizzalo
    }

    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  public updateFormErrors() {
    if (!this.form) {
      return;
    }
    // Pulisce eventuali messaggi di errore già visibili.
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.loading = true; // Stato di caricamento se il form è valido
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login$(email, password).subscribe({
        next: (user) => {
          console.log('Utente autenticato:', user);
          this.redirectUser();
        },
        error: (error) => {
          this.loading = false; // Fine caricamento in caso di errore
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message =
        'Il modulo è incompleto o contiene errori, verificare i campi.';
    }
  }

  private redirectUser(): void {
    const role = this.authService.getUserRole();
    if (role === 'user') {
      this.router.navigate(['/user/feed']).finally(() => {
        this.loading = false; // Fine caricamento
      });
    } else if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']).finally(() => {
        this.loading = false; // Fine caricamento
      });
    } else {
      this.loading = false;
      this.formErrors['form'].message =
        "Errore durante l'autenticazione. Contattare il supporto.";
    }
  }
}
