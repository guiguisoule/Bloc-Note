import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  URL : string = "http://localhost:8082/sim2g/api/devise";

  constructor( private http: HttpClient) { }

  getDeviseList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getDevise(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/bycodedevise/${id}`);
  }

  createDevise(devise: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, devise);
  }

  deleteDevise(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
