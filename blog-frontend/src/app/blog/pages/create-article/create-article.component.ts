import { Component } from '@angular/core';
import {ArticleService} from "../../data/model/article.service";
import {ArticleDTO} from "../../data/model/dto/article-dto";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  articleDto: ArticleDTO = {
    title: '',
    content: '',
    blogger: '',
    published: true
  }

  keycloakProfile$: Promise<KeycloakProfile | null> = this.keycloakService.loadUserProfile()
    .catch(reason => {
      console.log(reason)
      return null;
    });

  constructor(private articleService: ArticleService,
              private keycloakService: KeycloakService,
              private router: Router) {
  }

  onSubmit() {
    console.log(this.articleDto)
    this.keycloakProfile$.then(value => {
      this.articleDto.blogger = value?.id ?? '';
      this.articleService.createArticle(this.articleDto).subscribe(
        response => {
          // Gérer la réponse du backend si nécessaire
          console.log(response);
          this.redirectToArticle(response)
        },
        error => {
          // Gérer les erreurs si nécessaire
          console.log(error);
        }
      );
    });
  }

  getUserId() {
    let userId;
    this.keycloakProfile$.then(value => {
      userId = value?.id
    });
    return userId
  }

  private redirectToArticle(articleId: number) {
    this.router.navigate(['article', articleId])
  }


}
