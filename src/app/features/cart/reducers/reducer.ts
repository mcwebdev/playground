import { createReducer, on } from "@ngrx/store";
import * as productActions from '../actions/actions';

export interface State {
    cart: { name: string, price: number, quantity: number }[];
}

export const initialState: State = {
    cart: [],
};

const _productReducer = createReducer(
    initialState,
    on(productActions.addProductToCart, (state, { product, quantity }) => {
        const existingProductIndex = state.cart.findIndex(p => p.name === product.name);
        if (existingProductIndex !== -1) {
            // Update the quantity
            const updatedProduct = {
                ...state.cart[existingProductIndex],
                quantity: state.cart[existingProductIndex].quantity + quantity
            };
            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, existingProductIndex),
                    updatedProduct,
                    ...state.cart.slice(existingProductIndex + 1),
                ],
            };
        } else {
            // Add a new entry
            return {
                ...state,
                cart: [...state.cart, { ...product, quantity }],
            };
        }
    }),
    on(productActions.removeProductFromCart, (state, { product }) => ({
        ...state,
        cart: state.cart.filter(item => item !== product),
    }))
);
export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}
