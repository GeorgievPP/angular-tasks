import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { GemType } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  gemTypes: string[] = Object.values(GemType);

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
      carats: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      type: [GemType.Empty, [Validators.required, this.optionsValidator(this.gemTypes)]],
    });
  }

  private optionsValidator(options: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return { invalidOption: true };
      return options.includes(value) ? null : { invalidOption: true };
    };
  }
}
