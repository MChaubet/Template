import { Article } from 'app/modules/shopping/model/article.model';

export class ShoppingCart {
  constructor(public articles: Article[]) {}
}
