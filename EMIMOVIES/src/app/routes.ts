import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DetailsComponent} from "./details/details.component";
import { FavoritedComponent } from './favorited/favorited.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup page',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path: 'favorited',
    component: FavoritedComponent,
    title: 'Favorite movies',
    canActivate: [AuthGuard],
  },
];

export default routeConfig;
