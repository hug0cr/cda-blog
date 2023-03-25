import {ArticleDTO} from "../model/dto/article-dto";
import {BloggerDTO} from "../model/dto/blogger-dto";

export class BloggerProfile {
  constructor(
    public blogger: BloggerDTO,
    public articles: ArticleDTO[],
  ) {
  }
}
