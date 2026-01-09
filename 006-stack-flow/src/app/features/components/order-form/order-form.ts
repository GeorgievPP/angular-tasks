import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from '../../../core/services/order-form.service';

import { NewOrder, Order } from '../../../models';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderForm {
  private readonly formService: FormService = inject(FormService);
  formGroup: FormGroup = this.formService.createForm();

  @Input() editingOrder: Order | null = null;

  @Output() createOrder = new EventEmitter<NewOrder>();
  @Output() updateOrder = new EventEmitter<Order>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingOrder']) {
      if (this.editingOrder) {
        this.formGroup.patchValue({
          name: this.editingOrder.name,
          quantity: this.editingOrder.quantity,
          date: this.editingOrder.date,
        });
      } else {
        this.formGroup.reset();
      }
    }
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    const { name, quantity, date } = this.formGroup.value;

    if (this.editingOrder) {
      const payload: Order = {
        ...this.editingOrder,
        name,
        quantity,
        date,
      };

      this.updateOrder.emit(payload);
    } else {
      const payload: NewOrder = {
        name,
        quantity,
        date,
      };

      this.createOrder.emit(payload);
    }

    this.formGroup.reset();
  }
}
