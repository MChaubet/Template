import {Component, Input} from '@angular/core';
import {rotate} from "../../../../../../animations/animations";

@Component({
  selector: 'jhi-shopping-filter-panel',
  templateUrl: './shopping-filter-panel.component.html',
  styleUrls: ['./shopping-filter-panel.component.scss'],
  animations: [
    rotate
  ]
})
export class ShoppingFilterPanelComponent {
  @Input() title!: string;
  isOpen = false;
  arrowState = 'default';

  constructor() { }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
    this.arrowState = (this.arrowState === 'default' ? 'rotated' : 'default');
  }
}
