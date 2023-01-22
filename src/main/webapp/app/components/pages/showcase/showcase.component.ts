import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {SignInService} from "../account/sign-in/sign-in.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  @ViewChild('content') modal: TemplateRef<any> | undefined;

  constructor(private router: Router,
              public signInService: SignInService,
              private modalService: NgbModal) {
    if (this.router.url.endsWith('showcase')) {
      this.router.navigateByUrl('/showcase/portfolio').then(r => r);
    }
  }

  ngOnInit(): void {
    this.signInService.displaySignInSub.subscribe((isDisplayed) => {
      if (isDisplayed && this.modal) {
        this.openModalContact(this.modal);
      }
    })
  }

  toggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  openModalContact(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true, size: 'sm', windowClass: 'modal-sign-in' });
  }

  closeSignIn(): void {
    this.signInService.closeSignIn();
  }
}
