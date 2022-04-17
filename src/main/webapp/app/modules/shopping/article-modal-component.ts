import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { Article } from 'app/modules/shopping/model/article.model';
import { Store } from '@ngrx/store';
import { addArticleInCart } from 'app/modules/shopping/store/shopping-action';

@Component({
  template: `
    <div *ngIf="article">
      <div class="modal-header">
        <h3 class="modal-title">{{ article.name }}</h3>
        <button class="btn btn-sm btn-close btn-dark" aria-label="Close" (click)="activeModal.dismiss('Cross click')">X</button>
      </div>
      <div class="modal-body">
        <div class="media w-100">
          <img [src]="article.img" class="align-self-center p-3" width="400px" alt="article" />
          <div class="media-body p-3">
            <div class="d-flex justify-content-between">
              <h6 class="mt-0 pr-2">{{ article.desc }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer d-flex justify-content-end">
        <h5 class="pr-3" style="color: #3e8acc">{{ article.price }} €</h5>
        <button class="btn btn-info fa-solid fa-plus cursor" (click)="addArticle(article); activeModal.dismiss('Cross click')">
          Add to cart
        </button>
      </div>
    </div>
  `,
})
export class ArticleModalComponent {
  @Input() article?: Article;

  constructor(public activeModal: NgbActiveModal, private store: Store) {}

  addArticle(article: Article): void {
    this.store.dispatch(addArticleInCart(article));
  }
}
