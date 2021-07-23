import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  URL : string = "http://localhost:8082/sim2g/api/partenaire";

  constructor( private http: HttpClient) { }

  getPartenaireList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getPartenaire(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createPartenaire(partenaire: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, partenaire);
  }

  deletePartenaire(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
