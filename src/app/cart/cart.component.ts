import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  products: Product[] = [];
  total: number = 0;
  id: number = 0;
  quantity: number = 0;
  count: number = 0;

  // Form items
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor (private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.products = this.cartService.getCartList();
    this.total = this.cartService.getTotal(this.products);
  }

  // Update the quantity accourding to the user input
  updateQuantity(event: Event): void {
    // get the id of current product that user change its quantity
    this.id = event.target && +(event.target as HTMLInputElement).id || this.id;
    this.quantity = +(event.target as HTMLInputElement).value;
    this.cartService.updateProductQuantity(this.id, this.quantity);
    // Update the total price
    this.total = this.cartService.getTotal(this.products);
  }

  // Remove  product from the cart
  remove(id: number): void {
    if(confirm('Are you sure you want to delete this product?')) {
      this.products = this.cartService.removeProduct(id);
      // Update the total price
      this.total = this.cartService.getTotal(this.products);
    }
  }

  // Submit user form
  submitForm(): void {
    this.cartService.fullName = this.fullName;
    this.cartService.totalPrice = this.total;
    this.router.navigateByUrl('/confirm-success')
  }

  // Get the count of products in the cart
  getCount(): number {
    this.count = this.cartService.cartCount;
    return this.count;
  }
}
