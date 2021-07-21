import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  URL : string = "http://localhost:8082/sim2g/api/pays";

  constructor( private http: HttpClient) { }

  getPaysList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getPays(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/sigle/${id}`);
  }

  createPays(pays: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, pays);
  }

  deletePays(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
