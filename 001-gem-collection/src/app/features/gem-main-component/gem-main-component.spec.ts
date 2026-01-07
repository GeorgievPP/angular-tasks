import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemMainComponent } from './gem-main-component';

describe('GemMainComponent', () => {
  let component: GemMainComponent;
  let fixture: ComponentFixture<GemMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GemMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
