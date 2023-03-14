import { Component, OnInit } from '@angular/core';
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
  constructor (private cartService: CartService) {}
  ngOnInit(): void {
    this.products = this.cartService.getCartList();
    this.total = this.cartService.getTotal(this.products);

  }
    // Update the quantity accourding to the user select option
    updateQuantity(event: Event): void {
      // get the id of current product that user change its quantity
      this.id = event.target && +(event.target as HTMLSelectElement).id || this.id;
      this.products.map((product: Product): void => {
        if (product.id === this.id) {
          // Sm the new quntity to the quantity of the product
          product.quantity =  +(event.target as HTMLSelectElement).value;
        }
      })
      this.total = this.cartService.getTotal(this.products);
    }
}
