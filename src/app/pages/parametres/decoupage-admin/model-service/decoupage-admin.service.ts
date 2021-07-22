import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecoupageAdminService {

  URL : string = "http://localhost:8082/sim2g/api/admindecoup";

  constructor( private http: HttpClient) { }

  getDecoupageList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getDecoupage(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createDecoupage(decoupage: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, decoupage);
  }

  deleteDecoupage(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
