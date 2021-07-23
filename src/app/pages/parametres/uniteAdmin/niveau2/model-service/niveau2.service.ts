import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Niveau2Service {
  URL : string = "http://localhost:8082/sim2g/api/admin_niv2";

  constructor( private http: HttpClient) { }

  getNiveau2List(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getNiveau2(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createNiveau2(niveau2: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, niveau2);
  }

  deleteNiveau2(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
