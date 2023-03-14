import { Component, Input, OnInit } from '@angular/core';
import { Product } from './../models/Product';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity: string = '1'; // Default value is 1

  constructor(private cartService: CartService) {
    // Initialize the product
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }

  }

  ngOnInit(): void {

  }
  // Update the quantity accourding to the user select option
  updateQuantity(event: Event): void {
    this.quantity = event.target && (event.target as HTMLSelectElement).value || this.quantity;
  }

  // Adding a product to the cart
  addProductToCart(): void {
    this.cartService.addProduct(this.product, +this.quantity);
    alert('Added to cart!!!');
  }
}
