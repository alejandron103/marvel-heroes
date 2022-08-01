import { Component, OnInit, SimpleChanges } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { Comic } from '../interfaces/Comic';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favourites: Comic[] = [];
  constructor(private comicService: ComicService) { }

  ngOnInit() {
    this.comicService.getFavourites().subscribe( response => this.favourites = response);
    
  }

  deleteFavourite(comicId:number){
    this.comicService.removeFavourite(comicId)
  }

}
