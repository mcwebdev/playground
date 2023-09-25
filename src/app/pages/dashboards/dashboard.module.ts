import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgrxDashboardComponent } from './ngrx-dashboard/ngrx-dashboard.component';
import { CounterComponent } from 'src/app/features/counter/components/counter.component';
import { ProductsComponent } from 'src/app/features/cart/components/products/products.component';
import { CartComponent } from 'src/app/features/cart/components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { RxjsDashboardComponent } from './rxjs-dashboard/rxjs-dashboard.component';
import { ChangeDetectionDashboardComponent } from './change-detection-dashboard/change-detection-dashboard.component';
import { SignalsDashboardComponent } from './signals-dashboard/signals-dashboard.component';
import { ChildComponent } from './change-detection-dashboard/child/child.component';
import { IoDashboardComponent } from './io-dashboard/io-dashboard.component';
import { HighlightModule } from 'ngx-highlightjs';
import { PlaygroundComponent } from './playground/playground.component';
@NgModule({
  declarations: [
    DashboardComponent,
    NgrxDashboardComponent,
    CounterComponent,
    ProductsComponent,
    CartComponent,
    RxjsDashboardComponent,
    ChangeDetectionDashboardComponent,
    SignalsDashboardComponent,
    ChildComponent,
    IoDashboardComponent,
    PlaygroundComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    HighlightModule
  ]
})
export class DashboardModule { }
