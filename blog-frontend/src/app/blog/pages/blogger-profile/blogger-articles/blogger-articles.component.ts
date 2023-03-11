import {Component, Input} from '@angular/core';
import {ArticleDto} from "../../../data/model/dto/article-dto";

@Component({
  selector: 'app-blogger-articles',
  templateUrl: './blogger-articles.component.html',
  styleUrls: ['./blogger-articles.component.scss']
})
export class BloggerArticlesComponent {
  @Input() articles: ArticleDto[] = [];
}
