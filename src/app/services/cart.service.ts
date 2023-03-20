import { Injectable } from '@angular/core';
import { Product } from './../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: Product[] = [];
  cartCount: number = 0;
  // Get user full name
  fullName: string = '';
  totalPrice: number = 0;

  constructor() { }

  // Get a list of products in the cart
  getCartList(): Product[] {
    return this.cartList;
  }

  // Get count of products in the cart
  getCartCount(): number {
    return this.cartList.reduce((acc: number, p: Product) => (acc + p.quantity), 0);
  }

  // Add a product to the cart
  addProduct(product: Product, quantity: number): Product[] {
    // Check if the product already exist in the cart
    const isProductExist = this.cartList.find((p: Product): boolean => p.id === product.id);
    if (isProductExist) {
      this.cartList.map((p: Product): void => {
        if (p.id === product.id) {
          // Sum the new quntity to the quantity of the product
          p.quantity +=  quantity;
        }
      })
    } else {
      // add quntity to the product
      product.quantity = quantity;
      this.cartList.push(product);
    }
    // Update the cart count
    this.cartCount = this.getCartCount();
    return this.cartList;
  }

  // Update the quantity
  updateProductQuantity(id: number, quantity: number): Product[] {
    this.cartList.map((product: Product): void => {
      if (product.id === id) {
        // Update the quantity of the product
        product.quantity =  quantity;
      }
    })
    // Update the cart count
    this.cartCount = this.getCartCount();
    return this.cartList;
  }

  // Add a product to the cart
  removeProduct(id: number): Product[] {
  this.cartList = this.cartList
    .filter((product: Product): boolean => product.id !== id);
  // Update the cart count
  this.cartCount = this.getCartCount();
  return this.cartList ;
  }

  //Get the total price
  getTotal(): number {
    this.totalPrice = +this.cartList
      .reduce((sum: number, product: Product) => (sum + (product.price * product.quantity)), 0)
      .toFixed(2);
    return this.totalPrice;
  }
}
