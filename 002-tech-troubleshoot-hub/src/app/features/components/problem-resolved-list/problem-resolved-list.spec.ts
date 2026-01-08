import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemResolvedList } from './problem-resolved-list';

describe('ProblemResolvedList', () => {
  let component: ProblemResolvedList;
  let fixture: ComponentFixture<ProblemResolvedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemResolvedList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemResolvedList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
