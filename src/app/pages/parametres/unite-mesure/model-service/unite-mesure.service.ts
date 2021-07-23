import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniteMesureService {

  
  URL : string = "http://localhost:8082/sim2g/api/unite-mesure";

  constructor( private http: HttpClient) { }

  getUniteMesureList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getUniteMesure(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createUniteMesure(uniteMesure: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, uniteMesure);
  }

  deleteUniteMesure(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
