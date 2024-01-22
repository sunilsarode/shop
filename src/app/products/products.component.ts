import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categories';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnDestroy{

  subscription: Subscription | undefined;

  products:Product[]=[];
  original:Product[]=[];
  categories$: Observable<Category[]>;
  selectedCategory: string | null = null;

  constructor(private productService:ProductService,private categoryService:CategoryService){

    this.subscription = this.productService
    .getAll()
    .subscribe((productData) => {
        this.products=[...productData]
        this.original =[...productData];
    });

    this.categories$= this.categoryService.getCategories()
  }


  onCardClick(categoryName: string): void {
    
    this.selectedCategory = categoryName === 'all' ? null : categoryName;

    this.products= categoryName ==='all' ?this.original :this.original.filter((product)=> product.category === categoryName);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
