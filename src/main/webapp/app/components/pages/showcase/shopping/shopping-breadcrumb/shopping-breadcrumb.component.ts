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

  // todo
  closeFilterChoices(): void {
    this.isFilterChoicesOpen = false;
    this.arrowState = 'default';
  }

  toggleFilterChoices(): void {
    this.isFilterChoicesOpen = !this.isFilterChoicesOpen;
    this.arrowState = (this.arrowState === 'default' ? 'rotated' : 'default');
  }

  selectFilter(filter: number): void {
    this.activeFilter = filter;
    this.isFilterChoicesOpen = false;
    this.arrowState = 'default';
  }
}
