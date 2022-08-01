import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getRequestParams } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private http: HttpClient) { }
  
  getHeroes(page:number): Observable<any> {
    return this.http.get(`${environment.BASE_API}characters?${getRequestParams()}&offset=${page}`)
  }
  
  searchHeroes(keyword: string, page:number): Observable<any> {
    if (!keyword.trim()) {
      // if not search term, return empty hero array.
      return this.getHeroes(page)
    }
    return this.http.get(`${environment.BASE_API}characters?nameStartsWith=${keyword}&${getRequestParams()}&offset=${page}`)
  }

}
