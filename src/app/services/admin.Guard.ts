import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "app/login-page/model-service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor (private authService: AuthService, private router : Router) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
        if (this.authService.isAdmin()) 
            return true; 
        else {
            this.router.navigate(['app-forbidden']);
            return false; 
        } 
    }

}