import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../../../models/shopping/article.model";
import {ShoppingService} from "../../../../../services/showcase/shopping.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Component({
  selector: 'jhi-shopping-articles',
  templateUrl: './shopping-articles.component.html',
  styleUrls: ['./shopping-articles.component.scss']
})
export class ShoppingArticlesComponent implements OnInit {

  @BlockUI('articles-spinner') articlesSpinner!: NgBlockUI;
  @Input() articles!: Article[];

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.shoppingService.spinnerSubject.subscribe((value) => {
      if (value) {
        this.startSpinner();
      } else {
        this.stopSpinner();
      }
    });
  }

  startSpinner(): void {
    this.articlesSpinner.start();
  }

  stopSpinner(): void {
    this.articlesSpinner.stop();
  }
}
