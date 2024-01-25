import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categories';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [MatCardModule, CommonModule, MatButtonModule, ProductCardComponent],
})
export class ProductsComponent implements OnDestroy, OnInit {
  subscription: Subscription | undefined;
  cartSubscription: Subscription | undefined;

  products: Product[] = [];
  original: Product[] = [];
  categories$: Observable<Category[]>;
  selectedCategory: string | null = null;
  cart: ShoppingCart | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService
  ) {
    this.subscription = this.productService
      .getAll()
      .subscribe((productData) => {
        this.products = [...productData];
        this.original = [...productData];
      });

    this.categories$ = this.categoryService.getCategories();
  }
  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(
      (cart) => {
        this.cart = cart;
      }
    );
  }

  onCardClick(categoryName: string): void {
    this.selectedCategory = categoryName === 'all' ? null : categoryName;

    this.products =
      categoryName === 'all'
        ? this.original
        : this.original.filter((product) => product.category === categoryName);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }
}
