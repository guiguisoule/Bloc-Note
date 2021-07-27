import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActeurService {

  URL : string = "http://localhost:8082/sim2g/api/acteur";

  constructor( private http: HttpClient) { }

  getActeurList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getActeur(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/byid/${id}`);
  }

  createActeur(acteur: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, acteur);
  }

  deleteActeur(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
