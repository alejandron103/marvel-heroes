import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comic } from '../../interfaces/Comic';
import { Thumbnail } from '../../interfaces/Hero';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  @Input() favourite!:Comic;
  @Output() deleteFavouriteEvent = new EventEmitter<number>;
  constructor() { }

  ngOnInit(): void {
  }
  buildImgSrc(thumbnail:Thumbnail){
    const {path, extension} = thumbnail;
    return `${path}.${extension}`;
  }
  deleteFavourite(){
    this.deleteFavouriteEvent.emit(this.favourite.id);
  }
}
