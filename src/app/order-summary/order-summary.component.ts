import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-summary',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
    @Input() cart:ShoppingCart | undefined
}
