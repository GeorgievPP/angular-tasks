import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from '../../../core/services';
import { NewWorkout, Workout, WorkoutFormValue } from '../../../models';

@Component({
  selector: 'app-workout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})
export class WorkoutForm {
  private readonly formBuilder: FormService = inject(FormService);
  formGroup: FormGroup = this.formBuilder.createForm();

  currWorkout: InputSignal<Workout | null> = input<Workout | null>(null);

  createRequest: OutputEmitterRef<NewWorkout> = output<NewWorkout>();
  updateRequest: OutputEmitterRef<Workout> = output<Workout>();
  cancelRequest: OutputEmitterRef<void> = output<void>();

  private readonly syncFormEffect = effect(() => {
    const current = this.currWorkout();

    if (current) {
      this.formGroup.patchValue({
        workout: current.workout,
        location: current.location,
        date: current.date,
      });
    } else {
      this.formGroup.reset();
    }
  });

  submit(): void {
    if (this.formGroup.invalid) return;

    const { workout, location, date } = this.formGroup.value as WorkoutFormValue;

    const current = this.currWorkout();

    if (current) {
      this.handleUpdate(current, { workout, location, date });
    } else {
      this.handleCreate({ workout, location, date });
    }

    this.formGroup.reset();
  }

  cancel(): void {
    this.formGroup.reset();
    this.cancelRequest.emit();
  }

  private handleCreate(values: WorkoutFormValue): void {
    const payload: NewWorkout = { ...values };
    this.createRequest.emit(payload);
  }

  private handleUpdate(current: Workout, values: WorkoutFormValue): void {
    const payload: Workout = {
      ...current,
      ...values,
    };
    this.updateRequest.emit(payload);
  }
}
