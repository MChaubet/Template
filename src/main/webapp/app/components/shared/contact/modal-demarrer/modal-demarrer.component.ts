import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-modal-demarrer',
  templateUrl: './modal-demarrer.component.html',
  styleUrls: ['./modal-demarrer.component.scss'],
})
export class ModalDemarrerComponent implements OnInit {
  // contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // this.contactForm = this.formBuilder.group({});
  }

  ngOnInit() {
    // this.contactForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', Validators.required],
    //   message: ['', Validators.required]
    // });
  }

  onSubmit() {
    // console.log(this.contactForm.value);
  }
}
