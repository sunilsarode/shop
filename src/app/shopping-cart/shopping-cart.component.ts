import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { CommonModule } from '@angular/common';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';
import { ProductQuantityComponent } from "../product-quantity/product-quantity.component";
import { MatButtonModule } from '@angular/material/button';



@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
    imports: [CommonModule, ProductQuantityComponent,MatButtonModule]
})
export class ShoppingCartComponent implements OnInit,OnDestroy {
  totalItemsCount: number=0; 
  subscription:Subscription | undefined
  cartItems: ShoppingCartItem[]=[];
  totalprice: number =0;
  cart: ShoppingCart | undefined;
  


  constructor(private cartService:ShoppingCartService){}

  async ngOnInit() {
    const cart$  =(await this.cartService.getCart());
    this.subscription=cart$.subscribe((cart)=>{
      this.totalItemsCount=cart.totalItemsCount
      this.cartItems=cart.cartItems;
      this.totalprice=cart.totalPrice
      this.cart=cart
    })
  }

  clearCart(){
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
