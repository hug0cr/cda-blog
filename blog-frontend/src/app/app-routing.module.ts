import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./blog/home/home.component";
import {CreateArticleComponent} from "./blog/create-article/create-article.component";
import {PageNotFoundComponent} from "./blog/page-not-found/page-not-found.component";
import {AuthGuard} from "./core/auth.guard";
import {BlogComponent} from "./blog/blog.component";
import {ArticleDetailComponent} from "./blog/article-detail/article-detail.component";
import {BloggerProfileComponent} from "./blog/blogger-profile/blogger-profile.component";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'article/:id',
        component: ArticleDetailComponent
      },
      {
        path: 'article/:id',
        component: ArticleDetailComponent
      },
      {
        path: 'create-article',
        component: CreateArticleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:username',
        component: BloggerProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'page-not-found',
        component: PageNotFoundComponent
      },
    ]
  },
  {path: '**', redirectTo: "/page-not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
