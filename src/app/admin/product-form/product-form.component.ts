import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/categories';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {

  categories: Category[] = [];

  myForm: FormGroup = new FormGroup({});
  id:string |null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe((product) => {
       
        
        // Initialize form with product values
        this.myForm.patchValue({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category, // Assuming product has a 'category' property
        });
      });
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d*(\.\d+)?$/),
          Validators.min(1),
        ],
      ],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/),
        ],
      ],
      category: ['', Validators.required],
    });

    this.categoryService
    .getCategories()
    .pipe(take(1))
    .subscribe((categoryArr) => {

      
      categoryArr.forEach((category) => {
        this.categories.push(category);
      });
    });
  }

  onSubmit() {
    if (this.myForm.valid) {

      if(this.id){
        this.productService.update(this.id,this.myForm.value)
      }else{
        this.productService.create(this.myForm.value);
      }
      
      this.router.navigate(['/manage-products']);
    } else {
      console.log('Form is invalid');
    }
  }

  deleteItem() {

    if(!confirm('Are you sure ?')){
      return;
    }

    if(this.id){
      this.productService.delete(this.id)
      this.router.navigate(['/manage-products']);
    }
   
   
  }
}
