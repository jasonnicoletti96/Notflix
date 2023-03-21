import { Component } from '@angular/core';
import { IFilm } from '../interfaces/film.interface';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'notflix';
  initFilm?: IFilm[];
  listFilm?: IFilm[];
  search: string = '';
  year: string = '';
  pagination: number = 1;
  nb: number = 1;
  yearList: number[] = [];
  bulleActive: boolean = false;
  loading: boolean = false;
  constructor(private service: BaseService) {}

  ngOnInit() {
    this.getFilms(this.search);
    this.yearList = Array.from(Array(2023 - 1895).keys()).map((i) => 2023 - i);
  }

  getFilms(s: string = 'aaa', y: string = '') {
    if (y.length === 4 && s.length < 3) {
      // if year is selected and search is < 3 -> show suggestions by year only
      this.service.getFilms('aaa', this.pagination, y).subscribe((data) => {
        this.listFilm = data.Search;
      });
    }
    if (s.length < 3 && s.length > 0) {
      this.year = '';
      this.listFilm = this.initFilm;
      return;
    } else if (s.length === 0) {
      this.year = '';
      // if search is empty
      if (this.initFilm) {
        // if year is empty -> show suggestions
        this.listFilm = this.initFilm;
        return;
      }
      s = 'aaa';
    }
    this.pagination = 1;
    this.service.getFilms(s, this.pagination, y).subscribe((data) => {
      if (!this.initFilm) {
        this.initFilm = data.Search;
      }
      this.listFilm = data.Search;
      this.nb = data.totalResults;
    });
  }

  addMore() {
    this.pagination++;
    let s = this.search.length > 2 ? this.search : 'aaa';
    this.loading = true;
    this.service
      .getFilms(s, this.pagination, this.year)
      .subscribe((data: any) => {
        if (!data.Search) return;
        this.listFilm?.push(...data.Search);
      });
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 300);
    this.loading = false;
  }
}
