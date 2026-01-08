import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from '../../../core/services/problem-form.service';
import { Problem } from '../../../models';

@Component({
  selector: 'app-problem-form',
  imports: [ReactiveFormsModule],
  templateUrl: './problem-form.html',
  styleUrl: './problem-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemForm {
  currProblem = input<Problem | null>(null);

  private formService = inject(FormService);
  formGroup: FormGroup = this.formService.createForm();

  private _syncEffect = effect(() => {
    const problem = this.currProblem();

    if (problem) {
      this.id = problem.id ?? -1;
      this.formGroup.patchValue({
        employee: problem.employee,
        category: problem.category,
        urgency: problem.urgency,
        team: problem.team,
        description: problem.description,
      });
    } else {
      this.formGroup.reset();
    }
  });

  submitProblem = output<Problem>();

  id: number = -1;

  categories = this.formService.categories;
  urgencies = this.formService.urgencies;
  teams = this.formService.teams;

  submit() {
    if (this.formGroup.valid) {
      const { employee, category, urgency, team, description } = this.formGroup.value;
      const payload: Problem = {
        id: this.id,
        employee,
        category,
        urgency,
        team,
        description,
      };

      this.submitProblem.emit(payload);
      this.formGroup.reset();
    }
  }
}
