import { AbstractControl, ValidationErrors, Validator } from "@angular/forms"

export function whiteSpaceValidator(c: AbstractControl): ValidationErrors {
  const valueEntered = c.value as string;

  return valueEntered && valueEntered.trim() ? null : { required: true };
}
