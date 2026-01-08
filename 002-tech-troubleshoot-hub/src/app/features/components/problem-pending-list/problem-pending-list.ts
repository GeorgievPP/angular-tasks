import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Problem } from '../../../models';

@Component({
  selector: 'app-problem-pending-list',
  imports: [],
  templateUrl: './problem-pending-list.html',
  styleUrl: './problem-pending-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemPendingList {
  problems = input<Problem[]>([]);
  resolveRequest = output<number>();

  resolve(id: number) {
    this.resolveRequest.emit(id);
  }
}
