import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPreviewList } from './problem-preview-list';

describe('ProblemPreviewList', () => {
  let component: ProblemPreviewList;
  let fixture: ComponentFixture<ProblemPreviewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemPreviewList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemPreviewList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
