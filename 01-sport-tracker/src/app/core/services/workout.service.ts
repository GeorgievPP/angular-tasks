import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { NewWorkout, Workout } from '../../models';

import { WorkoutApiService } from './workout-api.service';
import { WorkoutStoreService } from './workout-store.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  // ==========================================
  // DEPENDENCIES
  // ==========================================
  private readonly api = inject(WorkoutApiService);
  private readonly store = inject(WorkoutStoreService);

  // ==========================================
  // LOADING & ERROR STATES
  // ==========================================
  private readonly _isLoading = signal(false);
  readonly isLoading = computed(() => this._isLoading());

  private readonly _isLoadingSingle = signal(false);
  readonly isLoadingSingle = computed(() => this._isLoadingSingle());

  private readonly _isOperating = signal(false);
  readonly isOperating = computed(() => this._isOperating());

  private readonly _error = signal<string | null>(null);
  readonly error = computed(() => this._error());

  private readonly _lastOperationSuccess = signal(false);
  readonly lastOperationSuccess = computed(() => this._lastOperationSuccess());

  // ==========================================
  // EXPOSE STORE PROPERTIES
  // ==========================================
  readonly workouts = this.store.workouts;
  readonly singleWorkout = this.store.singleWorkout;
  readonly totalWorkouts = this.store.totalWorkouts;
  readonly isEmpty = this.store.isEmpty;
  readonly hasSingleEvent = this.store.hasSingleEvent;

  // ==========================================
  // LOAD OPERATIONS
  // ==========================================
  loadAll(): Observable<Workout[]> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.api.getAll().pipe(
      tap((workouts) => {
        this.store.setWorkouts(workouts);
        console.log(`[WorkoutService] Loaded ${workouts.length} workouts`);
      }),
      catchError((error) => {
        const errorMessage = this.extractErrorMessage(error);
        this._error.set(errorMessage);
        console.error('[WorkoutService] Load all failed:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._isLoading.set(false);
      }),
    );
  }

  loadSingle(id: string): Observable<Workout> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.api.getSingle(id).pipe(
      tap((workout) => {
        this.store.setSingleWorkout(workout);
        console.log(`[WorkoutService] Loaded ${workout.workout} workout`);
      }),
      catchError((error) => {
        const errorMessage = this.extractErrorMessage(error);
        this._error.set(errorMessage);
        console.error('[WorkoutService] Load all failed:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._isLoading.set(false);
      }),
    );
  }

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  create(workout: NewWorkout): Observable<Workout> {
    this._isOperating.set(true);
    this._error.set(null);
    this._lastOperationSuccess.set(false);

    return this.api.create(workout).pipe(
      tap((newWorkout) => {
        this.store.createWorkout(newWorkout);
        this._lastOperationSuccess.set(true);
        console.log(`[WorkoutService] Workout created: ${newWorkout.workout}`);
      }),
      catchError((error) => {
        const errorMessage = this.extractErrorMessage(error);
        this._error.set(errorMessage);
        console.error('[WorkoutService] Create failed:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._isOperating.set(false);
      }),
    );
  }

  update(workout: Workout): Observable<Workout> {
    this._isOperating.set(true);
    this._error.set(null);
    this._lastOperationSuccess.set(false);

    return this.api.update(workout._id, workout).pipe(
      tap((updatedWorkout) => {
        this.store.updateWorkout(updatedWorkout);
        this._lastOperationSuccess.set(true);
        console.log(`[WorkoutService] Workout updated: ${updatedWorkout.workout}`);
      }),
      catchError((error) => {
        const errorMessage = this.extractErrorMessage(error);
        this._error.set(errorMessage);
        console.error('[WorkoutService] Update failed:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._isOperating.set(false);
      }),
    );
  }

  delete(id: string): Observable<void> {
    this._isOperating.set(true);
    this._error.set(null);
    this._lastOperationSuccess.set(false);

    return this.api.delete(id).pipe(
      tap(() => {
        this.store.deleteWorkout(id);

        this._lastOperationSuccess.set(true);
        console.log(`[WorkoutService] Workout deleted: ${id}`);
      }),
      catchError((error) => {
        const errorMessage = this.extractErrorMessage(error);
        this._error.set(errorMessage);
        console.error('[WorkoutService] Delete failed:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._isOperating.set(false);
      }),
    );
  }

  // ============================

  cancelEdit(): void {
    this.store.cancelEdit();
  }

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================
  private extractErrorMessage(error: any): string {
    if (error?.message && !error.message.startsWith('Http failure')) {
      return error.message;
    }

    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.status) {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'Unauthorized. Please login.';
        case 403:
          return 'Access forbidden.';
        case 404:
          return 'Event not found.';
        case 409:
          return 'Conflict. Event may already exist.';
        case 500:
          return 'Server error. Please try again later.';
        case 0:
          return 'Cannot connect to server. Check your internet connection.';
        default:
          return error.statusText || 'An unexpected error occurred.';
      }
    }

    return 'An unexpected error occurred. Please try again.';
  }
}
