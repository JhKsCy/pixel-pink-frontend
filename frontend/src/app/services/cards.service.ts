import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl= "http://localhost:4001/api"

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
    })
  }

  newProduct(name: string, price: number, description: string, clotheCollection: string, available: boolean, imgA: string, imgB: string, imgC: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post<any>(`${this.apiUrl}/new-product`, { name, price, description, clotheCollection, available, imgA, imgB, imgC }, { headers })
  }

  updateProduct(id: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.put<any>(`${this.apiUrl}update-product/${id}`, { headers })
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-product/${id}`)
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all-products`)
  }
}



