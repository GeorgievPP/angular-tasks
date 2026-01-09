import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderStoreService } from '../../core/services/order-store.service';
import { Observable } from 'rxjs';
import { NewOrder, Order } from '../../models';
import { OrderForm } from '../components/order-form/order-form';
import { OrderList } from '../components/order-list/order-list';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stock-flow',
  imports: [OrderForm, OrderList, AsyncPipe],
  templateUrl: './stock-flow.html',
  styleUrl: './stock-flow.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockFlow {
  private readonly orderService = inject(OrderStoreService);

  readonly orders$: Observable<Order[]> = this.orderService.orders$;
  readonly editingOrder$: Observable<Order | null> = this.orderService.editingOrder$;

  load(): void {
    this.orderService.loadOrders().subscribe({
      error: (err) => console.error('Failed to load orders: ', err),
    });
  }

  create(order: NewOrder): void {
    this.orderService.createOrder(order).subscribe({
      error: (err) => console.error('Failed to create order: ', err),
    });
    // this.load();
  }

  startEdit(id: string): void {
    this.orderService.startEdit(id);
  }

  update(order: Order): void {
    this.orderService.updateOrder(order).subscribe({
      error: (err) => console.error('Failed to update order: ', err),
    });
  }

  delete(id: string): void {
    this.orderService.deleteOrder(id).subscribe({
      error: (err) => console.error('Failed to delete order: ', err),
    });
    // this.load();
  }
}
