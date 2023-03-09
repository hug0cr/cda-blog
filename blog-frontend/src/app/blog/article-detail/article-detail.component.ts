import {Component, Input, OnInit} from '@angular/core';
import {ArticleDto} from "../data/model/dto/article-dto";
import {ArticleService} from "../data/model/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  @Input() articleDto?: ArticleDto;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe(
      article => {
        this.articleDto = article
      },
      error => {
        console.log(error)
        this.router.navigate(['page-not-found'])
      });
  }


}
