import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-quantity',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './product-quantity.component.html',
  styleUrl: './product-quantity.component.css'
})
export class ProductQuantityComponent {

  @Input() product: Product={}as Product;
  @Input() shoppingCart:ShoppingCart | undefined;

  constructor(private cartService:ShoppingCartService){

  }

 async addToCart() {
      this.cartService.addToCart(this.product)    
  }



  increaseQuant(){
      this.addToCart();
  }

  decreaseQuant(){
    this.cartService.decreaseQuant(this.product)
  }
}
