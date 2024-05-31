import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}

  canActivate() {
    // if not authorized, go to login page
    if (!this.getAuth()) {
      this.router.navigate(['login']);
      return;
    }
  }

  setAuth(auth: boolean) {
    if (auth) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }
  getAuth() {
    let auth = false;
    localStorage.getItem('isLoggedIn') == 'true'
      ? (auth = true)
      : (auth = false);
    return auth;
  }
  setUser(user: string) {
    if (!user) {
      return;
    }
    localStorage.setItem('user', user);
  }
  removeUser() {
    localStorage.removeItem('user');
  }
  getUserSession() {
    const user = localStorage.getItem('user');
    return user;
  }
}
