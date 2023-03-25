import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BloggerDTO} from "./dto/blogger-dto";

@Injectable({
  providedIn: 'root'
})
export class BloggerService {
  apiUrl = 'http://localhost:8088/api/bloggers'

  constructor(private http: HttpClient) { }

  getBloggers(): Observable<BloggerDTO[]> {
    return this.http.get<BloggerDTO[]>(this.apiUrl)
  }

  getBloggerById(id: string): Observable<BloggerDTO> {
    return this.http.get<BloggerDTO>(`${this.apiUrl}/${id}`);
  }
}
