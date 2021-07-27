import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Questionnaire3Service {

  URL : string = "http://localhost:8082/sim2g/api/q2";

  constructor( private http: HttpClient) { }

  getQ2List(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getQ2(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createQ2(q2: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, q2);
  }

  deleteQ2(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
