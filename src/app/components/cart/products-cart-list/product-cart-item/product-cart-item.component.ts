import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.css']
})

export class ProductCartItemComponent implements OnInit {
  @Input() product: Product;
  @Output() updateTotal: EventEmitter<void> = new EventEmitter();
  @Output() removeProduct: EventEmitter<number> = new EventEmitter();


  id: number = 0;
  quantity: number = 0;

  constructor(private cartService: CartService){

    // Initialize the product
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }

  }
  ngOnInit(): void {
    this.quantity = this.product.quantity;
  }

  updateTotalPrice(): void {
    this.updateTotal.emit();
  }

  // Update the quantity accourding to the user input
  updateQuantity(event: Event): void {
    // get the id of current product that user change its quantity
    this.id = this.product.id;
    this.quantity =  event.target && +(event.target as HTMLInputElement).value || this.quantity;
    this.cartService.updateProductQuantity(this.id, this.quantity);
    // Update the total price in cartList service
    this.cartService.getTotal();
    //Tell the parent cart list componenet that total price updated
    this.updateTotalPrice();
  }

  // Remove  product from the cart
  remove(id: number): void {
    if(confirm('Are you sure you want to delete this product?')) {
      this.removeProduct.emit(id);
      // Update the total price in cartList service
      this.cartService.getTotal();
      //Tell the parent cart list componenet that total price updated
      this.updateTotalPrice();
    }
  }
}
