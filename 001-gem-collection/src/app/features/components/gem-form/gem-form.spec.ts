import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemForm } from './gem-form';

describe('GemForm', () => {
  let component: GemForm;
  let fixture: ComponentFixture<GemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
