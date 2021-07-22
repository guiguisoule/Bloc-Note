import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodiciteMarketService {

  URL : string = "http://localhost:8082/sim2g/api/periodicite-marche";

  constructor( private http: HttpClient) { }

  getPeriodiciteMarketList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getPeriodiciteMarket(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createPeriodiciteMarket(marcketType: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, marcketType);
  }

  deletePeriodiciteMarket(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
