import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Problem } from '../../../models';

@Component({
  selector: 'app-problem-resolved-list',
  imports: [],
  templateUrl: './problem-resolved-list.html',
  styleUrl: './problem-resolved-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemResolvedList {
  problems = input<Problem[]>([]);
  clearRequest = output<number>();

  clear(id: number) {
    this.clearRequest.emit(id);
  }
}
