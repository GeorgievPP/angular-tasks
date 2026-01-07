import { Component, inject } from '@angular/core';

import { GemService } from '../../core/services';

import { Gem } from '../../models';

import { GemForm } from '../components/gem-form/gem-form';
import { GemListPreview } from '../components/gem-list-preview/gem-list-preview';
import { GemListCollection } from "../components/gem-list-collection/gem-list-collection";

@Component({
  selector: 'app-gem-main-component',
  imports: [GemForm, GemListPreview, GemListPreview, GemListCollection],
  templateUrl: './gem-main-component.html',
  styleUrl: './gem-main-component.css',
})
export class GemMainComponent {
private readonly gemService: GemService = inject(GemService);

  readonly previewGems = this.gemService.previewGems;
  readonly collectionGems = this.gemService.collectionGems;
  readonly editingGem = this.gemService.editingGem;

  addGem(gem: Gem): void {
    this.gemService.add(gem);
  }

  editGem(id: number): void {
    this.gemService.edit(id);
  }

  moveGem(id: number): void {
    this.gemService.move(id);
  }

  removeGem(id: number): void {
    this.gemService.remove(id);
  }
}
