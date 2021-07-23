import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  URL : string = "http://localhost:8082/sim2g/api/association";

  constructor( private http: HttpClient) { }

  getAssociationList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getAssociation(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createAssociation(association: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, association);
  }

  deleteAssociation(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}