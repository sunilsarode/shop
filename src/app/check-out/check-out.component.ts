import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { AuthServiceService } from '../auth-service.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";

@Component({
    selector: 'app-check-out',
    standalone: true,
    templateUrl: './check-out.component.html',
    styleUrl: './check-out.component.css',
    imports: [ReactiveFormsModule, CommonModule, OrderSummaryComponent]
})
export class CheckOutComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  subscription: Subscription | undefined;
  userSubs: Subscription | undefined;
  cart: ShoppingCart | undefined;
  userId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private cartService: ShoppingCartService,
    private orderServ: OrderService,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
    });
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe((cart) => {
      this.cart = cart;
    });

    this.userSubs = this.authService.user$.subscribe((user) => {
      this.userId = user?.uid;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  async onSubmit() {
   
    let order = new Order(this.userId, this.myForm.value, this.cart);

    let result = await this.orderServ.storeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
