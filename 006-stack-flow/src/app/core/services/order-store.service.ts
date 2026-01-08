import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';

import { NewOrder, Order } from '../../models';
import { API_BASE_URL } from '../constants/api.config';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  private readonly apiUrl = API_BASE_URL;

  private readonly ordersSubject = new BehaviorSubject<Order[]>([]);
  readonly orders$ = this.ordersSubject.asObservable();

  private readonly editingOrderSubject = new BehaviorSubject<Order | null>(null);
  readonly editingOrder$ = this.editingOrderSubject.asObservable();

  loadOrders(): Observable<Order[]> {
    return this.http.get<Record<string, Order>>(this.apiUrl).pipe(
      map((ordersObj) => Object.values(ordersObj)),
      tap((orders) => this.ordersSubject.next(orders)),
      catchError((err) => this.handleError(err, 'loadOrders'))
    );
  }

  createOrder(order: NewOrder): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap((newOrder) => {
        const orders = this.ordersSubject.value;
        this.ordersSubject.next([...orders, newOrder]);
      }),
      catchError((err) => this.handleError(err, 'createOrder'))
    );
  }

  startEdit(id: string): void {
    const found = this.ordersSubject.value.find((o) => o._id === id);
    if (!found) return;

    const newList = this.ordersSubject.value.filter((o) => o._id !== id);
    this.ordersSubject.next(newList);

    this.editingOrderSubject.next(found);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order._id}`, order).pipe(
      tap((updated) => {
        const list = this.ordersSubject.value;
        this.ordersSubject.next([...list, updated]);

        this.editingOrderSubject.next(null);
      }),
      catchError((err) => this.handleError(err, 'updateOrder'))
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.filter((o) => o._id !== id);
        this.ordersSubject.next(updatedOrders);
      }),
      catchError((err) => this.handleError(err, 'deleteOrder'))
    );
  }

  private handleError(error: HttpErrorResponse, context: string) {
    console.error(`[OrderService] Error in ${context}: `, error);
    return throwError(() => error);
  }
}
