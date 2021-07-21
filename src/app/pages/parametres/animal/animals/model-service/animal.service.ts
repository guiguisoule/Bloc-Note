import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  URL : string = "http://localhost:8082/sim2g/api";

  constructor( private http: HttpClient) { }

  getAnimalList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/animaux/all`);
  }

  getAnimal(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/animal/byid/${id}`);
  }

  createAnimal(animal: Object): Observable<Object> {
    return this.http.post(`${this.URL}/animal/create`, animal);
  }

  deleteAnimal(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}