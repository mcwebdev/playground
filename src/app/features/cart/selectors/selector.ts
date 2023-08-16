import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/reducer';

export const selectProductFeature = createFeatureSelector<State>('product');

export const selectCart = createSelector(
    selectProductFeature,
    (state: State) => {
        return state ? state.cart : []; // Added a check for undefined state
    }
);

export const selectTotalPrice = createSelector(
    selectCart,
    (cart: { name: string, price: number, quantity: number }[]) => cart.reduce(
        (total, product) => total + product.price * product.quantity, 0)
);
