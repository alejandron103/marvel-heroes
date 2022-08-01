import { Component, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { lastValueFrom, map, take } from 'rxjs';
import { DialogComponent } from '../common-components/dialog/dialog.component';
import { Comic } from '../interfaces/Comic';
import { Hero, Thumbnail } from '../interfaces/Hero';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() hero!: Hero;
  showComics: boolean = false;
  comicDetail!: Comic;

  constructor(public dialog: MatDialog, private comicService:ComicService) { }

  ngOnInit(): void {
  }
  buildImgSrc(thumbnail:Thumbnail){
    const {path, extension} = thumbnail;
    return `${path}.${extension}`;
  }
  setShowComics(){
    this.showComics = true;
  }
  async openDetail(openDetail:string){
    this.comicDetail = await lastValueFrom(this.comicService.getComicDetail(openDetail).pipe(take(1), map(response =>
      response.data.results[0]
    )));
    this.dialog.open(DialogComponent, {
      data: this.comicDetail,
      height: '430px',
      width: '600px',
    });
  }
}
