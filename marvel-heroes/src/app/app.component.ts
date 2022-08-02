import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, lastValueFrom, map, Observable, switchMap, take } from 'rxjs';
import { Comic } from './interfaces/Comic';
import { Hero, HeroesSearch } from './interfaces/Hero';
import { ComicService } from './services/comic.service';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private heroesSearch : BehaviorSubject<HeroesSearch> = new BehaviorSubject({
    search: '',
    page: 1,
  });
  favourites!: Comic[];

  constructor(private heroService: HeroService, private comicService: ComicService) {}

  async ngOnInit() {
    this.heroes$ = this.heroesSearch.pipe(
      // wait 1000ms after each keystroke before considering the keyword
      debounceTime(1000),

      // only request on changes
      distinctUntilChanged(
        (previous, current) =>
          previous.page !== current.page && previous.search !== current.search
      ),

      // switch to new search observable each time the keyword changes
      switchMap((paginationSearch: HeroesSearch) =>
        this.heroService.searchHeroes(
          paginationSearch.search,
          paginationSearch.page
        )
      ),
      map(response =>
        response.data.results 
      ),
    );
    this.comicService.getFavourites().subscribe(res => this.favourites = res)
    if(this.favourites.length === 0){
      this.heroes$.subscribe(heroes => this.comicService.setRandomfavourites(heroes));
    }
  }

  searchHeroes(keyword: string): void {
    const page = this.heroesSearch.getValue()
    this.heroesSearch.next({
      search: keyword, 
      page: page.page
    });
  }

  setPage(page:number){
    const keyword = this.heroesSearch.getValue()
    this.heroesSearch.next({
      search: keyword.search, 
      page
    });
  }

}