import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {
  @Output() searchHeroEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  searchHero(value: string) {
    this.searchHeroEvent.emit(value);
  }
}
