import { Injectable, signal, WritableSignal } from '@angular/core';

import { Problem } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProblemStoreService {
  private readonly _previewProblems: WritableSignal<Problem[]> = signal<Problem[]>([]);
  private readonly _pendingProblems: WritableSignal<Problem[]> = signal<Problem[]>([]);
  private readonly _resolvedProblems: WritableSignal<Problem[]> = signal<Problem[]>([]);
  private readonly _editingProblem: WritableSignal<Problem | null> = signal<Problem | null>(null);

  private nextId: number = 1;

  previewProblems = this._previewProblems.asReadonly();
  pendingProblems = this._pendingProblems.asReadonly();
  resolvedProblems = this._resolvedProblems.asReadonly();
  editingProblem = this._editingProblem.asReadonly();

  addOrUpdateProblem(problem: Problem): void {
    const id = problem.id === -1 ? this.nextId++ : problem.id;
    const payload = { ...problem, id };

    this._previewProblems.update((list) => [...list, payload]);
    this._editingProblem.set(null);
  }

  startEdit(id: number): void {
    const problem = this._previewProblems().find((p) => p.id === id);
    if (!problem) return;

    this._previewProblems.update((list) => list.filter((p) => p.id !== id));
    this._editingProblem.set({ ...problem });
  }

  moveToPending(id: number): void {
    const problem = this._previewProblems().find((p) => p.id === id);
    if (!problem) return;

    this._previewProblems.update((list) => list.filter((p) => p.id !== id));
    this._pendingProblems.update((list) => [...list, problem]);
  }

  moveToResolved(id: number): void {
    const problem = this._pendingProblems().find((p) => p.id === id);
    if (!problem) return;

    this._pendingProblems.update((list) => list.filter((p) => p.id !== id));
    this._resolvedProblems.update((list) => [...list, problem]);
  }

  clearFromResolved(id: number): void {
    this._resolvedProblems.update((list) => list.filter((p) => p.id !== id));
  }
}