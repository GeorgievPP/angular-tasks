import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProblemStoreService } from '../../core/services/problem-store.service';

import { Problem } from '../../models';

import { HubHeader } from '../components/hub-header/hub-header';
import { ProblemForm } from '../components/problem-form/problem-form';
import { ProblemPreviewList } from '../components/problem-preview-list/problem-preview-list';
import { ProblemPendingList } from '../components/problem-pending-list/problem-pending-list';
import { ProblemResolvedList } from '../components/problem-resolved-list/problem-resolved-list';

@Component({
  selector: 'app-tech-troubleshoot-hub',
  imports: [HubHeader, ProblemForm, ProblemPreviewList, ProblemPendingList, ProblemResolvedList],
  templateUrl: './tech-troubleshoot-hub.html',
  styleUrl: './tech-troubleshoot-hub.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechTroubleshootHub {
  private readonly problemService: ProblemStoreService = inject(ProblemStoreService);

  readonly previewProblems = this.problemService.previewProblems;
  readonly pendingProblems = this.problemService.pendingProblems;
  readonly resolvedProblems = this.problemService.resolvedProblems;
  readonly editingProblem = this.problemService.editingProblem;

  addOrUpdateProblem(problem: Problem) {
    this.problemService.addOrUpdateProblem(problem);
  }

  startEdit(id: number): void {
    this.problemService.startEdit(id);
  }

  moveToPending(id: number): void {
    this.problemService.moveToPending(id);
  }

  moveToResolved(id: number): void {
    this.problemService.moveToResolved(id);
  }

  clearFromResolved(id: number): void {
    this.problemService.clearFromResolved(id);
  }
}
