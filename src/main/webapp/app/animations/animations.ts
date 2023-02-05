import {animate, state, style, transition, trigger} from "@angular/animations";

export const rotate = [
  trigger('rotatedState', [
    state('default', style({transform: 'rotate(0)'})),
    state('rotated', style({transform: 'rotate(180deg)'})),
    transition('rotated => default', animate('150ms')),
    transition('default => rotated', animate('150ms'))
  ])
]