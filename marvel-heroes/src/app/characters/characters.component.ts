import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, of, tap } from 'rxjs';
import { Hero } from '../interfaces/Hero';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  @Input() heroes!: Observable<Hero[]>;

  @Output() setOffsetPaginatorEvent = new EventEmitter<number>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  length!:number

  dataHeroes!:Hero[];
  pagesNumber!:number;

  constructor() { }

  ngOnInit(): void {
    this.heroes.subscribe(heroes =>  {
      this.length = heroes.length; 
      this.pagesNumber = Math.ceil(this.length / 10);
      if(this.length > 10 ) this.heroes = of(heroes.slice(0,10)) 
    })
  } 
  setOffsetPaginator(pageIndex:number){
    this.setOffsetPaginatorEvent.emit(pageIndex)
  }
}
