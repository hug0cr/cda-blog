import {Component, Input} from '@angular/core';
import {Article2} from "../../../../data/domain/article2";

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html'
})
export class LastArticlesComponent {
  @Input() lastArticles: Article2[] = [];
}
