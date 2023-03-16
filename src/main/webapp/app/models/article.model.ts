export class Article {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public favorite: boolean,
    public rating: number,
    public numberOfRatings: number,
    public stock: number,
    public description?: string,
    public image?: string
  ) {
  }
}

export class ArticleQty {
  constructor(public article: Article, public quantity: number) {
  }
}
