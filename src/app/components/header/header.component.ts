import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'My Store';
  count: number = 0;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.count = this.cartService.cartCount;
  }
  // Get the count of products in the cart
  getCount (): number {
    this.count = this.cartService.cartCount;
    return this.count;
  }
}
