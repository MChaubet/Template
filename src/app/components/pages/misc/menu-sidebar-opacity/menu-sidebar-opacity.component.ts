import { Component } from '@angular/core';

@Component({
  selector: 'jhi-menu-sidebar-opacity',
  templateUrl: './menu-sidebar-opacity.component.html',
  styleUrls: ['./menu-sidebar-opacity.component.scss']
})
// composant test, à ignorer
export class MenuSidebarOpacityComponent {
  isMenuOpened = false;

  constructor() { }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
