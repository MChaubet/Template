import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {ShoppingService} from "../../../../../services/showcase/shopping.service";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {ShoppingFilter} from "../../../../../models/shopping/shopping.filter";
import {DeliveryOption} from "../../../../../models/shopping/delivery-option.enum";

@Component({
  selector: 'jhi-shopping-filter',
  templateUrl: './shopping-filter.component.html',
  styleUrls: ['./shopping-filter.component.scss']
})
export class ShoppingFilterComponent implements OnInit {

  priceMin = 0;
  priceMax = 1800;

  filtersForm = this.formBuilder.group({
    rating: new FormControl<number|null>(0),
    brands: new FormArray([]),
    deliveryOptions: new FormArray([]),
  });

  optionsSlideMontants: Options = {
    floor: this.priceMin,
    ceil: this.priceMax,
    animate: false,
    translate(value) {
      return value.toString() + '€';
    },
    combineLabels(minLabel, maxLabel) {
      return minLabel === maxLabel ? maxLabel : minLabel + ' - ' + maxLabel;
    }
  };

  constructor(private shoppingService: ShoppingService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  get ratings(): number[] {
    return [5, 4, 3, 2, 1];
  }

  get brands(): string[] {
    return ['Acer', 'Asus', 'Dell', 'Lenovo', 'Medion'];
  }

  get deliveryOptions(): string[] {
    return Object.values(DeliveryOption);
  }

  applyFilters(isReset: boolean): void {
    if (!isReset) {
      this.closeFixedFilters();
    }
    const priceMin = this.priceMin;
    const priceMax = this.priceMax;
    const rating = this.filtersForm.get('rating')?.value ?? 0;
    const brands = this.filtersForm.get('brands')?.value;
    const deliveryOptions = this.filtersForm.get('deliveryOptions')?.value ?? [];

    this.shoppingService.filtersSubject.next(new ShoppingFilter(priceMin, priceMax, rating, brands, deliveryOptions));
  }

  resetFilters(): void {
    this.filtersForm.reset();
    this.filtersForm.get('rating')?.setValue(0);
    this.priceMin = 0;
    this.priceMax = 1800;
    this.applyFilters(true);
  }

  closeFixedFilters(): void {
    this.shoppingService.closeFixedFiltersSubject.next(null);
  }

  toggleRating(rating: number): void {
    if (this.filtersForm.get('rating')?.value === rating) {
      this.filtersForm.get('rating')?.setValue(0);
    }
  }

  onBrandChange(event: Event, brand: string): void {
    const brandsArray = this.filtersForm.get('brands') as FormArray;
    if ((event.target as HTMLInputElement).checked) {
      brandsArray.push(new FormControl(brand));
    } else {
      const index = brandsArray.controls.findIndex(control => control.value === brand);
      if (index >= 0) {
        brandsArray.removeAt(index);
      }
    }
  }

  onDeliveryOptionChange(event: Event, deliveryOption: string): void {
    const deliveryOptionsArray = this.filtersForm.get('deliveryOptions') as FormArray;
    if ((event.target as HTMLInputElement).checked) {
      deliveryOptionsArray.push(new FormControl(deliveryOption));
    } else {
      const index = deliveryOptionsArray.controls.findIndex(control => control.value === deliveryOption);
      if (index >= 0) {
        deliveryOptionsArray.removeAt(index);
      }
    }
  }
}