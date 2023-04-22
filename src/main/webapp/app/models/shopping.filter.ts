import {DeliveryOption} from "./delivery-option.enum";

export class ShoppingFilter {
  constructor(
    public priceMin: number = 0,
    public priceMax: number = Infinity,
    public rating: number = 0,
    public brands: string[] = [],
    public deliveryOptions: DeliveryOption[] = [],
  ) {
  }
}