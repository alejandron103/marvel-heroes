import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() pagesNumber!: number;
  @Output() setOffSetEvent = new EventEmitter<number>();

  numberPages:number[] = [];
  nextPage: number = 0;
  prevPage: number = 0;
  pagesCurrentValue: number = 1;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const currenPageValue = changes['pagesNumber'].currentValue;
    this.numberPages = Array.from({length: currenPageValue}, (_, i) => i + 1)
    this.prevPage = changes['pagesNumber'].previousValue || 1;
  }

  ngOnInit(): void {
  }

  setOffset(pageIndex:number){
    this.setOffSetEvent.emit(pageIndex)
    this.pagesCurrentValue = pageIndex;
  }

}
