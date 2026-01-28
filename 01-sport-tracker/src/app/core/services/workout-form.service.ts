import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  createForm() {
    return this.formBuilder.group({
      workout: ['', [Validators.required]],
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }
}
