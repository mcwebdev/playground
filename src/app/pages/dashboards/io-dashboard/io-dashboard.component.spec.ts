import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoDashboardComponent } from './io-dashboard.component';

describe('IoDashboardComponent', () => {
  let component: IoDashboardComponent;
  let fixture: ComponentFixture<IoDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IoDashboardComponent]
    });
    fixture = TestBed.createComponent(IoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
