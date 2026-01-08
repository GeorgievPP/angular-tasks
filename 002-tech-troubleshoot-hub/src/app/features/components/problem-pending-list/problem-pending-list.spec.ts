import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPendingList } from './problem-pending-list';

describe('ProblemPendingList', () => {
  let component: ProblemPendingList;
  let fixture: ComponentFixture<ProblemPendingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemPendingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemPendingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
