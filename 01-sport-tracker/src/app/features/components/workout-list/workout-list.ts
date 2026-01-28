import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

import { Workout } from '../../../models';

@Component({
  selector: 'app-workout-list',
  imports: [],
  templateUrl: './workout-list.html',
  styleUrl: './workout-list.css',
})
export class WorkoutList {
  workouts: InputSignal<Workout[]> = input<Workout[]>([]);

  loadRequest: OutputEmitterRef<void> = output<void>();
  startUpdateRequest: OutputEmitterRef<string> = output<string>();
  deleteRequest: OutputEmitterRef<string> = output<string>();

  load(): void {
    this.loadRequest.emit();
  }

  startUpdate(id: string): void {
    this.startUpdateRequest.emit(id);
  }

  del(id: string): void {
    this.deleteRequest.emit(id);
  }
}
