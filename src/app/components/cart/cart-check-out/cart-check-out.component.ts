import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-check-out',
  templateUrl: './cart-check-out.component.html',
  styleUrls: ['./cart-check-out.component.css']
})
export class CartCheckOutComponent implements OnInit {
  products: Product[] = [];
  count: number = 0;
    // Form items
    fullName: string = '';
    address: string = '';
    cardNumber: string = '';
  constructor (private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.products = this.cartService.getCartList();

 }
 isCartListEmpty(): boolean {
  this.products = this.cartService.getCartList();
  return !this.products.length;
 }
  // Submit user form
  submitForm(): void {
    this.cartService.fullName = this.fullName;
    this.router.navigateByUrl('/confirm-success')
  }

  // Get the count of products in the cart
  getCount(): number {
    this.count = this.cartService.cartCount;
    return this.count;
  }
}
