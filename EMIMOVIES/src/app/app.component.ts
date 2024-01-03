import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FilmService} from "./Services/film.service";
import { RouterModule } from '@angular/router';
import { HomeFilmComponent } from "./home-film/home-film.component";
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFabButton } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import{MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { FavoritedComponent } from './favorited/favorited.component';
import { LoginComponent } from './login/login.component';
import { UsersloginService } from './Services/users.login.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    RouterModule,
    HomeFilmComponent,
    MatDialogModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'movie-app';
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private filmService: FilmService,
    private dialog: MatDialog,
    private router: Router,
    private userLoginService: UsersloginService
  ) {}
  ngOnInit() {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log('user', user);
      this.isAuthenticated = !!user;
    });
  }
  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(['/login']);
  }


openLoginDialog() {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '1000px'; // Set the width as needed
  dialogConfig.height = '500px'; // Set the height as needed
  dialogConfig.position = {
    bottom: '100px', // Modifier ces valeurs pour ajuster la position
    left: '250px' // Modifier ces valeurs pour ajuster la position
  };
  dialogConfig.panelClass = 'custom-dialog';

  this.dialog.open(LoginComponent, dialogConfig);
  
}

  
}
