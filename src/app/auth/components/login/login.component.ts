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
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // Icônes
  faSpinner = faSpinner;

  public form!: FormGroup;
  public loading: boolean = false; // Pour l'état de chargement lors de l'interaction avec la base de données

  // Un objet pour la gestion des erreurs liées à mon formulaire
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
    // Cela sert à effacer d'éventuels messages d'erreur déjà visibles.
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.loading = true; // Chargement si le formulaire est valide
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login$(email, password).subscribe({
        next: (user) => {
          const role = this.authService.getUserRole();
          // this.loading = true; // Avant la navigation

          if (role === 'user') {
            this.router.navigate(['/user/feed']).finally(() => {
              this.loading = false; // Fin du chargement
            });
          } else if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']).finally(() => {
              this.loading = false; // Fin du chargement
            });
          } else {
            this.loading = false;
            this.formErrors['form'].message =
              "Erreur durant l'authentification. Contactez le support client.";
          }
        },
        // Messages d'erreurs provenant de l'authService après son interaction avec le serveur
        error: (error) => {
          this.loading = false; // Fin du chargement en cas d'erreur
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message =
        'Le formulaire est incomplet ou contient des erreurs, veuillez vérifier les champs.';
    }
  }
}
