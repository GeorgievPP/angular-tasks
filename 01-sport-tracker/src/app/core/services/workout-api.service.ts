import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, } from 'rxjs';

import { NewWorkout, Workout } from '../../models';
import { API_BASE_URL } from '../constants/api.config';

@Injectable({
  providedIn: 'root',
})
export class WorkoutApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_BASE_URL;

  getAll(): Observable<Workout[]> {
    return this.http.get<Record<string, Workout>>(this.apiUrl).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Failed to load workouts!');
        }
        const data = Object.values(res).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        return data;
      }),
    );
  }

  getAllDesc(): Observable<Workout[]> {
    return this.http.get<Record<string, Workout>>(this.apiUrl).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Failed to load workouts!');
        }
        const data = Object.values(res).sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        return data;
      }),
    );
  }

  getSingle(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/${id}`).pipe(
      map((res) => {
        if (!res) {
          throw new Error(`Failed to load workout with ${id}!`);
        }

        return res;
      }),
    );
  }

  create(workout: NewWorkout): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Failed to create workout');
        }

        return res;
      }),
    );
  }

  update(id: string, workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${this.apiUrl}/${id}`, workout).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Failed to update workout');
        }

        return res;
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
