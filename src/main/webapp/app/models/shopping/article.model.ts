import {DeliveryOption} from "./delivery-option.enum";

export class Article {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public brand: string,
    public rating: number,
    public numberOfRatings: number,
    public stock: number,
    public deliveryOption: DeliveryOption,
    public description?: string,
    public image?: string,
  ) {
  }
}

export class ArticleQty {
  constructor(public article: Article, public quantity: number) {
  }
}