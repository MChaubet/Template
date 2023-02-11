import {Component, OnInit} from '@angular/core';
import {ShoppingService} from "../../../../services/shopping.service";

@Component({
  selector: 'jhi-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit {
  showFilters = false;
  screenWidth = 0;

  constructor(private shoppingService: ShoppingService) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 600) {
        this.showFilters = false;
      }
    };

    this.shoppingService.closeFixedFiltersSubject.subscribe(() => {
      this.closeFilters();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  closeFilters(): void {
    this.showFilters = false;
  }
}
