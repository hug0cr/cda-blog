import {Component, Input, OnInit} from '@angular/core';
import {ArticleDTO} from "../../data/model/dto/article-dto";
import {ArticleService} from "../../data/model/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html'
})
export class ArticleEditComponent implements OnInit {
  @Input() article?: ArticleDTO;

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getArticle()
  }

  getArticle() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe(
      article => {
        this.article = article
      },
      error => {
        console.log(error)
        window.history.replaceState(null, '', '/');
        this.router.navigate(['page-not-found'])
      });
  }

  onSubmit() {
    if (this.article) {
      this.articleService.updateArticle(this.article).subscribe({
        next: value => this.router.navigate(['article', value.id])
      })
    }
  }
}
