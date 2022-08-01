import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, lastValueFrom, map, Observable, switchMap, take } from 'rxjs';
import { Comic } from './interfaces/Comic';
import { Hero } from './interfaces/Hero';
import { ComicService } from './services/comic.service';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchkeywords = new BehaviorSubject<string>('');
  private keyword: string = '';
  page:number = 1;
  favourites!: Comic[];

  constructor(private heroService: HeroService, private comicService: ComicService) {}

  async ngOnInit() {
    this.heroes$ = this.searchkeywords.pipe(
      // wait 1000ms after each keystroke before considering the keyword
      debounceTime(1000),

      // ignore new keyword if same as previous keyword
      distinctUntilChanged(),

      // switch to new search observable each time the keyword changes
      switchMap((keyword: string) => this.heroService.searchHeroes(keyword, this.page)),
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
    this.searchkeywords.next(keyword);
    this.keyword = keyword;
    this.page = 1;
  }

  setPage(page:number){
    this.page = page;
    this.searchkeywords.next(this.keyword);
  }

}