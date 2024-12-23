import { Component, OnInit } from '@angular/core';
import { GlobalFormErrorHandlerService } from '../../../core/services/global-form-error-handler.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../core/Validators/email.validator';
import { passwordMatchValidator } from '../../../core/Validators/passwordsmatches.validators';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
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
    name: {
      message: '',
      validations: {
        minlength: 'Le prénom doit contenir au moins 3 caractères.',
        required: 'Le prénom est obligatoire.',
        pattern:
          "Le prénom ne peut pas contenir d'espaces finaux ou de caractères spéciaux.",
      },
    },
    surname: {
      message: '',
      validations: {
        minlength: 'Le nom doit contenir au moins 3 lettres.',
        required: 'Le nom est obligatoire.',
        pattern:
          "Le nom ne peut pas contenir d'espaces finaux ou de caractères spéciaux.",
      },
    },
    email: {
      message: '',
      validations: {
        emailInvalid: 'Veuillez saisir un e-mail valide.',
        required: "L'e-mail est obligatoire.",
      },
    },
    password: {
      message: '',
      validations: {
        pattern:
          'Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre, un chiffre et un caractère spécial parmi : ! @ # $ % ^ & * ( ) _ + - = [ ] { } ; \' : "  | , . < > / ?.',
        required: 'Le mot de passe est obligatoire.',
      },
    },
    confirmPassword: {
      message: '',
      validations: {
        notMatch: 'Les mots de passe ne correspondent pas.',
        required: 'La confirmation du mot de passe est obligatoire.',
      },
    },
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(
    private globalFormErrorHandler: GlobalFormErrorHandlerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            /^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}( [a-zA-ZÀ-ÖØ-öø-ÿ]{3,})*$/
          ),
        ]),
        email: new FormControl('', [Validators.required, emailValidator()]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      // Ici, un validateur personnalisé passé en second paramètre pour le FormGroup
      { validators: passwordMatchValidator() }
    );
  }

  public updateFormErrors() {
    this.globalFormErrorHandler.updateFormErrors(this.form, this.formErrors);
  }

  public submit(): void {
    //   if (this.form.valid) {
    //     // Active l'état de chargement
    //     this.loading = true;
    //     const surname = this.form.get('surname')?.value;
    //     const name = this.form.get('name')?.value;
    //     const email = this.form.get('email')?.value;
    //     const password = this.form.get('password')?.value;
    //     this.authService.register$(surname, name, email, password).subscribe({
    //       next: (user) => {
    //         // Désactive l'état de chargement en cas de succès
    //         this.loading = false;
    //         this.form.reset();
    //         this.router.navigate(['/auth/login']);
    //       },
    //       error: (error) => {
    //         // Désactive l'état de chargement en cas d'erreur
    //         this.loading = false;
    //         this.formErrors['form'].message = error.message;
    //       },
    //     });
    //   } else {
    //     this.updateFormErrors();
    //     this.formErrors['form'].message =
    //       'Le formulaire est incomplet ou contient des erreurs, veuillez vérifier les champs.';
    //   }
  }
}
