import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {ShoppingService} from "../../../../../services/shopping.service";

@Component({
  selector: 'jhi-shopping-filter',
  templateUrl: './shopping-filter.component.html',
  styleUrls: ['./shopping-filter.component.scss']
})
export class ShoppingFilterComponent implements OnInit {
  FLOOR = 0;
  CEIL = 1800;

  value = this.FLOOR;
  highValue = this.CEIL;

  brands: Brand[] = [];
  ratings: Rating[] = [];

  optionsSlideMontants: Options = {
    floor: this.value,
    ceil: this.highValue,
    animate: false,
    translate (value) {
      return value.toString() + '€';
    },
    combineLabels (minLabel, maxLabel) {
      return minLabel === maxLabel ? maxLabel : minLabel + ' - ' + maxLabel;
    }
  };

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.brands.push({id: 1, name: 'Asus'});
    this.brands.push({id: 2, name: 'Dell'});
    this.brands.push({id: 3, name: 'HP'});
    this.brands.push({id: 4, name: 'Lenovo'});
    this.brands.push({id: 5, name: 'Acer'});
    this.brands.push({id: 6, name: 'Sosce'});
    this.brands.push({id: 7, name: 'Sescent'});

    this.ratings.push({id: 1, value: 1});
    this.ratings.push({id: 2, value: 2});
    this.ratings.push({id: 3, value: 3});
    this.ratings.push({id: 4, value: 4});
    this.ratings.push({id: 5, value: 5});
    this.ratings.reverse();
  }

  closeFixedFilters(): void {
    this.shoppingService.closeFixedFiltersSubject.next(null);
  }
}

export class Brand {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Rating {
  id: number;
  value: number;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }
}
