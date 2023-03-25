import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../data/model/article.service";
import {BloggerService} from "../../../data/model/blogger.service";
import {ArticleDTO} from "../../../data/model/dto/article-dto";
import {BloggerDTO} from "../../../data/model/dto/blogger-dto";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {Article2} from "../../../data/domain/article2";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {
  articlesWithAuthor: Article2[] = [];

  constructor(private articleService: ArticleService, private bloggerService: BloggerService) {
  }

  ngOnInit() {
    console.log('hello')
    this.getLastArticles();
  }

  getLastArticles() {
    this.articleService.getArticles().pipe(
      switchMap((articles: ArticleDTO[]) => {
        console.log('hello')
        const bloggerIds: string[] = articles.map(article => article.blogger ?? '');
        const uniqueBloggerIds: string[] = [...new Set(bloggerIds)];

        const bloggers$: Observable<BloggerDTO>[] = uniqueBloggerIds.map(bloggerId => {
          console.log(bloggerId)
          return this.bloggerService.getBloggerById(bloggerId);
        });

        return forkJoin(bloggers$).pipe(
          map((bloggers: BloggerDTO[]) => {
            const lastArticles: Article2[] = [];
            articles.forEach(article => {
              const blogger: BloggerDTO | undefined = bloggers.find(blogger => blogger.id === article.blogger);
              lastArticles.push(new Article2(article, blogger ?? {id: 'unknown', username: 'unknown'}));
            })
            console.log(lastArticles)
            return lastArticles;
          })
        )
      })
    ).subscribe({
      next: value => this.articlesWithAuthor = value
    });
  }
}
