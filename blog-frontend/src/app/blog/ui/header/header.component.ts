import {Component, Input, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {BloggerService} from "../../data/model/blogger.service";
import {debounceTime, distinct, distinctUntilChanged, map, Observable, Subject, switchMap} from "rxjs";
import {ArticleDTO} from "../../data/model/dto/article-dto";
import {ArticleService} from "../../data/model/article.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn?: boolean;
  @Input() keycloakProfile?: KeycloakProfile | null;
  searchTerm = new Subject<string>();
  articles$?: Observable<ArticleDTO[]>;

  constructor(private keycloakService: KeycloakService, private articleService: ArticleService) {
  }

  onSignUp() {
    this.keycloakService.register({
      action: 'register',
      redirectUri: 'http://localhost:4200'
    }).then(r => {
      console.log(r);
    });
  }

  onSignIn() {
    this.keycloakService.login()
  }

  onLogout() {
    this.keycloakService.logout('http://localhost:4200').then(r => {
      console.log(r);
    });
  }


  search(value: string) {
    this.searchTerm.next(value);
  }

  ngOnInit(): void {
    this.articles$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => this.articleService.searchArticles(term))
    );
  }
}
