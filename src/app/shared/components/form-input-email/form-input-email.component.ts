import { Component, OnInit } from '@angular/core';
import { emailValidator } from '../../../core/Validators/email.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Icona "spinner" (solido)
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'; // Icona "spinner" (solido)

@Component({
  selector: 'app-form-input-email',
  standalone: false,

  templateUrl: './form-input-email.component.html',
  styleUrl: './form-input-email.component.scss',
})
export class FormInputEmailComponent implements OnInit {
  // Icona spinner
  faSpinner = faSpinner;
  faPaperPlane = faPaperPlane;

  // Définir les styles dynamiques
  dynamicStyles = {
    color: 'white', // Couleur initiale
  };
  // Form Angular
  public form!: FormGroup;
  public loading: boolean = false;

  // Gestione errori
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

  ngOnInit(): void {
    // Inizializza il form con un solo campo
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
    });

    // Gestione errori in tempo reale
    this.form.statusChanges.subscribe(() => {
      this.updateFormErrors();
    });
  }

  // Aggiorna gli errori del form
  public updateFormErrors(): void {
    if (!this.form) return;

    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  // Invia il form
  public submit(): void {
    if (this.form.valid) {
      this.loading = true; // Mostra il caricamento
      const email = this.form.get('email')?.value;

      console.log('Email submitted:', email); // Debug, puoi inviare a un servizio

      // Simula un caricamento con un timeout
      setTimeout(() => {
        this.loading = false; // Fine del caricamento
      }, 2000);
    } else {
      this.formErrors['form'].message =
        'Il campo email è obbligatorio o contiene un valore non valido.';
    }
  }
}
