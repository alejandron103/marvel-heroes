import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './components/heroes/heroes.component'
import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroComponent } from './components/hero/hero.component';
import { SectionTitleComponent } from './common-components/section-title/section-title.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CharactersComponent } from './components/characters/characters.component';
import { DialogComponent } from './common-components/dialog/dialog.component';
import { PaginatorComponent } from './common-components/paginator/paginator.component';
import { FavouriteComponent } from './components/favourite/favourite.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroSearchComponent,
    HeroComponent,
    SectionTitleComponent,
    FavoritesComponent,
    CharactersComponent,
    DialogComponent,
    PaginatorComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
