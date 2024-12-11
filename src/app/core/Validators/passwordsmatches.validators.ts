import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Cette fonction permet d'invalider le formulaire si password et confirmPassword ne coincident pas.
export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
