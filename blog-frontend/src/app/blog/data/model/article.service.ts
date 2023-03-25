import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ArticleDTO} from "./dto/article-dto";
import {Article} from "../domain/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl = 'http://localhost:8088/api/posts'

  constructor(private http: HttpClient) { }

  getArticles(): Observable<ArticleDTO[]> {
    return this.http.get<ArticleDTO[]>(this.apiUrl)
  }

  getArticle(id: number) {
    return this.http.get<ArticleDTO>(`${this.apiUrl}/${id}`)
  }

  getArticlesByBloggerId(id: string): Observable<ArticleDTO[]> {
    return this.http.get<ArticleDTO[]>(`${this.apiUrl}/user/${id}`)
  }

  createArticle(article: ArticleDTO): Observable<number> {
    return this.http.post<number>(this.apiUrl, article);
  }

  updateArticle(article: ArticleDTO) {
    return this.http.put<ArticleDTO>(`${this.apiUrl}/${article.id}`, article);
  }

  searchArticles(term: string) {
    if (term.length < 3) return of([])
    return this.http.get<ArticleDTO[]>(`${this.apiUrl}/search?searchTerm=${term}`)
  }
}
