import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaitService {
  URL : string = "http://localhost:8082/sim2g/api/lait";

  constructor( private http: HttpClient) { }

  getLaitList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getLait(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createLait(lait: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, lait);
  }

  deleteLait(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
