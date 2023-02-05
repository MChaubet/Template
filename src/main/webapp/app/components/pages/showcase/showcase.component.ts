import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SignInService} from "../account/sign-in/sign-in.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {

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
}
