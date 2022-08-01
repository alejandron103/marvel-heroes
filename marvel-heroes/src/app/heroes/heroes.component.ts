import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @Input() heroes!: Observable<Hero[]>  
  constructor() { }

  ngOnInit(): void {
  }
}
