import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addArticleInCart } from 'app/components/pages/showcase/shopping/store/shopping-action';
import { Subscription } from 'rxjs';
import { getShopping, getShoppingCartPrice } from 'app/components/pages/showcase/shopping/store/shopping-selector';
import { Article, ArticleQty } from 'app/models/article.model';
import { ArticleModalComponent } from 'app/components/pages/showcase/shopping/article-modal-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnDestroy {
  imgBase = 'content/fontawesome/svgs/solid/';

  description = '';
  articles: Article[] = [];
  maxRate = 5;

  shoppingCart: ArticleQty[] = [];
  shoppingCartPrice = 0;
  shoppingCartQty = 0;
  shoppingCartSub: Subscription;
  shoppingCartPriceSub: Subscription;

  constructor(private store: Store, private modalService: NgbModal) {
    this.description =
      'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. ' +
      "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla " +
      "ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, " +
      "mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. " +
      'Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, ' +
      'plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.';

    this.articles = [
      new Article(1, 'T-shirt Sadidda', this.description, this.imgBase + 'shirt.svg', 3, 45),
      new Article(2, 'Chaussette Poule de France', this.description, this.imgBase + 'socks.svg', 3.7, 15),
      new Article(3, "Diplôme d'ingénieur", this.description, this.imgBase + 'graduation-cap.svg', 0.5, 1000),
      new Article(4, 'Disque dur 2To', this.description, this.imgBase + 'floppy-disk.svg', 5, 80),
      new Article(5, 'Lunette de soleil G&D', this.description, this.imgBase + 'glasses.svg', 2.8, 75),
      new Article(6, 'Gants divers', this.description, this.imgBase + 'mitten.svg', 4.3, 25),
      new Article(7, 'Sac Louis et Vuitton', this.description, this.imgBase + 'bag-shopping.svg', 2.3, 500),
      new Article(8, 'Guitare bois ébène', this.description, this.imgBase + 'guitar.svg', 4.3, 500),
      new Article(9, 'Haltère de musculation', this.description, this.imgBase + 'dumbbell.svg', 4.3, 500),
      new Article(10, 'T-shirt Sadidda', this.description, this.imgBase + 'shirt.svg', 3, 45),
      new Article(11, 'Chaussette Poule de France', this.description, this.imgBase + 'socks.svg', 3.7, 15),
      new Article(12, "Diplôme d'ingénieur", this.description, this.imgBase + 'graduation-cap.svg', 0.5, 1000),
      new Article(13, 'Disque dur 2To', this.description, this.imgBase + 'floppy-disk.svg', 5, 80),
      new Article(14, 'Lunette de soleil G&D', this.description, this.imgBase + 'glasses.svg', 2.8, 75),
      new Article(15, 'Gants divers', this.description, this.imgBase + 'mitten.svg', 4.3, 25),
      new Article(16, 'Sac Louis et Vuitton', this.description, this.imgBase + 'bag-shopping.svg', 2.3, 500),
      new Article(17, 'Guitare bois ébène', this.description, this.imgBase + 'guitar.svg', 4.3, 500),
      new Article(18, 'Haltère de musculation', this.description, this.imgBase + 'dumbbell.svg', 4.3, 500),
    ];

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
    const modalRef = this.modalService.open(ArticleModalComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.article = article;
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
    this.shoppingCartPriceSub.unsubscribe();
  }
}
