import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'app/modules/shopping/model/article.model';
import { Subscription } from 'rxjs';
import { getShopping, getShoppingCartPrice } from 'app/modules/shopping/store/shopping-selector';

@Component({
  selector: 'jhi-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnDestroy {
  shoppingCart: Article[] = [];
  shoppingCartPrice = 0;
  shoppingCartSub: Subscription;
  shoppingCartPriceSub: Subscription;

  constructor(private store: Store) {
    this.shoppingCartSub = this.store.select(getShopping).subscribe({
      next: res => (this.shoppingCart = res.articles),
    });
    this.shoppingCartPriceSub = this.store.select(getShoppingCartPrice).subscribe({
      next: res => (this.shoppingCartPrice = res ?? 0),
    });
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
    this.shoppingCartPriceSub.unsubscribe();
  }
}
