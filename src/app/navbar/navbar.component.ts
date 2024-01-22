//import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../services/user.service';
import { filter, switchMap } from 'rxjs';
import { User } from '../models/oshop-user';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
  appUser:User|undefined;

  

  constructor(private router: Router,private authService:AuthServiceService,private userService:UserService) {
    this.authService.user$.pipe(switchMap((user)=> this.userService.getUser(user?.uid)))
    .subscribe((appUser)=>this.appUser =appUser)
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout() {
      this.authService.logout()
  }
}
