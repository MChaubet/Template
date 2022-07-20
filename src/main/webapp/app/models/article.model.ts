export class Article {
  constructor(
    public id: number,
    public name?: string,
    public desc?: string,
    public img?: string,
    public rate?: number,
    public price?: number
  ) {}
}

export class ArticleQty {
  constructor(public article: Article, public quantity: number) {}
}
