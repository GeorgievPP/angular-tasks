import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTroubleshootHub } from './tech-troubleshoot-hub';

describe('TechTroubleshootHub', () => {
  let component: TechTroubleshootHub;
  let fixture: ComponentFixture<TechTroubleshootHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechTroubleshootHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechTroubleshootHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
