import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { IFilm } from '../interfaces/film.interface';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() film: IFilm | undefined;
  @Input() link: boolean = true;

  public defaultImg = 'https://images.rouxel.com/400/104387.jpg';

  constructor(private service: BaseService) {}

  addToFavoris(film: IFilm) {
    let films = JSON.parse(
      (localStorage.getItem('favoris') as string) || '[]'
    ) as IFilm[];
    if (localStorage.getItem('favoris') === null) {
      const filmJson = JSON.stringify([film]);
      localStorage.setItem('favoris', filmJson);
    } else {
      if (this.checkFavoris(film, films)) {
        films = films.filter((f: IFilm) => f.imdbID !== film.imdbID);
      } else {
        films.push(film);
      }
      localStorage.setItem('favoris', JSON.stringify(films));
    }
  }
  checkFavoris(film: IFilm, films: IFilm[] | null = null) {
    if (films === null)
      films = JSON.parse(
        (localStorage.getItem('favoris') as string) || '[]'
      ) as IFilm[];
    return films.some((f: IFilm) => f.imdbID === film.imdbID); // return true if film is in favoris
  }
}
