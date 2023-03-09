import {Article} from "./article";

export class Blogger {
  constructor(
    public id: number,
    public username: string,
    public articles: Article[],
  ) {
  }
}
