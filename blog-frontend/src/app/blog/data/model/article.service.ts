import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleDto} from "./dto/article-dto";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl = 'http://localhost:8088/api/posts'

  constructor(private http: HttpClient) { }

  getArticles(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.apiUrl)
  }

  getArticle(id: number) {
    return this.http.get<ArticleDto>(`${this.apiUrl}/${id}`)
  }

  getArticlesByBloggerId(id: string): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/user/${id}`)
  }

  createArticle(article: ArticleDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, article);
  }
}
