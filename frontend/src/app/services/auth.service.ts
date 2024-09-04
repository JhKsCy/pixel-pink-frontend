import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4001/api'
  
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
    })
  }

  constructor(private http: HttpClient) { }


  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem('userId', response.id);
      })
    );
  }

  susbcribe(name: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/suscribe`, { name, email })
  }

  getData(id: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get<any>(`${this.apiUrl}/data/${id}`, { headers })
  }

  updateData(id: string, name: string, lastName: string, phone: number, state: string, city: string, address: string, detail: string, observations: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.put<any>(`${this.apiUrl}/update-data/${id}`, { name, lastName, phone, state, city, address, detail, observations }, { headers })
  }

  deleteData(id: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.delete<any>(`${this.apiUrl}/delete-data/${id}`, { headers })
  }

  getToken() : string | null {
    return sessionStorage.getItem('token')
  }

  isLoggedIn() : boolean {
    return !!sessionStorage.getItem('token')
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }
}
