import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addArticleInCart } from 'app/modules/shopping/store/shopping-action';
import { Subscription } from 'rxjs';
import { getShopping } from 'app/modules/shopping/store/shopping-selector';
import { Article } from 'app/modules/shopping/model/article.model';

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnDestroy {
  description = '';
  articles: Article[] = [];
  currentRate = 3;

  shoppingCart: Article[] = [];
  shoppingCartSub: Subscription;

  constructor(private store: Store) {
    this.description = 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.';

    this.articles.push(new Article('Name', this.description, 'content/images/book.svg', 2, 10));
    this.articles.push(new Article('Name', this.description, 'content/images/book.svg', 2, 20));
    this.articles.push(new Article('Name', this.description, 'content/images/book.svg', 2, 30));
    this.articles.push(new Article('Name', this.description, 'content/images/book.svg', 2, 40));
    this.articles.push(new Article('Name', this.description, 'content/images/book.svg', 2, 50));

    this.shoppingCartSub = this.store.select(getShopping).subscribe({
      next: res => (this.shoppingCart = res.articles),
    });
  }

  addArticle(article: Article): void {
    this.store.dispatch(addArticleInCart(article));
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
  }
}
