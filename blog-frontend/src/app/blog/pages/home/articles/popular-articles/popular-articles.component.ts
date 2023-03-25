import {Component} from '@angular/core';
import {ArticleDTO} from "../../../../data/model/dto/article-dto";

@Component({
  selector: 'app-popular-articles',
  templateUrl: './popular-articles.component.html'
})
export class PopularArticlesComponent {
  popularArticles: ArticleDTO[] = [];
}
