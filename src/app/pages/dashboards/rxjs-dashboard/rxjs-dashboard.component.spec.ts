import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsDashboardComponent } from './rxjs-dashboard.component';

describe('RxjsDashboardComponent', () => {
  let component: RxjsDashboardComponent;
  let fixture: ComponentFixture<RxjsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxjsDashboardComponent]
    });
    fixture = TestBed.createComponent(RxjsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
