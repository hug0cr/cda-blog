import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './blog/pages/home/home.component';
import {FooterComponent} from './blog/ui/footer/footer.component';
import {HeaderComponent} from './blog/ui/header/header.component';
import {PresentationComponent} from './blog/pages/home/presentation/presentation.component';
import {ArticlesComponent} from './blog/pages/home/articles/articles.component';
import {LastArticlesComponent} from './blog/pages/home/articles/last-articles/last-articles.component';
import {PopularArticlesComponent} from './blog/pages/home/articles/popular-articles/popular-articles.component';
import {CreateArticleComponent} from './blog/pages/create-article/create-article.component';
import {PageNotFoundComponent} from './blog/pages/page-not-found/page-not-found.component';
import {initializeKeycloak} from "./core/keycloak-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";
import { BlogComponent } from './blog/blog.component';
import {FormsModule} from "@angular/forms";
import { ArticleDetailComponent } from './blog/pages/article-detail/article-detail.component';
import { BloggerProfileComponent } from './blog/pages/blogger-profile/blogger-profile.component';

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
    BloggerProfileComponent,
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
