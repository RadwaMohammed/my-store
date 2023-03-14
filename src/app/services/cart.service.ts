import { Injectable } from '@angular/core';
import { Product } from './../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: Product[] = [];
  constructor() { }

  // Get a list of products in the cart
  getCartList(): Product[] {
    return this.cartList;
  }

  // Add a product to the cart
  addProduct(product: Product, quantity: number): Product[] {
    // Check i the product already exist in the cart
    const isProductExist = this.cartList.find((p: Product): boolean => p.id === product.id);
    if (isProductExist) {
      this.cartList.map((p: Product): void => {
        if (p.id === product.id) {
          // Sm the new quntity to the quantity of the product
          p.quantity +=  quantity;
        }
      })
    } else {
      // add quntity to the product
      product.quantity = quantity;
      this.cartList.push(product);
    }
    console.log(this.cartList);
    return this.cartList;
  }

  //Get the total price
  getTotal(): number {
    return +this.cartList
      .reduce((sum: number, product: Product) => (sum + (product.price * product.quantity)), 0)
      .toFixed(2)
  }
}
