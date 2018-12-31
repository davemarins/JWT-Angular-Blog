import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login'
    // signup: 'http://localhost:8000/api/signup'
  }

  constructor() { }

  handle(token) {
    this.set(token);
    // console.log(this.isValid());
  }

  set(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    // localStorage.setItem('token', token);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('access_token_expire', expireDate.toString());
  }

  getExpireDate() {
    return localStorage.getItem('access_token_expire');
  }

  get() {
    return localStorage.getItem('access_token');
  }

  remove() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expire');
    // not always it's used because of the nature of expiring of a token
    localStorage.removeItem('refresh_token');
  }

  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true: false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
