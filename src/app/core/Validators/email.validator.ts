import { AbstractControl, ValidatorFn } from '@angular/forms';

// Cette fonction permet d'invalider le formulaire si l'email ne respecte pas la regex
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(control.value)) {
      return { emailInvalid: true };
    }
    return null;
  };
}
