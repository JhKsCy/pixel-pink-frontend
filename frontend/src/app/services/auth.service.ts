import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4001/api'

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
  }

  susbcribe(name: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/suscribe`, { name, email })
  }

  getToken() : string | null {
    return sessionStorage.getItem('token')
  }

  isLoggedIn() : boolean {
    return !!sessionStorage.getItem('token')
  }

  logout(): void {
    sessionStorage.removeItem('token')
  }
}
