import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'jhi-shopping-breadcrumb',
  templateUrl: './shopping-breadcrumb.component.html',
  styleUrls: ['./shopping-breadcrumb.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('rotated => default', animate('150ms')),
      transition('default => rotated', animate('150ms'))
    ])
  ],
})
export class ShoppingBreadcrumbComponent {

  isFilterChoicesOpen = false;
  filters = ["Pertinence", "Prix croissant", "Prix décroissant", "Meilleures notes"];
  activeFilter = 0;
  activeFilterName = "Pertinence";

  arrowState = 'default';

  constructor() {
  }

  toggleFilterChoices(): void {
    this.isFilterChoicesOpen = !this.isFilterChoicesOpen;
    this.arrowState = (this.arrowState === 'default' ? 'rotated' : 'default');
  }

  selectFilter(filter: number): void {
    this.activeFilter = filter;
    this.activeFilterName = this.filters[filter];
    this.isFilterChoicesOpen = false;
    this.arrowState = 'default';
  }
}
