import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/login-page/model-service/auth.service';
import { OperateurData } from 'app/login-page/model-service/operateur.model';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  operateur : OperateurData;

  constructor(private authService: AuthService) {
    this.operateur = authService.operateur;
   }

  ngOnInit() {
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
