import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './reducers/reducer';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forFeature('product', productReducer) // Corrected line
  ]
})
export class CartModule { }
