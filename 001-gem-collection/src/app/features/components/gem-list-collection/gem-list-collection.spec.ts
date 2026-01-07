import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemListCollection } from './gem-list-collection';

describe('GemListCollection', () => {
  let component: GemListCollection;
  let fixture: ComponentFixture<GemListCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GemListCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemListCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
