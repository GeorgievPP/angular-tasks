import { Component, inject } from '@angular/core';

import { NewWorkout, Workout } from '../../models';

import { WorkoutForm } from '../components/workout-form/workout-form';
import { WorkoutList } from '../components/workout-list/workout-list';
import { WorkoutService } from '../../core/services/workout.service';

@Component({
  selector: 'app-sport-tracker-page',
  imports: [WorkoutForm, WorkoutList],
  templateUrl: './sport-tracker-page.html',
  styleUrl: './sport-tracker-page.css',
})
export class SportTrackerPage {
  private readonly workoutService = inject(WorkoutService);

  readonly workouts = this.workoutService.workouts;
  readonly singleWorkout = this.workoutService.singleWorkout;
  readonly loading = this.workoutService.isLoading;
  readonly error = this.workoutService.error;

  load(): void {
    this.workoutService.loadAll().subscribe();
  }

  create(workout: NewWorkout): void {
    this.workoutService.create(workout).subscribe();
  }

  update(workout: Workout): void {
    this.workoutService.update(workout).subscribe();
  }

  delete(id: string): void {
    this.workoutService.delete(id).subscribe();
  }

  startUpdate(id: string): void {
    this.workoutService.loadSingle(id).subscribe();
  }

  cancel(): void {
    this.workoutService.cancelEdit();
  }
}
