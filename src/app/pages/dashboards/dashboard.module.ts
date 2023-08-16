import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgrxDashboardComponent } from './ngrx-dashboard/ngrx-dashboard.component';
import { CounterComponent } from 'src/app/features/counter/components/counter.component';
import { ProductsComponent } from 'src/app/features/cart/components/products/products.component';
import { CartComponent } from 'src/app/features/cart/components/cart/cart.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
    NgrxDashboardComponent,
    CounterComponent,
    ProductsComponent,
    CartComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
