import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariablesService {
  loggedEmail: string | null = null;

  setLoggedEmail(email: string) {
    this.loggedEmail = email;
  }

  getLoggedEmail(): string | null {
    return this.loggedEmail;
  }
}
