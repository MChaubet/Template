import { createReducer, on } from '@ngrx/store';
import { loadShoppingCart, addArticleInCart } from './shopping-action';
import { ShoppingCart } from 'app/modules/shopping/model/shopping-cart.model';
import { Article } from 'app/modules/shopping/model/article.model';

const initialState: ShoppingCart = new ShoppingCart([]);

export const shoppingFeatureKey = 'shopping';

export const shoppingReducer = createReducer(
  initialState,
  on(loadShoppingCart, (_, o: ShoppingCart) => o),
  on(addArticleInCart, (state, o: Article) => ({ articles: [...state.articles, o] }))
);
