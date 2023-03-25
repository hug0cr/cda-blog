import {Component, Input} from '@angular/core';
import {ArticleDTO} from "../../../data/model/dto/article-dto";

@Component({
  selector: 'app-blogger-articles',
  templateUrl: './blogger-articles.component.html'
})
export class BloggerArticlesComponent {
  @Input() articles: ArticleDTO[] = [];
}
