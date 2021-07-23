import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecteursService {

  
  URL : string = "http://localhost:8082/sim2g/api/periodicite-Enquette";

  constructor( private http: HttpClient) { }

  getSecteursList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getSecteurs(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createSecteurs(secteurs: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, secteurs);
  }

  deleteSecteurs(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
