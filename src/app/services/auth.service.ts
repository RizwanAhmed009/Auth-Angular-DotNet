import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7114/api/User/';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  login(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj);
  }
  SignOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  IsLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!; // ! used because it could be undefine
    console.log('decoded token,,,,,,=', jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }
  getfullRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
