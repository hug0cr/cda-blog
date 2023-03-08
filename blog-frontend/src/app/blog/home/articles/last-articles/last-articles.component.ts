import {Component, Input} from '@angular/core';
import {Article} from "../../../data/article";

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.scss']
})
export class LastArticlesComponent {
  @Input() lastArticles: Article[] = [];
}
