import { Component } from '@angular/core';

@Component({
  selector: 'jhi-management-app',
  templateUrl: './management-app.component.html',
  styleUrls: ['./management-app.component.scss'],
})
export class ManagementAppComponent {
  value: string;
  constructor() {
    this.value = '';
  }
}
