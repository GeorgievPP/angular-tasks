import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }
}
