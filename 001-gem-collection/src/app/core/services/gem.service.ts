import { Injectable, signal, WritableSignal } from '@angular/core';

import { Gem } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class GemService {
  private readonly _previewGems: WritableSignal<Gem[]> = signal<Gem[]>([]);
  private readonly _collectionGems: WritableSignal<Gem[]> = signal<Gem[]>([]);
  private readonly _editingGem: WritableSignal<Gem | null> = signal<Gem | null>(null);

  previewGems = this._previewGems.asReadonly();
  collectionGems = this._collectionGems.asReadonly();
  editingGem = this._editingGem.asReadonly();

  private nextId: number = 1;

  add(gem: Gem): void {
    const id = gem.id ? this.nextId++ : gem.id;
    const payload = { ...gem, id };

    this._previewGems.update((gems) => [...gems, payload]);
    this._editingGem.set(null);
  }

  edit(id: number): void {
    const gem = this._previewGems().find((g) => g.id === id);
    if (!gem) return;

    this._previewGems.update((list) => list.filter((g) => g.id !== id));
    this._editingGem.set(gem);
  }

  move(id: number): void {
    const gem = this._previewGems().find((g) => g.id === id);
    if (!gem) return;

    this._previewGems.update(list => list.filter(g => g.id !== id));
    this._collectionGems.update((gems) => [...gems, gem]);
  }

  remove(id: number): void {
    this._previewGems.update(list => list.filter(g => g.id !== id));
  }
}
