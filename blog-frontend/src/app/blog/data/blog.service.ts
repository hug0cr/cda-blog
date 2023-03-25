import {Injectable} from '@angular/core';
import {ArticleService} from "./model/article.service";
import {BloggerService} from "./model/blogger.service";
import {Article} from "./domain/article";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {BloggerDTO} from "./model/dto/blogger-dto";
import {ArticleDTO} from "./model/dto/article-dto";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private articleService: ArticleService,
              private bloggerService: BloggerService) {
  }

  getLastArticles(): Observable<Article[]> {
    return this.articleService.getArticles().pipe(
      switchMap((articles: ArticleDTO[]) => {
        const bloggerIds: string[] = articles.map(article => article.blogger ?? '');
        const uniqueBloggerIds: string[] = [...new Set(bloggerIds)];

        const bloggers$: Observable<BloggerDTO>[] = uniqueBloggerIds.map(bloggerId => {
          console.log(bloggerId)
          return this.bloggerService.getBloggerById(bloggerId);
        });

        return forkJoin(bloggers$).pipe(
          map(bloggers => {
            const lastArticles: Article[] = [];
            articles.forEach(article => {
              const blogger = bloggers.find(blogger => blogger.id === article.blogger);
              const articleDomain = new Article(article.id ?? 0, article.title, article.content, article.published, blogger ? blogger.username : 'unknown');
              lastArticles.push(articleDomain);
            })
            return lastArticles;
          })
        )
      })
    );
  }

  getArticleById(articleId: number): Observable<Article> {
    return this.articleService.getArticle(articleId).pipe(
      switchMap(article => {
        const bloggerId: string = article.blogger ?? '';

        return this.bloggerService.getBloggerById(bloggerId).pipe(
          map(blogger => {
            return new Article(article.id ?? 0, article.title, article.content, article.published, blogger ? blogger.username : 'unknown');
          })
        );
      })
    );
  }
}
