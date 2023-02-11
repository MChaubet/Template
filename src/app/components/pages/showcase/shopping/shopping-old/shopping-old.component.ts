import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article, ArticleQty} from "../../../../../models/article.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {getShopping, getShoppingCartPrice} from "../store/shopping-selector";
import {addArticleInCart} from "../store/shopping-action";
import {ArticleModalComponent} from "../article-modal-component";

@Component({
  selector: 'jhi-shopping-old',
  templateUrl: './shopping-old.component.html',
  styleUrls: ['./shopping-old.component.scss']
})
export class ShoppingOldComponent implements OnDestroy {

  imgBase = 'content/fontawesome/svgs/solid/';

  articles: Article[] = [];
  maxRate = 5;

  shoppingCart: ArticleQty[] = [];
  shoppingCartPrice = 0;
  shoppingCartQty = 0;
  shoppingCartSub: Subscription;
  shoppingCartPriceSub: Subscription;

  constructor(private store: Store, private modalService: NgbModal) {
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

  addArticle($event: MouseEvent, article: Article): void {
    this.store.dispatch(addArticleInCart(article));

    const plusButton = $event.target as Element;
    this.addButtonValidate(plusButton);
    setTimeout(() => this.removeButtonValidate(plusButton), 1000);
  }

  addButtonValidate(elem: Element): void {
    elem.classList.remove('btn-light');
    elem.classList.add('btn-success');
    elem.classList.remove('fa-plus');
    elem.classList.add('fa-check');
  }

  removeButtonValidate(elem: Element): void {
    elem.classList.add('btn-light');
    elem.classList.remove('btn-success');
    elem.classList.add('fa-plus');
    elem.classList.remove('fa-check');
  }

  open(article: Article): void {
    const modalRef = this.modalService.open(ArticleModalComponent, {centered: true, size: 'xl'});
    modalRef.componentInstance.article = article;
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
    this.shoppingCartPriceSub.unsubscribe();
  }

}
