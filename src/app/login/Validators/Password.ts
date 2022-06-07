import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const ALLOWED_PASSWORD = 'password';
        const value = control.value;

        if (!value) {
            return null;
        }

        const passwordValid = value === ALLOWED_PASSWORD;

        return !passwordValid ? { invalid: true } : null;
    }
}