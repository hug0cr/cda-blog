import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PresentationComponent } from './pages/home/presentation/presentation.component';
import { ArticlesComponent } from './pages/home/articles/articles.component';
import { LastArticlesComponent } from './pages/home/articles/last-articles/last-articles.component';
import { PopularArticlesComponent } from './pages/home/articles/popular-articles/popular-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PresentationComponent,
    ArticlesComponent,
    LastArticlesComponent,
    PopularArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
