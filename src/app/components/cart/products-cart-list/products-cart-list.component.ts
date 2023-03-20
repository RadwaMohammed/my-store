import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-cart-list',
  templateUrl: './products-cart-list.component.html',
  styleUrls: ['./products-cart-list.component.css']
})

export class ProductsCartListComponent implements OnInit {
  products: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.products = this.cartService.getCartList();
    this.total = this.cartService.getTotal();
  }

  updateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  removeProduct(id: number): void {
    this.cartService.removeProduct(id);
    // Get the products in cart after removing the product
    this.products = this.cartService.getCartList();
  }
}
