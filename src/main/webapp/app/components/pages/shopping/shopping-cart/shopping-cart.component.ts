import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArticleQty } from 'app/models/article.model';
import { Subscription } from 'rxjs';
import { getShopping, getShoppingCartPrice } from 'app/components/pages/shopping/store/shopping-selector';
import { addArticleInCart, clearShoppingCart, removeArticleInCart } from 'app/components/pages/shopping/store/shopping-action';

@Component({
  selector: 'jhi-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnDestroy {
  shoppingCart: ArticleQty[] = [];
  shoppingCartPrice = 0;
  shoppingCartSub: Subscription;
  shoppingCartPriceSub: Subscription;

  constructor(private store: Store) {
    this.shoppingCartSub = this.store.select(getShopping).subscribe({
      next: res => (this.shoppingCart = res.articles),
    });
    this.shoppingCartPriceSub = this.store.select(getShoppingCartPrice).subscribe({
      next: res => (this.shoppingCartPrice = res),
    });
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
    this.shoppingCartPriceSub.unsubscribe();
  }

  submit(): void {
    this.store.dispatch(clearShoppingCart());
  }

  removeArticle(item: ArticleQty): void {
    this.store.dispatch(removeArticleInCart(item.article));
  }

  addArticle(item: ArticleQty): void {
    this.store.dispatch(addArticleInCart(item.article));
  }
}
