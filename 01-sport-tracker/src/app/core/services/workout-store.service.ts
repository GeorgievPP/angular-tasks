import { computed, Injectable, signal, WritableSignal } from '@angular/core';

import { Workout } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class WorkoutStoreService {
  // ==========================================
  // PRIVATE STATE
  // ==========================================
  private readonly _workouts: WritableSignal<Workout[]> = signal<Workout[]>([]);
  private readonly _singleWorkout = signal<Workout | null>(null);

  // ==========================================
  // PUBLIC COMPUTED PROPERTIES
  // ==========================================
  readonly workouts = computed(() => this._workouts());
  readonly singleWorkout = computed(() => this._singleWorkout());
  readonly totalWorkouts = computed(() => this._workouts().length);
  readonly isEmpty = computed(() => this._workouts().length === 0);
  readonly hasSingleEvent = computed(() => this._singleWorkout() !== null);

  // ==========================================
  // PUBLIC STATE MUTATION METHODS
  // ==========================================
  setWorkouts(workouts: Workout[]): void {
    this._workouts.set(workouts);
    console.log(`[WorkoutStore] Workouts set: ${workouts.length} workouts`);
  }

  setSingleWorkout(workout: Workout): void {
    this._singleWorkout.set(workout);
    this.startEdit(workout._id)
  }

  createWorkout(workout: Workout): void {
    this._workouts.update((workouts) => [...workouts, workout]);
    console.log(`[WorkoutStore] Workout added: ${workout.workout} (ID: ${workout._id})`);
  }

  updateWorkout(updatedWorkout: Workout): void {
    this._workouts.update((workouts) => {
      console.log(`[WorkoutStore] Workout updated in list: ${updatedWorkout.workout}`);
      return [...workouts, updatedWorkout];
    });
  }

  deleteWorkout(id: string): void {
    this._workouts.update((workouts) => workouts.filter((w) => w._id !== id));
    console.log(`[WorkoutStore] Workout removed: (ID: ${id})`);
  }

  startEdit(id: string): Workout  | null{
    const workout = this.getWorkoutById(id);
    this._workouts.update((workouts) => workouts.filter((w) => w._id !== id));

    return workout;
  }

  cancelEdit(): void {
    const workout = this._singleWorkout();
    if (workout) {
        this._workouts.update((workouts) => [...workouts, workout]);
    }
  }

  // ==========================================
  // PUBLIC QUERY METHODS
  // ==========================================
  getWorkoutById(id: string): Workout | null {
    return this._workouts().find((w) => w._id === id) ?? null;
  }
}