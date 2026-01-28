import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportTrackerPage } from './sport-tracker-page';

describe('SportTrackerPage', () => {
  let component: SportTrackerPage;
  let fixture: ComponentFixture<SportTrackerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportTrackerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
