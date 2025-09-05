import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalService } from '../servicios/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionGuard implements CanActivate {
  subs= new Subscription();
  public permission: any = []; 
  constructor(
   private localservice: LocalService,
   //private securityServices: SecurityRolService,
   private router: Router
  ){
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  { 
    return true
  }
  checkIfUserIsAuthenticated() {
    return true
  }
  
}
