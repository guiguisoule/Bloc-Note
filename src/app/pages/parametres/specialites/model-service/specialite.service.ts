import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  URL : string = "http://localhost:8082/sim2g/api/specialite";

  constructor( private http: HttpClient) { }

  getSpecialiteList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getSpecialite(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createSpecialite(pays: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, pays);
  }

  deleteSpecialite(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}