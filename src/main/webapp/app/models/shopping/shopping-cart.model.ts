import { ArticleQty } from 'app/models/shopping/article.model';

export class ShoppingCart {
  constructor(public articles: ArticleQty[]) {}
}
