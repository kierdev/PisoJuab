import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  setAuth(auth: boolean) {
    if (auth) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }
  setUser(user: string) {
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
