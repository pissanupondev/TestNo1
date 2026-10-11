import { Validators } from '@angular/forms';
import { ValidatorPattern } from '../../../shared/validators/validator-patterns';

export const UserFormValidators = {
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required,Validators.pattern(ValidatorPattern.phone)]],
  birthDay: ['', Validators.required],
  sex: ['', Validators.required],
  occupation: ['', Validators.required],
  profile: ['',Validators.required],
  contentType: ['',Validators.required]
};