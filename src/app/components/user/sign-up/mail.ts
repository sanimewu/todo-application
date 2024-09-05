import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailExistsValidator(signupUsers: any[]): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const userExists = signupUsers.find(user => user.mail === email);

    return userExists ? { emailExists: true } : null;
  };
}
