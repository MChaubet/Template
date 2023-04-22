import {Component, Input} from '@angular/core';
import {rotate} from "../../../../../animations/animations";
import {ShoppingService} from "../../../../../services/showcase/shopping.service";

@Component({
  selector: 'jhi-shopping-breadcrumb',
  templateUrl: './shopping-breadcrumb.component.html',
  styleUrls: ['./shopping-breadcrumb.component.scss'],
  animations: [
    rotate
  ]
})
export class ShoppingBreadcrumbComponent {

  @Input() articleCount = 0;

  sortList = ["Pertinence", "Prix croissant", "Prix décroissant", "Meilleures notes"];
  activeSort = 0;

  arrowState = 'default';

  constructor(private shoppingService: ShoppingService) {
  }

  onSortChange(index: number): void {
    this.activeSort = index;
    this.shoppingService.sortSubject.next(this.sortList[this.activeSort]);
  }

  openEvent($event: boolean): void {
    this.arrowState = $event ? 'rotated' : 'default';
  }
}
