import { createAction, props } from '@ngrx/store';

export const addProductToCart = createAction(
    '[Product] Add to Cart',
    props<{ product: { name: string; price: number; }, quantity: number }>()
);
export const removeProductFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ product: { name: string, price: number } }>()
);
