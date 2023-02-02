import {Component} from '@angular/core';
import {shoppingHeaderData} from './shopping-header-data';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'jhi-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.scss']
})
export class ShoppingHeaderComponent {

  isCategoryMenuOpen: any;
  menuData = shoppingHeaderData;

  form = this.formBuilder.group(
    {search: []},
    {updateOn: "change"}
  );

  constructor(private formBuilder: FormBuilder) {
  }

  search(): void {
  }

  clearSearch(): void {
    this.form.reset();
    this.form.controls.search.setValue(null);
  }

  scrollMenu() {
    const categoryMenu = document.querySelector('.category-menu');
    categoryMenu!.scrollLeft += 100;
  }
}
