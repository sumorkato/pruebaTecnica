import { Injectable } from '@angular/core';
import {  Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localservice: LocalService,
    private router: Router
    ) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    { 
      
      if ( this.checkIfUserIsAuthenticated())
        {  
            return true
        }
        else{
            this.router.navigate(['/Login']);
            return false
        } 
    }
    checkIfUserIsAuthenticated() {
      return true
    }
}