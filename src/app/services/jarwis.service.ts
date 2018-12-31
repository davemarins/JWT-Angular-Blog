import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Subscriber } from 'src/app/subscriber';
import { Observable } from 'rxjs';
import { Newsletter } from 'src/app/newsletter';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseurl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private Token: TokenService) { }

  // Basic APIs

  login(data) {
    return this.http.post(`${this.baseurl}/login`, data);
  }

  logout() {
    return this.http.post(`${this.baseurl}/logout`, null);
  }

  /*
  signup(data) {
    return this.http.post(`${this.baseurl}/signup`, data);
  }
  */

  // Password reset APIs

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseurl}/sendpasswordresetlink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseurl}/resetpassword`, data);
  }

  // Subscribers APIs

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.baseurl}/subscribers`);
  }

  unsubscribe(data) {
    return this.http.post(`${this.baseurl}/unsubscribe`, data);
  }

  subscribe(data) {
    return this.http.post(`${this.baseurl}/subscribe`, data);
  }

  // Newsletters APIs

  getNewsletterDraft(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.baseurl}/getnewsletterdraft`);
  }

  saveNewsletterDraft(data) {
    return this.http.post(`${this.baseurl}/savenewsletterdraft`, data);
  }

  getNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.baseurl}/getnewsletters`);
  }

  sendNewsletter(data) {
    return this.http.post(`${this.baseurl}/sendnewsletter`, data);
  }

  deleteDraft() {
    return this.http.get(`${this.baseurl}/deletedraft`);
  }

  // Blog articles APIs

}
