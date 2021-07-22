import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Niveau3Service {
  URL : string = "http://localhost:8083/sim3g/api/niveau3";

  constructor( private http: HttpClient) { }

  getNiveau3List(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getNiveau3(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createNiveau3(niveau3: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, niveau3);
  }

  deleteNiveau3(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
