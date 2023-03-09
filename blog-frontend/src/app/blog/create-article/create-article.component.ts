import { Component } from '@angular/core';
import {ArticleService} from "../data/model/article.service";
import {ArticleDto} from "../data/model/dto/article-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  articleDto: ArticleDto = {
    title: '',
    content: '',
    published: true
  }

  constructor(private articleService: ArticleService, private router: Router) {
  }

  onSubmit() {
    console.log(this.articleDto)
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
  }

  private redirectToArticle(articleId: number) {
    this.router.navigate(['article', articleId])
  }


}
