import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Order } from '../../../models';

@Component({
  selector: 'app-order-list',
  imports: [],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  private _orders: Order[] = [];

  @Input() set orders(value: Order[] | null) {
    this._orders = value ?? [];
  }

  get orders(): Order[] {
    return this._orders;
  }

  @Output() loadRequest = new EventEmitter<void>();
  @Output() deleteRequest = new EventEmitter<string>();
  @Output() editRequest = new EventEmitter<string>();

  load(): void {
    this.loadRequest.emit();
  }

  delete(id: string): void {
    this.deleteRequest.emit(id);
  }

  edit(id: string): void {
    this.editRequest.emit(id);
  }
}
