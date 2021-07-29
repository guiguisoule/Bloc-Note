import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeAlerteService {

  URL : string = "http://localhost:8082/sim2g/api/Alertetype";

  constructor( private http: HttpClient) { }

  getAlerteTypeList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getAlerteType(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createAlerteType(alert: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, alert);
  }

  deleteAlerteType(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
