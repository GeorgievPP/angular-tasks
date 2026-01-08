import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Category, Team, Urgency } from '../../models/enums';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  categories: string[] = Object.values(Category);
  urgencies: string[] = Object.values(Urgency);
  teams: string[] = Object.values(Team);

  createForm(): FormGroup {
    return this.formBuilder.group({
      employee: ['', [Validators.required]],
      category: [Category.Empty, [Validators.required, this.optionsValidator(this.categories)]],
      urgency: [Urgency.Empty, [Validators.required, this.optionsValidator(this.urgencies)]],
      team: [Team.Empty, [Validators.required, this.optionsValidator(this.teams)]],
      description: ['', [Validators.required]],
    });
  }

  private optionsValidator(options: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      return options.includes(value) ? null : { invalidOption: true };
    };
  }
}
