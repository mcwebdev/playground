import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionDashboardComponent } from './change-detection-dashboard.component';

describe('ChangeDetectionDashboardComponent', () => {
  let component: ChangeDetectionDashboardComponent;
  let fixture: ComponentFixture<ChangeDetectionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeDetectionDashboardComponent]
    });
    fixture = TestBed.createComponent(ChangeDetectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
