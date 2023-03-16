import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SignInService} from "../account/sign-in/sign-in.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {navbarData} from "../../layouts/sidenav/nav-data";
import {rotate} from "../../../animations/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  animations: [
    rotate
  ]
})
export class ShowcaseComponent implements OnInit {

  routes = navbarData;
  activeRoute = 0;

  arrowState = 'default';

  constructor(private router: Router,
              public signInService: SignInService,
              private modalService: NgbModal) {
    this.selectRouteAfterReload();
  }

  ngOnInit(): void {
  }

  openModalContact(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true, size: 'sm', windowClass: 'modal-sign-in' });
  }

  selectRouteAfterReload(): void {
    this.router.events.subscribe(() => {
      const segments = this.router.url.split('/');
      this.activeRoute = this.routes.findIndex(value => value.routeLink === segments[segments.length - 1]);
    });
  }

  openEvent($event: boolean): void {
    this.arrowState = $event ? 'rotated' : 'default';
  }
}
