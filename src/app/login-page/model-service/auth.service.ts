import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OperateurData } from './operateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  operateur = new OperateurData();

  public loggedOperateur: string;
  public isloggedIn: Boolean = true;
  public groupes: string;

  private listeOperateur: OperateurData[] = [
    {
      id: 1,
      nom: "test",
      prenom: "test",
      email: "test@mail.com",
      password: "123",
      date: new Date()
    }

  ];

  constructor( private http: HttpClient,
    private router: Router) { }

  getOperateurListe(){
    return this.listeOperateur;
  }

  SignUp(op : OperateurData){ 
  
    this.listeOperateur.push(op);
    this.isloggedIn = true; 
    this.loggedOperateur = op.email; 

    this.operateur.id = op.id;
    this.operateur.nom = op.nom;
    this.operateur.prenom = op.prenom;
    this.operateur.email = op.email;
    this.operateur.password = op.password;


    localStorage.setItem('loggedOperateur',this.loggedOperateur); 
    
    localStorage.setItem('isloggedIn',String(this.isloggedIn)); 
  }

  SignIn(email :string){ 
     
    this.isloggedIn = true;
    this.operateur = this.listeOperateur.find(user => user.email = email);
    this.loggedOperateur = this.operateur.email;
    localStorage.setItem('loggedOperateur',this.loggedOperateur); 
    
    localStorage.setItem('isloggedIn',String(this.isloggedIn)); 
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
