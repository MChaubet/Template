import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addArticleInCart } from 'app/modules/shopping/store/shopping-action';
import { Subscription } from 'rxjs';
import { getShopping, getShoppingCartPrice } from 'app/modules/shopping/store/shopping-selector';
import { Article, ArticleQty } from 'app/modules/shopping/model/article.model';

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnDestroy {
  description = '';
  articles: Article[] = [];
  maxRate = 5;

  shoppingCart: ArticleQty[] = [];
  shoppingCartPrice = 0;
  shoppingCartQty = 0;
  shoppingCartSub: Subscription;
  shoppingCartPriceSub: Subscription;

  constructor(private store: Store) {
    this.description = 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.';

    this.articles.push(new Article(1, 'T-shirt Sadidda', this.description, 'content/fontawesome/svgs/solid/shirt.svg', 3, 45));
    this.articles.push(new Article(2, 'Chaussette Poule de France', this.description, 'content/fontawesome/svgs/solid/socks.svg', 3.7, 15));
    this.articles.push(
      new Article(3, "Diplôme d'ingénieur", this.description, 'content/fontawesome/svgs/solid/graduation-cap.svg', 0.5, 1000)
    );
    this.articles.push(new Article(4, 'Disque dur 2To', this.description, 'content/fontawesome/svgs/solid/floppy-disk.svg', 5, 80));
    this.articles.push(new Article(5, 'Lunette de soleil G&D', this.description, 'content/fontawesome/svgs/solid/glasses.svg', 2.8, 75));
    this.articles.push(new Article(6, 'Gand divers', this.description, 'content/fontawesome/svgs/solid/mitten.svg', 4.3, 25));
    this.articles.push(
      new Article(7, 'Sac Louis et Vuitton', this.description, 'content/fontawesome/svgs/solid/bag-shopping.svg', 2.3, 500)
    );

    this.shoppingCartSub = this.store.select(getShopping).subscribe({
      next: res => {
        this.shoppingCart = res.articles;
        this.shoppingCartQty = this.shoppingCart.map(article => article.quantity).reduce((prev, curr) => prev + curr, 0);
      },
    });
    this.shoppingCartPriceSub = this.store.select(getShoppingCartPrice).subscribe({
      next: res => (this.shoppingCartPrice = res),
    });
  }

  addArticle(article: Article): void {
    this.store.dispatch(addArticleInCart(article));
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
    this.shoppingCartPriceSub.unsubscribe();
  }
}
