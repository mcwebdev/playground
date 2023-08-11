import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgrxDashboardComponent } from './ngrx-dashboard/ngrx-dashboard.component';
import { CounterComponent } from 'src/app/features/counter/components/counter.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NgrxDashboardComponent,
    CounterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
