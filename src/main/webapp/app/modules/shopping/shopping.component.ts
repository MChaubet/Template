import { Component } from '@angular/core';
import { ShoppingModel } from 'app/modules/shopping/shopping.model';

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent {
  description = '';
  articles: ShoppingModel[] = [];
  currentRate = 3;

  constructor() {
    this.description = 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.';

    this.articles.push(new ShoppingModel('Name', this.description, 'content/images/book.svg', 2, 15));
    this.articles.push(new ShoppingModel('Name', this.description, 'content/images/book.svg', 2, 15));
    this.articles.push(new ShoppingModel('Name', this.description, 'content/images/book.svg', 2, 15));
    this.articles.push(new ShoppingModel('Name', this.description, 'content/images/book.svg', 2, 15));
    this.articles.push(new ShoppingModel('Name', this.description, 'content/images/book.svg', 2, 15));
  }
}
