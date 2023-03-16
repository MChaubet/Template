import {Component} from '@angular/core';
import {rotate} from "../../../../../animations/animations";

@Component({
  selector: 'jhi-shopping-breadcrumb',
  templateUrl: './shopping-breadcrumb.component.html',
  styleUrls: ['./shopping-breadcrumb.component.scss'],
  animations: [
    rotate
  ]
})
export class ShoppingBreadcrumbComponent {

  isFilterChoicesOpen = false;
  filters = ["Pertinence", "Prix croissant", "Prix décroissant", "Meilleures notes"];
  activeFilter = 0;

  arrowState = 'default';

  constructor() {
  }

  selectFilter(filter: number): void {
    this.activeFilter = filter;
    this.isFilterChoicesOpen = false;
    this.arrowState = 'default';
  }

  openEvent($event: boolean): void {
    this.arrowState = $event ? 'rotated' : 'default';
  }
}
