import { Component } from '@angular/core';

@Component({
  selector: 'jhi-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
  hostname = '';

  constructor() {}

  ngOnInit() {
    this.hostname = location.hostname;
  }
}
