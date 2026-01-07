import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from '../../../core/services';
import { Gem } from '../../../models';

@Component({
  selector: 'app-gem-form',
  imports: [ReactiveFormsModule],
  templateUrl: './gem-form.html',
  styleUrl: './gem-form.css',
})
export class GemForm {
  private formService: FormService = inject(FormService);
  formGroup: FormGroup = this.formService.createForm();

  currGem: InputSignal<Gem | null> = input<Gem | null>(null);
  submitGem: OutputEmitterRef<Gem> = output<Gem>();

  private id: number = -1;
  gemType: string[] = this.formService.gemTypes;

  private _syncEffect = effect(() => {
    const gem = this.currGem();

    if (gem) {
      this.id = gem.id ?? -1;
      this.formGroup.patchValue({
        name: gem.name,
        color: gem.color,
        carats: gem.carats,
        price: gem.price,
        type: gem.type,
      });
    } else {
      this.formGroup.reset();
    }
  });

  submit(): void {
    if (this.formGroup.valid) {
      const { name, color, carats, price, type } = this.formGroup.value;
      const payload = {
        id: this.id,
        name,
        color,
        carats,
        price,
        type,
      };

      this.submitGem.emit(payload);
      this.formGroup.reset();
    }
  }
}
