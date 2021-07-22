import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeMarcheService {

  URL : string = "http://localhost:8082/sim2g/api/marcketType";

  constructor( private http: HttpClient) { }

  getMarcketTypeList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getMarcketType(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/sigle/${id}`);
  }

  createMarcketType(marcketType: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, marcketType);
  }

  deleteMarcketType(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
