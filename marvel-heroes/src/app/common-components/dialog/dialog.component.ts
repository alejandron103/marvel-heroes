import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from 'src/app/interfaces/Comic';
import { Thumbnail } from 'src/app/interfaces/Hero';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  isFavorite:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<DialogComponent>, private comicService: ComicService) {}

  ngOnInit(): void {
    this.isFavorite = this.comicService.findComic(this.data.id)
  }

  buildImgSrc(thumbnail:Thumbnail){
    const {path, extension} = thumbnail;
    return `${path}.${extension}`;
  }

  addFavourites(data:Comic){
    this.comicService.addFavourite(data);
    this.dialogRef.close()
  }
}
