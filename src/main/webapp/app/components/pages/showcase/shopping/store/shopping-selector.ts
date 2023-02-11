import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shoppingFeatureKey } from './shopping-reducer';
import { ShoppingCart } from 'app/models/shopping-cart.model';

export const getShoppingState = createFeatureSelector<ShoppingCart>(shoppingFeatureKey);

export const getShopping = createSelector(getShoppingState, state => state);
export const getShoppingCartPrice = createSelector(getShoppingState, state => {
  if (state.articles.length) {
    return state.articles.map(elem => elem.article.price * elem.quantity).reduce((prev, curr) => prev + curr);
  } else {
    return 0;
  }
});
