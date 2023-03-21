import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IFilm } from '../interfaces/film.interface';
import { IFilmFull } from '../interfaces/filmFull.interface';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent {
  paramsId: string = '';
  film?: IFilmFull;
  filmCard?: IFilm;
  loading: boolean = true;
  constructor(private router: ActivatedRoute, private service: BaseService) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.paramsId = params['id'];
      this.getFilm(this.paramsId);
    });
  }

  getFilm(id: string) {
    console.log(id);
    this.service.getFilm(id).subscribe((data: any) => {
      if(data.Response === "False") {
        this.loading = false;
        return;
      }
      this.film = data;
      this.filmCard = {
        Title: data.Title,
        Year: data.Year,
        imdbID: data.imdbID,
        Type: data.Type,
        Poster: data.Poster,
      };
      console.log(data);
      this.loading = false;
    });
  }
}
