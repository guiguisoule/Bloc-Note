import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VocationMarketService {

  URL : string = "http://localhost:8082/sim2g/api/vocation-marche";

  constructor( private http: HttpClient) { }

  getMarcketVocationList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getMarcketVocation(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createMarcketVocation(marcketType: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, marcketType);
  }

  deleteMarcketVocation(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
