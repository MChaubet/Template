import { createReducer, on } from '@ngrx/store';
import { clearShoppingCart, loadShoppingCart, addArticleInCart, removeArticleInCart } from './shopping-action';
import { ShoppingCart } from 'app/models/shopping-cart.model';
import { Article, ArticleQty } from 'app/models/article.model';

const initialState: ShoppingCart = new ShoppingCart([]);

export const shoppingFeatureKey = 'shopping';

export const shoppingReducer = createReducer(
  initialState,
  on(clearShoppingCart, () => new ShoppingCart([])),
  on(loadShoppingCart, (_, o: ShoppingCart) => o),
  on(addArticleInCart, (state, o: Article) => {
    const articles = state.articles;

    if (articles.filter(article => article.article.id === o.id).length) {
      return {
        articles: articles.map(article => ({
          article: article.article,
          quantity: article.quantity,
            // + (article.article.id === o.id ? 1 : 0),
        })),
      };
    } else {
      return { articles: [...state.articles, new ArticleQty(o, 1)] };
    }
  }),
  on(removeArticleInCart, (state, o: Article) => {
    const articles = state.articles;
    if (!articles.filter(article => article.article.id === o.id).length) {
      return state;
    }

    return {
      articles: articles
        .filter(article => article.article.id !== o.id || article.quantity !== 1)
        .map(article => ({
          article: article.article,
          quantity: article.quantity - (article.article.id === o.id ? 1 : 0),
        })),
    };
  })
);
