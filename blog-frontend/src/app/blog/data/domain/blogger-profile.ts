import {ArticleDto} from "../model/dto/article-dto";
import {BloggerDto} from "../model/dto/blogger-dto";

export class BloggerProfile {
  constructor(
    public blogger: BloggerDto,
    public articles: ArticleDto[],
  ) {
  }
}
