import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Gem } from '../../../models';

@Component({
  selector: 'app-gem-list-preview',
  imports: [DecimalPipe],
  templateUrl: './gem-list-preview.html',
  styleUrl: './gem-list-preview.css',
})
export class GemListPreview {
  gems = input<Gem[]>([]);
  saveRequest = output<number>();
  editRequest = output<number>();
  cancelRequest = output<number>();

  save(id: number) {
    this.saveRequest.emit(id);
  }

  edit(id: number) {
    this.editRequest.emit(id);
  }

  cancel(id: number) {
    this.cancelRequest.emit(id);
  }
}
