import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../actions/actions';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    { name: 'Apple', price: 1, imageUrl: '../../assets/apple.jpg' },
    { name: 'Orange', price: 2, imageUrl: '../../assets/orange.jfif' },
  ];
  productQuantity: { [key: string]: number } = {};
  constructor(private store: Store) { }

  onAddToCart(product: any, quantity: number) {
    this.store.dispatch(ProductActions.addProductToCart({ product, quantity }));
  }
}
