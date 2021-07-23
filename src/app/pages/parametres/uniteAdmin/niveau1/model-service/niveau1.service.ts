import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Niveau1Service {
  
  URL : string = "http://localhost:8082/sim2g/api/admin_niv1";

  constructor( private http: HttpClient) { }

  getNiveau1List(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getNiveau1(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createNiveau1(niveau1: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, niveau1);
  }

  deleteNiveau1(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
