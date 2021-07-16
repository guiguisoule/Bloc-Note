import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // operateur =new Operateur();
  erreur = 0;
  constructor(
    private router: Router) { }

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
    this.router.navigate(['/dashboard']);
    
    // this.authService.getOperateurFromDB(this.operateur.meloper).subscribe((usr:Operateur) =>
    //  { 
    //    if
    //     (usr.password==this.operateur.password)
    //     { this.authService.SignIn(usr); 
    //       this.router.navigate(['/dashboard']);
    //      }
    //     else this.erreur = 1; },(err) => console.log(err)); 
  }

}
