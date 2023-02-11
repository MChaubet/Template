import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  hostname = '';

  constructor() {}

  ngOnInit(): void {
    this.hostname = location.hostname;
  }
}
