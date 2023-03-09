export class Article {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public published: boolean,
    public blogger: string
  ) {
  }
}
