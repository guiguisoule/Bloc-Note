import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './model-service/auth.service';
import { OperateurData } from './model-service/operateur.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // operateur =new Operateur();
  erreur = 0;
  
  //declaration de l'operateur
  operateur = new OperateurData();

  constructor(
    private router: Router,
    private authService: AuthService) { }

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
  }

  /****************Methode de connexion */
  onLoggedin() { 

    this.authService.getOperateur(this.operateur.meloper).subscribe(
      (reponce: OperateurData) => {
        if(reponce.password == this.operateur.password){
          this.erreur = 0;
          this.authService.SignIn(reponce);
          this.router.navigate(['/dashboard']);
        }else{
          this.erreur = 1;
        }
      },
      (error) => {
        console.log(error);

      }
    );
  }

}
