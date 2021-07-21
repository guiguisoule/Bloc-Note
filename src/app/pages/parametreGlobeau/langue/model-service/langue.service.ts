import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangueService {
  URL : string = "http://localhost:8082/sim2g/api/langue";

  constructor( private http: HttpClient) { }

  getLangueList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getLangue(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/sigle/${id}`);
  }

  createLangue(langue: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, langue);
  }

  deleteLangue(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
