import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./blog/home/home.component";
import {CreateArticleComponent} from "./blog/create-article/create-article.component";
import {PageNotFoundComponent} from "./blog/page-not-found/page-not-found.component";
import {AuthGuard} from "./core/auth.guard";
import {BlogComponent} from "./blog/blog.component";

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
        path: 'create-article',
        component: CreateArticleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'page-not-found',
        component: PageNotFoundComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
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
