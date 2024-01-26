import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthServiceService } from '../auth-service.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orders$: any;

  constructor(
    private order: OrderService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.orders$ = this.authService.user$.pipe(
      switchMap((user) => {
        return this.order.getOrderByUser(user?.uid);
      })
    )
    // .subscribe((order)=>{
    //     console.log(order);

    // });
  }

  viewOrder(item: any) {
    console.log(item);
  }
}
