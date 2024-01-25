//import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../services/user.service';
import { Observable, filter, of, switchMap, take } from 'rxjs';
import { User } from '../models/oshop-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { MatBadgeModule } from '@angular/material/badge';
import { log } from 'console';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  appUser: User | undefined;
 
  
  totalItemsCount: number=0;
  

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserService,
    private cartService: ShoppingCartService
  ) {
    this.authService.user$
      .pipe(switchMap((user) => this.userService.getUser(user?.uid)))
      .subscribe((appUser) => (this.appUser = appUser));
  }

  async ngOnInit() {
    const cart$  =(await this.cartService.getCart());
    cart$.subscribe((cart)=>{
      
      this.totalItemsCount =cart.totalItemsCount
    })
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }

  onClick() {
    this.router.navigate(['/shopping-cart'])
  }
}
