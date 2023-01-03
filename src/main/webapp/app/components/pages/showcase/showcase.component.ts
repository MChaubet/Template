import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'jhi-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
  isSideNavCollapsed = true;
  screenWidth = 0;

  constructor(private router: Router) {
    if (this.router.url.endsWith('showcase')) {
      this.router.navigateByUrl('/showcase/portfolio').then(r => r);
    }
  }

  ngOnInit(): void {}

  toggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
