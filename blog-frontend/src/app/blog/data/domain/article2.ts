import {ArticleDTO} from "../model/dto/article-dto";
import {BloggerDTO} from "../model/dto/blogger-dto";

export class Article2 {
  constructor(public article: ArticleDTO, public blogger: BloggerDTO) {
  }
}
