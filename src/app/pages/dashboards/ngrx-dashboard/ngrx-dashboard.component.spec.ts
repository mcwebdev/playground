import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDashboardComponent } from './ngrx-dashboard.component';

describe('NgrxDashboardComponent', () => {
  let component: NgrxDashboardComponent;
  let fixture: ComponentFixture<NgrxDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxDashboardComponent]
    });
    fixture = TestBed.createComponent(NgrxDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
