import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'app/services/notifications.service';
import { AuthService } from './model-service/auth.service';
import { OperateurData } from './model-service/operateur.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  //declaration de l'operateur
  operateur = new OperateurData();
  listeOperateur: OperateurData[];
  isAuth : boolean = true;
  isSignUp: boolean = true;
  alertMess : string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginAlert: NotificationsService) { }

  ngOnInit(): void {
    
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    this.listeOperateur = this.authService.getOperateurListe();
  }

  /****************Methode de connexion */
  onSignIn() { 

    let reponce = this.verifierOperateurMail(this.operateur.email);
    if(reponce){
      let rep = this.verifierOperateurPass(this.operateur.password);
      if(rep){
        this.authService.SignIn(this.operateur.email);
        this.isAuth = true;
        this.router.navigate(['/bloc-note']);
        
      }else{
        this.isAuth = false;
      }
    }else{
      this.isAuth = false;
    }
    
  }

  onSignUp() { 

    let reponce = this.verifierOperateurMail(this.operateur.email);
    if(reponce){
      this.isSignUp = false;
    }else{

      this.authService.SignUp(this.operateur);
      this.isAuth = true;
      this.isSignUp = true;
      this.router.navigate(['/bloc-note']);
    }
    
  }

  verifierOperateurMail(mail: string): boolean {
    let i = 0;
    let isAuth = false;
    this.listeOperateur.forEach(element => {
      if(element.email != mail){
        i++;
      }else{
        isAuth = true;
      }
    });
    return isAuth;
  }

  verifierOperateurPass(pass: string): boolean {
    let i = 0;
    let isAuth = false;
    this.listeOperateur.forEach(element => {
      if(element.password != pass){
        i++;
      }else{
        isAuth = true;
      }
    });
    return isAuth;
  }
}
