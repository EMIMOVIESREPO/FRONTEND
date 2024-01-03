import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../Model/film';
import { FilmService } from '../Services/film.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-favorited',
  standalone: true,
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css'],
  providers: [FilmService],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
})
export class FavoritedComponent implements OnInit {
  favoriteFilms: Film[] = [];


  constructor(private filmService: FilmService, private http: HttpClient, private globalVarService : GlobalVariablesService) {}
   

  ngOnInit(): void {
    const loggedEmail = this.globalVarService.getLoggedEmail();
    if (loggedEmail) {
      this.getFavoriteFilms(loggedEmail);
    }
  }
  getUrl(name: any) {
    return this.filmService.getimagefromapi(name);
  }

  getFavoriteFilms(loggedEmail: string) {
    this.http.get<any[]>(`http://localhost:8081/favoris/${loggedEmail}`).subscribe(
      (response: any[]) => {
        if (response && response.length > 0) {
          response.forEach((favorite: any) => {
            const title: string = favorite.title;
  
            const exists = this.favoriteFilms.some((film) => film.title === title);
  
            if (!exists) {
              this.filmService.getMovieByTitle(title).subscribe(
                (movieDetails: any[]) => {
                  if (movieDetails && movieDetails.length > 0) {
                    const movieDetail = movieDetails[0];
                    const film: Film = {
                      id: movieDetail.id,
                      title: movieDetail.title,
                      adult: movieDetail.adult,
                      backdrop_path: movieDetail.backdrop_path,
                      genre_ids: movieDetail.genre_ids,
                      original_language: movieDetail.original_language,
                      original_title: movieDetail.original_title,
                      overview: movieDetail.overview,
                      popularity: movieDetail.popularity,
                      poster_path: movieDetail.poster_path,
                      release_date: movieDetail.release_date,
                      video: movieDetail.video,
                      vote_average: movieDetail.vote_average,
                      vote_count: movieDetail.vote_count,
                    };
                    this.favoriteFilms.push(film);
                    console.log(this.favoriteFilms);
                  }
                },
                (error) => {
                  console.error('Error fetching movie details:', error);
                }
              );
            }
          });
        } else {
          console.log('Aucun film favori trouvé.');
          console.log(loggedEmail);
        }
      },
      (error) => {
        console.error('Error fetching favorite films:', error);
      }
    );
  }
  
  RemoveFromFavorites(title: string): void {
    this.http
      .delete(`http://localhost:8081/deleteFavorie/${title}`)
      .subscribe(
        () => {
          // La suppression a réussi
          console.log(`Film "${title}" supprimé des favoris.`);
          // Mettre à jour la liste des favoris
          this.favoriteFilms = this.favoriteFilms.filter(
            (film) => film.title !== title
          );
        },
        (error) => {
          console.error('Erreur lors de la suppression du favori:', error);
        }
      );
  }

}
