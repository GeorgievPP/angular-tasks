import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Problem } from '../../../models';

@Component({
  selector: 'app-problem-preview-list',
  imports: [],
  templateUrl: './problem-preview-list.html',
  styleUrl: './problem-preview-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemPreviewList {
  problems = input<Problem[]>([]);
  editRequest = output<number>();
  continueRequest = output<number>();

  edit(id: number) {
    this.editRequest.emit(id);
  }

  continue(id: number) {
    this.continueRequest.emit(id);
  }
}
