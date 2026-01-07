import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Gem } from '../../../models';

@Component({
  selector: 'app-gem-list-collection',
  imports: [DecimalPipe],
  templateUrl: './gem-list-collection.html',
  styleUrl: './gem-list-collection.css',
})
export class GemListCollection {
  gems = input<Gem[]>([]);
}
