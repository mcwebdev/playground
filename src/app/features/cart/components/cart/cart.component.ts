import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromProduct from '../../selectors/selector';
import * as ProductActions from '../../actions/actions';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$ = this.store.select(fromProduct.selectCart);
  totalPrice$ = this.store.select(fromProduct.selectTotalPrice);

  constructor(private store: Store) { }
  onRemoveFromCart(product: any) {
    this.store.dispatch(ProductActions.removeProductFromCart({ product }));
  }
}
