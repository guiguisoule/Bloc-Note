import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OperateurData } from './operateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  operateur: OperateurData;
  public loggedOperateur: string;
  public isloggedIn: Boolean = true;
  public groupes: string;

  URL : string = "http://localhost:8082/sim2g/api/operateur";

  constructor( private http: HttpClient,
    private router: Router) { }

  getOperateur(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/email/${id}`);
  }

  SignIn(operateur :OperateurData){ 
    this.loggedOperateur = operateur.meloper; 
    this.isloggedIn = true;
    this.groupes = operateur.idgroupe; 
    this.operateur = operateur;
    localStorage.setItem('loggedOperateur',this.loggedOperateur); 
    
    localStorage.setItem('isloggedIn',String(this.isloggedIn)); 
  }


  isAdmin():Boolean{
    if(this.groupes === 'ADM'){
      return true;
    }else{
      return false;
    }
  }



  //**********Methode de deconnection */
  logout() {
    this.isloggedIn = false;
    this.loggedOperateur = undefined; this.groupes = undefined;
    localStorage.removeItem('loggedOperateur');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['login']);
  }
}
