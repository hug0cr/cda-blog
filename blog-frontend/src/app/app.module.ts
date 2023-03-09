import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './blog/home/home.component';
import {FooterComponent} from './blog/ui/footer/footer.component';
import {HeaderComponent} from './blog/ui/header/header.component';
import {PresentationComponent} from './blog/home/presentation/presentation.component';
import {ArticlesComponent} from './blog/home/articles/articles.component';
import {LastArticlesComponent} from './blog/home/articles/last-articles/last-articles.component';
import {PopularArticlesComponent} from './blog/home/articles/popular-articles/popular-articles.component';
import {CreateArticleComponent} from './blog/create-article/create-article.component';
import {PageNotFoundComponent} from './blog/page-not-found/page-not-found.component';
import {initializeKeycloak} from "./core/keycloak-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";
import { BlogComponent } from './blog/blog.component';
import {FormsModule} from "@angular/forms";
import { ArticleDetailComponent } from './blog/article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PresentationComponent,
    ArticlesComponent,
    LastArticlesComponent,
    PopularArticlesComponent,
    CreateArticleComponent,
    PageNotFoundComponent,
    BlogComponent,
    ArticleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
