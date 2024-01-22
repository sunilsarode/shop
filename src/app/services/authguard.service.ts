import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService{

  constructor(private auth:AuthServiceService,private router:Router){

  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(map((user)=>{
      if(user) return true;
      this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url}});
      return false;
    }))
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthguardService).canActivate(next, state);
}