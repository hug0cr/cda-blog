import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../data/blog.service";
import {Article} from "../data/domain/article";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article?: Article;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getArticleById(id).subscribe(
      article => {
        this.article = article
      },
      error => {
        console.log(error)
        window.history.replaceState(null, '', '/');
        this.router.navigate(['page-not-found'])
      });
  }


}
