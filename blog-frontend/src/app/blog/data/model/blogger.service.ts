import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BloggerDto} from "./dto/blogger-dto";

@Injectable({
  providedIn: 'root'
})
export class BloggerService {
  apiUrl = 'http://localhost:8088/api/bloggers'

  constructor(private http: HttpClient) { }

  getBloggers(): Observable<BloggerDto[]> {
    return this.http.get<BloggerDto[]>(this.apiUrl)
  }

  getBloggerById(id: string): Observable<BloggerDto> {
    return this.http.get<BloggerDto>(`${this.apiUrl}/${id}`);
  }
}
