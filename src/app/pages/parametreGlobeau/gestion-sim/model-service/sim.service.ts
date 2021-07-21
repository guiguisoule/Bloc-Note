import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimService {
  URL : string = "http://localhost:8082/sim2g/api/sim";

  constructor( private http: HttpClient) { }

  getSimList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getSim(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/sigle/${id}`);
  }

  createSim(sim: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, sim);
  }

  deleteSim(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
