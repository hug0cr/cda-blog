import {Component} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {ArticleService} from "../../data/model/article.service";
import {ArticleDto} from "../../data/model/dto/article-dto";
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-blogger-profile',
  templateUrl: './blogger-profile.component.html',
  styleUrls: ['./blogger-profile.component.scss']
})
export class BloggerProfileComponent {
  keycloakProfile$: Promise<KeycloakProfile | null> = this.keycloakService.loadUserProfile()
    .then(keycloakProfile => {
      this.getBloggerArticles(keycloakProfile.id ?? '')
      return keycloakProfile;
    })
    .catch(reason => {
      console.log(reason)
      return null;
    });

  articles: BehaviorSubject<ArticleDto[]> = new BehaviorSubject<ArticleDto[]>([]);

  constructor(private keycloakService: KeycloakService, private articleService: ArticleService) {
  }

  getBloggerArticles(bloggerId: string): void {
    this.articleService.getArticlesByBloggerId(bloggerId)
      .subscribe((articles: ArticleDto[]) => {
        this.articles.next(articles || []);
      });
  }

}
