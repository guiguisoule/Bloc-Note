import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalTypeService {

  URL : string = "http://localhost:8082/sim2g/api";

  constructor( private http: HttpClient) { }

  getAnimalTypeList(): Observable<any>{
    return this.http.get<any[]>(`${this.URL}/animauxType/all`);
  }

  getAnimalType(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/animaltype/id/${id}`);
  }

  createAnimalType(pays: Object): Observable<Object> {
    return this.http.post(`${this.URL}/animaltype/create`, pays);
  }

  deleteAnimalType(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }
}