import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'jhi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('100ms', style({ opacity: 0 }))]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '400ms',
          keyframes([style({ transform: 'rotate(0deg)', offset: '0' }), style({ transform: 'rotate(1turn)', offset: '1' })])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() toggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  openButtonStyle: 'background: #fff' | 'background: #eef' = 'background: #fff';

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.toggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.openButtonStyle = 'background: #fff';
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.toggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.openButtonStyle = 'background: #eef';
  }
}
