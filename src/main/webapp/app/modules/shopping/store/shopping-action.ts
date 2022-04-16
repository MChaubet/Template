import { createAction, props } from '@ngrx/store';
import { ShoppingCart } from 'app/modules/shopping/model/shopping-cart.model';
import { Article } from 'app/modules/shopping/model/article.model';

export const loadShoppingCart = createAction('Load shopping cart', props<ShoppingCart>());
export const addArticleInCart = createAction('Add article in cart', props<Article>());
