import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { OrederApiService } from './order-api.service';

import { NewOrder, Order } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class OrderStoreService {
  private api = inject(OrederApiService);

  private readonly ordersSubject = new BehaviorSubject<Order[]>([]);
  readonly orders$ = this.ordersSubject.asObservable();

  private readonly editingOrderSubject = new BehaviorSubject<Order | null>(null);
  readonly editingOrder$ = this.editingOrderSubject.asObservable();

  loadOrders(): Observable<Order[]> {
    return this.api.load().pipe(
      tap((orders) => this.ordersSubject.next(orders))
    );
  }

  createOrder(order: NewOrder): Observable<Order> {
    return this.api.create(order).pipe(
      tap((newOrder) => {
        const orders = this.ordersSubject.value;
        this.ordersSubject.next([...orders, newOrder]);
      })
    );
  }

  // Remove from list while editing to avoid duplicate rendering in the UI
  startEdit(id: string): void {
    const found = this.ordersSubject.value.find((o) => o._id === id);
    if (!found) return;

    const newList = this.ordersSubject.value.filter((o) => o._id !== id);
    this.ordersSubject.next(newList);

    this.editingOrderSubject.next(found);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.api.update(order).pipe(
      tap((updated) => {
        const list = this.ordersSubject.value;
        this.ordersSubject.next([...list, updated]);

        this.editingOrderSubject.next(null);
      })
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.api.delete(id).pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.filter((o) => o._id !== id);
        this.ordersSubject.next(updatedOrders);
      })
    );
  }
}

