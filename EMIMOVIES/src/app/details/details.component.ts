import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../Model/film';
import { FilmService } from '../Services/film.service';
import { Filmdetails } from '../Model/filmdetails';
import { Genre } from '../Model/genre';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersloginService } from '../Services/users.login.service';
import { GlobalVariablesService } from '../global-variables.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  isAuthenticated = false;
  userSub: Subscription;
  filmdetails!: Filmdetails;
  genre!: Genre[];
  comments: any[] = [];
  newComment: any = { text: '', person: '', idFilm: null }; // Ajoutez idFilm

  constructor(
    private filmservice: FilmService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private userLoginService : UsersloginService,
    private globalVarService:GlobalVariablesService
  ) {}
  getPopularMoviesById() {
    this.filmservice
      .getPopularMoviesById(this.activatedRoute.snapshot.params['id'])
      .subscribe((result) => {
        this.filmdetails = result;
        this.genre = this.filmdetails.genres;
        this.newComment.idFilm = this.filmdetails.id; // Affectez l'ID du film actuel
        console.log('Filmdetails', this.filmdetails);
        console.log('Genre', this.genre);
        this.getCommentsByFilmId(); // Chargez les commentaires pour ce film
      });
  }
  getCommentsByFilmId() {
    this.http
      .get<any[]>(`http://localhost:8081/byFilm/${this.filmdetails.id}`)
      .subscribe(
        (response) => {
          this.comments = response; // Mettez à jour la liste des commentaires
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
  }

  addComment() {
    if (this.isAuthenticated){
    this.http.post<any>('http://localhost:8081/add', this.newComment).subscribe(
      (response) => {
        // Réinitialisez le formulaire et rafraîchissez les commentaires après l'ajout
        this.newComment.text = '';
        this.getCommentsByFilmId();
        alert('Comment Added');
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }
  else {
    {
      const dialogRef = this.dialog.open(DialogLoginComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/signup']);
        }
      });
    }
  }
}

  ngOnInit(): void {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log('user', user);
      this.isAuthenticated = !!user;
    });
    this.getPopularMoviesById();
    console.log(this.activatedRoute.snapshot.params['id']);
  }
  addToFavorites() {
    if (this.isAuthenticated) {
      const favoriteFilm = {
        title: this.filmdetails.title,
        email:this.globalVarService.getLoggedEmail()
      };
      this.http
        .post<any>('http://localhost:8081/addFavorite', favoriteFilm)
        .subscribe(
          (response) => {
            console.log('Film ajouté aux favoris!', response);
            alert('movie added to your favorites');
          },
          (error) => {
            console.error("Erreur lors de l'ajout aux favoris:", error);
          }
        );
    } else {
      {
        const dialogRef = this.dialog.open(DialogLoginComponent);

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.router.navigate(['/signup']);
          }
        });
      }
    }
  }
  
}
