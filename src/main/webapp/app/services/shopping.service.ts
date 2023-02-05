import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  closeFixedFiltersSubject = new Subject();

  constructor() { }
}
