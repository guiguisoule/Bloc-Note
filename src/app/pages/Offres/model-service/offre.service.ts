import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  URL : string = "http://localhost:8082/sim2g/api/offre";

  constructor( private http: HttpClient) { }

  getOffreList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getOffreAchatList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/type_achat`);
  }

  getOffreVenteList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/type_vtn`);
  }

  getOffre(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createOffre(sim: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, sim);
  }

  validerOffre(id: string): Observable<Object> {
    return this.http.post(`${this.URL}/valider`, id);
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
