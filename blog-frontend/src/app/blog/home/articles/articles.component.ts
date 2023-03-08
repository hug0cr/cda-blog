import {Component, OnInit} from '@angular/core';
import {Article} from "../../data/article";
import {BlogService} from "../../data/blog.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class
ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getLastArticles().subscribe(articles => {
      this.articles = articles;
      console.log(articles)
    })
  }

}
