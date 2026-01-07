import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemListPreview } from './gem-list-preview';

describe('GemListPreview', () => {
  let component: GemListPreview;
  let fixture: ComponentFixture<GemListPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GemListPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemListPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
