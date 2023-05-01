import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ShoppingFilter} from "../../models/shopping/shopping.filter";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  closeFixedFiltersSubject = new Subject();
  filtersSubject = new Subject<ShoppingFilter>();
  sortSubject = new Subject<string>();
  spinnerSubject = new Subject();

  constructor() {
  }
}
