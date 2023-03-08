import {Component} from '@angular/core';
import {ArticleDto} from "../../../data/model/dto/article-dto";

@Component({
  selector: 'app-popular-articles',
  templateUrl: './popular-articles.component.html',
  styleUrls: ['./popular-articles.component.scss']
})
export class PopularArticlesComponent {
  popularArticles: ArticleDto[] = [];
}
