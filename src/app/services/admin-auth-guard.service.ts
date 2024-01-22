import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {
  

  constructor(private auth:AuthServiceService,private userServ:UserService) { 

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(switchMap((user)=> this.userServ.getUser(user?.uid)),
    map((user)=>user.isAdmin))
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AdminAuthGuardService).canActivate(next, state);
}