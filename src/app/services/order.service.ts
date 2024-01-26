import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  storeOrder(order: any) {
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrderByUser(userId: string | undefined) {
    console.log(userId);
    
    if (userId) {
      return this.db
        .list('/orders', (ref) => ref.orderByChild('userID').equalTo(userId))
        .valueChanges();
    }else{
      return of()
    }
    
  }
}
