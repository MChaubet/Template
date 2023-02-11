export class Article {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public favorite: boolean,
    public description?: string,
    public image?: string,
    public rating?: number,
  ) {
  }
}

export class ArticleQty {
  constructor(public article: Article, public quantity: number) {
  }
}
