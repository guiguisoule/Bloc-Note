import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodiciteEnquetteService {
 
  URL : string = "http://localhost:8082/sim2g/api/periodicite-Enquette";

  constructor( private http: HttpClient) { }

  getPeriodiciteEnquetteList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getPeriodiciteEnquette(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createPeriodiciteEnquette(marcketType: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, marcketType);
  }

  deletePeriodiciteEnquette(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
