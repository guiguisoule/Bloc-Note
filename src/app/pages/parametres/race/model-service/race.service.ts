import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  URL : string = "http://localhost:8082/sim2g/api/race";

  constructor( private http: HttpClient) { }

  getRaceList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getRace(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createRace(race: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, race);
  }

  deleteRace(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}
