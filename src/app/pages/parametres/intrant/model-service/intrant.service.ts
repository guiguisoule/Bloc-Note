import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntrantService {

  URL : string = "http://localhost:8082/sim2g/api/input";

  constructor( private http: HttpClient) { }

  getInputList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/all`);
  }

  getInput(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/id/${id}`);
  }

  createInput(input: Object): Observable<Object> {
    return this.http.post(`${this.URL}/create`, input);
  }

  deleteInput(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}