import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GlobalFormErrorHandlerService {
  public updateFormErrors(
    form: FormGroup,
    formErrors: {
      [campo: string]: {
        message: string;
        validations: { [field: string]: string };
      };
    }
  ): void {
    // Si l'objet n'est pas un formulaire je sors direct de la fonction
    if (!form) {
      return;
    }
    // Ici je supprime eventuels sms d'erreur précédents
    for (const campo in formErrors) {
      formErrors[campo].message = '';
    }

    // Ici pour renvoyer le message d'erreur 'Les passwords ne coincident pas'
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      formErrors['confirmPassword'].message +=
        formErrors['confirmPassword'].validations['notMatch'] + ' ';
      formErrors['confirmPassword'].message =
        formErrors['confirmPassword'].message.trim();
    }

    // Ici pour renvoyer n'importe quel autre message liés aux formulaire
    for (const campo in form.controls) {
      const control = form.get(campo)!;

      if (control.invalid && (control.touched || control.dirty)) {
        const messages = formErrors[campo].validations;

        for (const key in control.errors) {
          if (messages[key]) {
            formErrors[campo].message += messages[key] + ' ';
          }
        }
        formErrors[campo].message = formErrors[campo].message.trim();
      }
    }
  }
}
