import { Component } from '@angular/core';
import { IFilm } from '../interfaces/film.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favoris: IFilm[] = [];
  favorisShow: IFilm[] = [];
  yearList: number[] = [];
  search: string = '';
  year: string = '';
  constructor() {}

  ngOnInit(): void {
    this.yearList = Array.from(Array(2023 - 1895).keys()).map((i) => 2023 - i);
    this.favoris = JSON.parse(
      (localStorage.getItem('favoris') as string) || '[]'
    ) as IFilm[];
    this.favorisShow = this.favoris;
  }

  loadFavoris() {
    if (localStorage.getItem('favoris') != JSON.stringify(this.favoris)) {
      this.favoris = JSON.parse(
        (localStorage.getItem('favoris') as string) || '[]'
      ) as IFilm[];
      this.favorisShow = this.favoris;
    }
  }

  filter(search = '', year = '') {
    if (!search && !year) this.favorisShow = this.favoris;
    this.favorisShow = this.favoris.filter(
      (f: IFilm) =>
        f.Title.toLowerCase().includes(search.toLowerCase()) &&
        f.Year.includes(year)
    );
  }
}
