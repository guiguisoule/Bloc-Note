import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeIntrantService {

  URL : string = "http://localhost:8082/sim2g/api/type-intrant";

  constructor( private http: HttpClient) { }

  getInputTypeList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getInputType(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createInputType(secteurs: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, secteurs);
  }

  deleteInputType(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
