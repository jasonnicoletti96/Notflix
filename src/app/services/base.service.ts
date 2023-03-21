import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  getFilms(s: string = 'avengers', p: number = 1, y: string = ''): Observable<any> {
    console.log(
      'https://www.omdbapi.com/?apikey=dce9ba46&s=' +
        encodeURIComponent(s) +
        '&page=' +
        p +
        '&y=' +
        y
    );
    return this.http.get(
      'https://www.omdbapi.com/?apikey=dce9ba46&s=' +
        encodeURIComponent(s) +
        '&page=' +
        p +
        '&y=' +
        y
    );
  }

  getFilm(id: string): Observable<any> {
    return this.http.get(
      'https://www.omdbapi.com/?apikey=dce9ba46&plot=full&i=' + id
    );
  }
}
