import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubHeader } from './hub-header';

describe('HubHeader', () => {
  let component: HubHeader;
  let fixture: ComponentFixture<HubHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
