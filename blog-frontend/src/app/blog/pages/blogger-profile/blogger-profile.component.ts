import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {KeycloakProfile} from "keycloak-js";
import {ArticleService} from "../../data/model/article.service";
import {ArticleDto} from "../../data/model/dto/article-dto";

@Component({
  selector: 'app-blogger-profile',
  templateUrl: './blogger-profile.component.html',
  styleUrls: ['./blogger-profile.component.scss']
})
export class BloggerProfileComponent implements OnInit {
  keycloakProfile?: KeycloakProfile;
  articles: ArticleDto[] = []

  constructor(private authService: AuthService, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.keycloakProfile = this.authService.keycloakProfile;
    this.getUserArticles();
  }

  getUserArticles() {
    this.articleService.getArticlesByBloggerId(this.keycloakProfile?.id ?? '').subscribe({
      next: articles => {
        this.articles = articles;
      }
    });
  }

}
