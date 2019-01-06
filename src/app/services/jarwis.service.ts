import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Subscriber } from 'src/app/Subscriber';
import { Observable } from 'rxjs';
import { Newsletter } from 'src/app/Newsletter';
import { Article } from '../Article';

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

  getArticleDraft(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseurl}/getarticledraft`);
  }

  saveArticleDraft(data) {
    return this.http.post(`${this.baseurl}/savearticledraft`, data);
  }

  deleteArticleDraft() {
    return this.http.get(`${this.baseurl}/deletearticledraft`);
  }

  // Stats

  getSubscribersStats() {
    return this.http.get(`${this.baseurl}/subscriberstats`);
  }

  getSubscribersStatsGroupBy() {
    return this.http.get(`${this.baseurl}/subscriberstatsgroupby`);
  }

}
