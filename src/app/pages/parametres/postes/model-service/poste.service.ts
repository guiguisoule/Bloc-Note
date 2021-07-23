import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  URL : string = "http://localhost:8082/sim2g/api/poste";

  constructor( private http: HttpClient) { }

  getPosteList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getPoste(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createPoste(poste: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, poste);
  }

  deletePoste(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
