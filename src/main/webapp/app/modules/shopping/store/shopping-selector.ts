import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shoppingFeatureKey } from './shopping-reducer';
import { ShoppingCart } from 'app/modules/shopping/model/shopping-cart.model';

export const getShoppingState = createFeatureSelector<ShoppingCart>(shoppingFeatureKey);

export const getShopping = createSelector(getShoppingState, state => state);
export const getShoppingCartPrice = createSelector(getShoppingState, state => {
  if (state.articles.length) {
    return state.articles.map(elem => elem.price).reduce((prev, curr) => (prev ?? 0) + (curr ?? 0));
  } else {
    return 0;
  }
});
