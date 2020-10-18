import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ResponseLoginData, ResponseSummaryData } from '../_models/login-data';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(body: string): Observable<ResponseLoginData> {
    return this.httpClient.post<ResponseLoginData>(`${endpoint}/login`, body, {headers});
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getSummary(): Observable<ResponseSummaryData> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get<ResponseSummaryData>(`${endpoint}/freightsummary?queryOptions=\'\'&inProgress=true&pending=false`, {headers});
  }
}
