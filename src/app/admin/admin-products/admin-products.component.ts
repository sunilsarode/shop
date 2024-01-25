import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent implements OnDestroy {

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;


  myForm: FormGroup;

  subscription: Subscription | undefined;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['position', 'title', 'price', 'edit'];

  constructor(
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.subscription = this.productService
      .getAll()
      .subscribe((productData) => {
        productData = productData.map((item, index) => {
          return { ...item, position: index + 1 };
        });

        this.dataSource.data = [...productData];
      });

    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchTerms = filter.toLowerCase();
      const title = data.title.toLowerCase();

      // Check if the title contains the search terms
      return title.includes(searchTerms);
    };
    this.myForm = this.fb.group({
      search: [''], // This is your form control for the search input
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if(this.paginator)
    this.dataSource.paginator = this.paginator;
  }

  openForm() {
    this.router.navigate(['/add-new-products']);
  }
  editProduct(product: Product) {
    if(product.key)
    this.router.navigate(['/manage-products', product.key]);
  }

  applyFilter() {
    const searchValue: string = this.myForm.get('search')?.value;
    

    this.dataSource.filter = searchValue.trim().toLowerCase();
  }
}
