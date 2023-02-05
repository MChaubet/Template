import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SignInService} from "../account/sign-in/sign-in.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {navbarData} from "../../layouts/sidenav/nav-data";
import {rotate} from "../../../animations/animations";

@Component({
  selector: 'jhi-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  animations: [
    rotate
  ]
})
export class ShowcaseComponent implements OnInit {

  isRouteChoicesOpen = false;
  routes = navbarData;
  activeRoute = 0;

  arrowState = 'default';

  @ViewChild('content') modal: TemplateRef<any> | undefined;

  constructor(public signInService: SignInService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.signInService.displaySignInSub.subscribe((isDisplayed) => {
      if (isDisplayed && this.modal) {
        this.openModalContact(this.modal);
      }
    })
  }

  openModalContact(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true, size: 'sm', windowClass: 'modal-sign-in' });
  }

  closeSignIn(): void {
    this.signInService.closeSignIn();
  }

  toggleRouteChoices() {
    this.isRouteChoicesOpen = !this.isRouteChoicesOpen;
    this.arrowState = (this.arrowState === 'default' ? 'rotated' : 'default');
  }

  selectRoute(route: number): void {
    this.activeRoute = route;
    this.isRouteChoicesOpen = false;
    this.arrowState = 'default';
  }
}
