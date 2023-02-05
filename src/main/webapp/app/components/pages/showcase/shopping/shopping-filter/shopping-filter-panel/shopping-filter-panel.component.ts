import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
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

  togglePanel() {
    this.isOpen = !this.isOpen;
    this.arrowState = (this.arrowState === 'default' ? 'rotated' : 'default');
  }

}
