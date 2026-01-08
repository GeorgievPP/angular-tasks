import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFlow } from './stack-flow';

describe('StackFlow', () => {
  let component: StackFlow;
  let fixture: ComponentFixture<StackFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
