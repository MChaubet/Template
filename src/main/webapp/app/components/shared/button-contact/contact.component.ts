import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModalContact() {
    // todo
    // this.modalService.open('modalContact');
  }
}
