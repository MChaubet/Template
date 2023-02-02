import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'jhi-shopping-filter-panel',
  templateUrl: './shopping-filter-panel.component.html',
  styleUrls: ['./shopping-filter-panel.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('rotated => default', animate('150ms')),
      transition('default => rotated', animate('150ms'))
    ])
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
