import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { API_BASE_URL } from '../constants/api.config';

import { NewOrder, Order } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class OrederApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = API_BASE_URL;

  load(): Observable<Order[]> {
    return this.http.get<Record<string, Order>>(this.apiUrl).pipe(
      map((ordersObj) => Object.values(ordersObj)),
      catchError((err) => this.handleError(err, 'load'))
    );
  }

  create(order: NewOrder): Observable<Order> {
    return this.http
      .post<Order>(this.apiUrl, order)
      .pipe(catchError((err) => this.handleError(err, 'create')));
  }

  update(order: Order): Observable<Order> {
    return this.http
      .put<Order>(`${this.apiUrl}/${order._id}`, order)
      .pipe(catchError((err) => this.handleError(err, 'update')));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err, 'delete')));
  }

  private handleError(error: HttpErrorResponse, context: string) {
    console.error(`[OrderApiService] Error in ${context}: `, error);
    return throwError(() => error);
  }
}
