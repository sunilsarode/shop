import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { ProductQuantityComponent } from "../../product-quantity/product-quantity.component";

@Component({
    selector: 'product-card',
    standalone: true,
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
    imports: [MatCardModule, CommonModule, MatButtonModule, ProductQuantityComponent]
})
export class ProductCardComponent {


  @Input() product: Product={}as Product;
  @Input() shoppingCart:ShoppingCart | undefined;

  constructor(private cartService:ShoppingCartService){

  }

 async addToCart() {
      this.cartService.addToCart(this.product)    
  }
}
