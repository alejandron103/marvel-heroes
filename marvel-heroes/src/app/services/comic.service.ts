import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, elementAt, lastValueFrom, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comic } from '../interfaces/Comic';
import { Hero } from '../interfaces/Hero';
import { getRandomInt, getRequestParams } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  
  private getFavouritesComics = new BehaviorSubject<Comic[]>([]);
  favourites!: Comic[];
  constructor(private http: HttpClient) { 
    this.getFavouritesComics = new BehaviorSubject<Comic[]>(JSON.parse(localStorage.getItem('favourites') ?? '[]'))
    this.getFavourites().subscribe(res => this.favourites = res);
  }

  getComicDetail(resourceURI:string):Observable<any>{
    return this.http.get(`${resourceURI}?${getRequestParams()}`)
  }

  getComicsByHero(heroId:number):Observable<any>{
    return this.http.get(`${environment.BASE_API}characters/${heroId}/comics?${getRequestParams()}&limit=3`)
  }

  //favourites
  async setRandomfavourites(heroes:Hero[]){
    const randomHeroeId = heroes[getRandomInt(heroes.length)].id ?? 1017100;
    const randomComics = await lastValueFrom(this.getComicsByHero(randomHeroeId).pipe(take(1), map(response =>
      response.data.results
    )));
    if(randomComics.length === 0 )this.setRandomfavourites(heroes);
    else{
      localStorage.setItem('favourites', JSON.stringify(randomComics))
    }
    this.getFavouritesComics.next(randomComics);
  }

  getFavourites():Observable<Comic[]> {
    return this.getFavouritesComics;
  }

  addFavourite(comicToAdd:Comic){
    let favourites:Comic[] = [];
    this.getFavourites().subscribe(res => favourites = res);
    const favouritesHasComic = favourites.some((element:Comic) => element.id === comicToAdd.id);
    const newFavourites = favouritesHasComic ? [...favourites] : [...favourites, comicToAdd];
    localStorage.setItem('favourites', JSON.stringify(newFavourites))
    this.getFavouritesComics.next(newFavourites)
  }

  removeFavourite(comicIdToemove:number){
    let favourites:Comic[] = [];
    this.getFavourites().subscribe(res => favourites = res);
    const comicsRemoved = favourites.filter(comic => comic.id !== comicIdToemove)
    localStorage.setItem('favourites', JSON.stringify(comicsRemoved))
    this.getFavouritesComics.next(comicsRemoved);
  }

  findComic(comidId:number){
    return this.favourites.some(comic => comic.id === comidId);
  }

}
